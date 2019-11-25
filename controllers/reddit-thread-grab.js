const snoowrap = require('snoowrap');
const chalk = require('chalk');

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

  r.getSubreddit('AskReddit').created_utc.then(console.log);

};
