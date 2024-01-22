// Import the 'cors' middleware
const cors = require('cors');

// Export a function that takes an Express app as a parameter
module.exports = (app) => {
    // Define CORS options
    const corsOptions = {
        origin: true, // Allow requests from any origin
        methods: 'OPTION,GET,POST,PUT,DELETE', // Specify the allowed HTTP methods
    };

    // Enable CORS for the Express app using the defined options
    app.use(cors(corsOptions));
    // Note: Make sure this middleware is used before your routes to ensure proper CORS handling
};
