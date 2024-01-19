const winston = require('winston');

const logFormatter = (printf) => printf((info) => `${info.level}: ${info.timestamp} ${info.message}`);

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({stack: true}),
       winston.format.colorize() ,
        winston.format.splat(),
        logFormatter(winston.format.printf)
    ),
    transports: [
        new winston.transports.Console(),
    ],
});

module.exports = logger;
