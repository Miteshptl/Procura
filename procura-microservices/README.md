# Procura Microservices

This repository contains a microservices-based backend application built with NestJS and PostgreSQL, designed to manage products and orders. The application is structured into multiple services, each responsible for specific functionalities, and is accessible through an API Gateway.

## Project Structure

```
procura-microservices
├── apps
│   ├── api-gateway          # API Gateway service
│   ├── products-service      # Products management service
│   └── orders-service        # Orders management service
├── libs
│   ├── shared                # Shared libraries and DTOs
│   └── db                    # Database configuration
├── docker                    # Docker-related files
├── docker-compose.yml        # Docker Compose configuration
├── .env                      # Environment variables
├── nx.json                  # Nx workspace configuration
├── workspace.json            # Workspace configuration
├── package.json              # Project dependencies and scripts
└── tsconfig.base.json        # Base TypeScript configuration
```

## Features

- **Products Service**: Provides CRUD operations for managing products, including product code, name, description, rate, and image.
- **Orders Service**: Allows users to create and view orders, storing customer details, products, and total amount.
- **API Gateway**: Acts as a single entry point for the frontend, routing requests to the appropriate services and implementing basic authentication.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- Docker and Docker Compose
- PostgreSQL

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/procura-microservices.git
   cd procura-microservices
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up the environment variables in the `.env` file.

4. Initialize the PostgreSQL database using the provided SQL scripts in `docker/postgres/init.sql`.

### Running the Application

To run the application using Docker Compose, execute:

```
docker-compose up --build
```

This command will build the Docker images and start the services.

### API Documentation

API documentation is available through Swagger. Once the application is running, you can access it at:

```
http://localhost:3000/api-docs
```

## Testing

You can use Postman or Swagger to test the API endpoints. A Postman collection is included in the repository for convenience.

## Contribution

Feel free to fork the repository and submit pull requests for any improvements or features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.