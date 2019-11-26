const snoowrap = require('snoowrap');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs')

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.join(path.dirname(require.main.filename), 'static', 'database.db'));

db.run(`CREATE TABLE IF NOT EXISTS complex_ai (
  entry_id INTEGER PRIMARY KEY,
  comment_id VARCHAR(128) UNIQUE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  author TEXT NOT NULL);
`);

const r = new snoowrap({
  userAgent: process.env.REDDIT_USERAGENT,
  clientId: process.env.REDDIT_CLIENTID,
  clientSecret: process.env.REDDIT_CLIENTSECRET,
  refreshToken: process.env.REDDIT_REFRESHTOKEN
});


/**
 * 🧠
 * Updates the answers with the subreddit
 */
exports.updateBrain = () => {

  console.log('%s Starting brain 🧠 update ...', chalk.green('✓'));

  r.getSubmission('e18g6m').expandReplies({limit: 2, depth: 0}).then((result)=>{
    for (var i = 0; i < result.comments.length; i++) {
      let entry = result.comments[i];

      console.log(parseBoomerLanguage(entry.body));
      /*var stmt = db.run(`
        INSERT OR IGNORE INTO complex_ai (comment_id, question, answer, author) VALUES (?, ?, ?, ?)
        UPDATE my_table SET question = ?, answer = ?, author = ? WHERE comment_id='Karen'
      `);*/
    }

  });
};

/**
 * 🗣️
 * Parse the body to usuable data
 **/
 parseBoomerLanguage = function(text){
   var result = false;
   var edited = text.replace(/\"/g, "").replace(/\'/g, "").replace(/“/g, "").replace(/”/g, "");
   var boomerRegEx = /(^ok(.{1})boomer)(.{1})/gim;
   var matches = edited.match(boomerRegEx);
   if(!matches) return {
     success: false,
     raw: text
   };

   var sentence = edited.replace(boomerRegEx,"");
   var firstLine = sentence.split('\n')[0].trim();
   var answer = sentence.replace(firstLine,"").trim();
   return {
     success: true,
     question: firstLine,
     answer: answer
   };
 };
