const { ShardingManager } = require('discord.js');
const chalk = require('chalk');

 const dotenv = require('dotenv');
 const envFile = dotenv.config();
 const config = require('./config.json');
 const prefix = config.prefix;
 const { token } = require('./config.json');

let manager = new ShardingManager('./index.js', {
     token: token,
     totalShards: 'auto'
    });

manager.on('shardCreate', shard => console.log(chalk.yellow('[SHARDING] ') + chalk.green(`Włączono shardy `) + chalk.blue(`${shard.id}`)));

manager.spawn();