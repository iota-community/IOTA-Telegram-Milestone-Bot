process.env["NTBA_FIX_319"] = 1;
const TelegramBot = require('node-telegram-bot-api');
const Iota = require('@iota/core');
const token = 'your token here';

const iota = Iota.composeAPI({
  provider: 'https://node.owndev.net/napi'
});

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg, match) =>{
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, "Hi Friend! i can show you the latest milestone on IOTA, if you want. Simply type !milestone")
});

bot.onText(/\!milestone/, (msg, match ) =>{
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  const info =   iota.getNodeInfo()
  // Convert the returned object to JSON to make the output more readable
  .then(info => bot.sendMessage(chatId, "Latest milestone Index: " + JSON.stringify(info ['latestMilestoneIndex'], null, 1)
  + "\r\n"
  + "\r\nMilestone: " + JSON.stringify(info ['latestMilestone'], null, 1)
  + "\r\n"
  + "\r\nBased on: " + " HORNET " + JSON.stringify(info ['appVersion'], null, 1) + " on Mainnet"))
  .catch(err => {console.log(err), bot.sendMessage(chatId, "Failed: Node out of sync");});
  
});

bot.onText(/\!node/, (msg, match ) =>{
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  const info =   iota.getNodeInfo()
  // Convert the returned object to JSON to make the output more readable
  .then(info => bot.sendMessage(chatId, "the latest stable version is: \r\nHORNET " + JSON.stringify(info ['appVersion'], null, 1)))
  .catch(err => {console.log(err);});
  
});
/*
bot.onText(/\!latestMilestone/, (msg, match ) =>{
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  const info =   iota.getNodeInfo()
  // Convert the returned object to JSON to make the output more readable
  .then(info => bot.sendMessage(chatId, "Latest Milestone: " + JSON.stringify(info ['latestMilestone'], null, 1)))
  .catch(err => {console.log(err);});
  
});
  bot.onText(/\/help/, (msg, match ) =>{
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  const info =   iota.getNodeInfo()
  // Convert the returned object to JSON to make the output more readable
  .then(info => bot.sendMessage(chatId, 
    "/LMI_comnet - Show latest LMI on comnet \r\n /latestMilestone_comnet - show the latest Milestone on comnet \r\n /appVersion - show the installed Node Software"))
  .catch(err => {console.log(err);});
});
 */ 
bot.on("polling_error", (err) => console.log(err));
