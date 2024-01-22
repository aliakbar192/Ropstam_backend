# Node Server README

## Overview

Welcome to the Node Server documentation! This Node.js server is designed to provide a robust backend for your application. It offers RESTful APIs accessible on port 8080, with API documentation available through Swagger on `/api-docs`.

## Getting Started

### Prerequisites

Before running the server, make sure you have the following installed:

-   [Node.js](https://nodejs.org/)
-   [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/your-repo.git
    cd your-repo
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the project root and set the following environment variables:

    ```env
    Port=""
    Database=""
    SMTP_HOST=" "
    SMTP_PORT=" '
    SMTP_SERVICE='"
    SMTP_MAIL=" "
    SMTP_PASSWORD=" "
    jwt_secret_key=" "
    JWT_expiresIn=" "
    ```

## Running the Server

To start the server, run:

```bash
npm start
```

The server will be accessible on [http://localhost:8080/api](http://localhost:8080/api).

## API Documentation

Swagger documentation is available at [http://localhost:8080/api-docs](http://localhost:8080/api-docs). Explore the available endpoints and test them directly from the Swagger UI.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
