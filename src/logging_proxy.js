const config = require("../config.json");
const Discord = require("discord.js");

/**
 * Adds a proxy to console methods to also send log messages in chat
 * @param {Discord.Client} client The bot client for which to enable the logging proxy
 */
function enableLoggingProxy(client) {
  const debug = console.debug;
  const log = console.log;
  const info = console.info;
  const warn = console.warn;
  const error = console.error;
  const exception = console.exception;

  console.debug = (info_, params) => {
    client.emit('debug', info_);
    if (params) debug(info_, params);
    else debug(info_);
  };
  console.log = (info_, params) => {
    client.emit('info', info_);
    if (params) log(info_, params);
    else log(info_);
  };
  console.info = (info_, params) => {
    client.emit('info', info_);
    if (params) info(info_, params);
    else info(info_);
  };
  console.warn = (info_, params) => {
    client.emit('warn', info_);
    if (params) warn(info_, params);
    else warn(info_);
  };
  console.error = (info_, params) => {
    client.emit('error', info_);
    if (params) error(info_, params);
    else error(info_);
  };
  console.exception = (info_, params) => {
    client.emit('error', info_);
    exception(info_, params);
  };

  client.debug = message => console.debug(message);
  client.log = message => console.log(message);
  client.info = message => console.info(message);
  client.warn = message => console.warn(message);
  client.error = message => console.error(message);
  client.exception = message => console.error(message);

  client.on('debug', (s) => {
    if (s.includes('[connection]')) return;
    client.channels.get(config.consoleChannelID).send(new Discord.RichEmbed().setAuthor('Debug').setDescription(s));
  });
  client.on('info', (s) => {
    client.channels.get(config.consoleChannelID).send(new Discord.RichEmbed().setAuthor('Log').setDescription(s).setColor('BLUE'));
  });
  client.on('warn', (s) => {
    client.channels.get(config.consoleChannelID).send(new Discord.RichEmbed().setAuthor('Warn').setDescription(s).setColor('ORANGE'));
  });
  client.on('error', (s) => {
    client.channels.get(config.consoleChannelID).send(new Discord.RichEmbed().setAuthor('Error').setDescription(s).setColor('RED'));
  });
};

module.exports.enableLoggingProxy = enableLoggingProxy;