// Import the 'cors' middleware
const cors = require('cors');

// Export a function that takes an Express app as a parameter
module.exports = (app) => {
    // Define the allowed origins
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080'];

    // Define CORS options
    const corsOptions = {
        origin: (origin, callback) => {
            // Check if the request origin is in the allowed origins list or if it's undefined (non-browser requests)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: 'OPTION,GET,POST,PUT,DELETE', // Specify the allowed HTTP methods
    };

    // Enable CORS for the Express app using the defined options
    app.use(cors(corsOptions));
    // Note: Make sure this middleware is used before your routes to ensure proper CORS handling
};
