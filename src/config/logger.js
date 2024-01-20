const winston = require('winston');

// Custom log formatter function
const logFormatter = (printf) => printf((info) => `${info.level}: ${info.timestamp} ${info.message}`);

const logger = winston.createLogger({
    // Log level (e.g., 'info', 'warn', 'error')
    level: 'info',
    // Log format configuration
    format: winston.format.combine(
        winston.format.timestamp(), // Include timestamp in logs
        winston.format.errors({stack: true}), // Include error stack traces
        winston.format.colorize(), // Apply colorization to log output
        winston.format.splat(), // Interpolate additional variables in log message
        logFormatter(winston.format.printf) // Apply custom log formatting
    ),
    // Log transports (output destinations)
    transports: [
        new winston.transports.Console(), // Output logs to the console

    ],
});
// Export the configured logger for use in other modules
module.exports = logger;
