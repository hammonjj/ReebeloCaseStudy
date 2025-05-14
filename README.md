# Reebelo Case Study

## Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ReebeloCaseStudy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     NODE_ENV=development
     PORT=3000
     DB_PATH=./dev.sqlite
     ```

4. Run the application:
   ```bash
   npm run start:dev
   ```

### Mock Services

By default, the Customer and Inventory services use mock implementations when in a local development environment. These mock services are located in the `mocks/` directory.

#### Creating a New Mock Response
1. Navigate to the appropriate mock directory:
   - For Customer service: `mocks/customer/`
   - For Inventory service: `mocks/inventory/`

2. Create a new JSON file with the desired response data:
   ```json
   {
     "id": "12345",
     "name": "John Doe",
     "email": "john.doe@example.com"
   }
   ```

3. Update the `index.ts` file in the corresponding directory to include the new mock response:
   ```typescript
   import response1 from './1.json';
   import response2 from './2.json';
   import newResponse from './new-response.json';

   export default [response1, response2, newResponse];
   ```

#### Using the Mock Services
- Ensure the `NODE_ENV` is set to `development` in your `.env` file:
  ```env
  NODE_ENV=development
  ```

- Run the application in development mode:
  ```bash
  npm run start:dev
  ```

- The mock services will automatically use the responses defined in the `mocks/` directory.

## Architecture Overview

This microservice is built using the NestJS framework and follows a modular architecture. Key components include:

- **Orders Module**: Handles order creation, updates, and deletion.
- **Database Module**: Configures TypeORM with SQLite for local development.
  - Outside of a development environment, the service will use the DB added to the environment file
- **Clients Module**: Provides mock and HTTP clients for external services (e.g., Customer and Inventory).

### Key Features
- **Order Management**: Create, update, and delete orders.
- **Inter-Service Communication**: Mocked interactions with Customer and Inventory services.
- **Swagger Documentation**: Located at `http://localhost:3000/api-docs` when in dev

## Inter-Service Communication

The HTTP clients for external services (e.g., Customer and Inventory) are configured with retry logic using `axios-retry`. This ensures:

- **Transient Failure Handling**: Automatically retries failed requests up to 3 times with exponential backoff.
- **Improved Resilience**: Reduces the impact of temporary network issues or service unavailability.

## Deployment to AWS

### AWS Services
- **API Gateway**: To expose the microservice endpoints.
- **ECS (Elastic Container Service)**: To run the microservice in Docker containers.
- **RDS (Relational Database Service)**: For a production-ready database (e.g. PostgreSQL).
- **CloudWatch**: For logging and monitoring.

### Deployment Steps
1. **Containerize the Application**:
   - Create a `Dockerfile` to build the application image.
   - Build and push the image to Amazon ECR (Elastic Container Registry).

2. **Set Up ECS**:
   - Create an ECS cluster.
   - Define a task definition for the microservice.
   - Deploy the service to the cluster.

3. **Database Configuration**:
   - Use Amazon RDS to set up a PostgreSQL database.
   - Update the environment variables to point to the RDS instance.

4. **API Gateway**:
   - Configure API Gateway to route requests to the ECS service.

5. **Monitoring and Scaling**:
   - Use CloudWatch for monitoring logs and metrics.
   - Set up auto-scaling policies for the ECS service.

### Security Considerations
- Use IAM roles to restrict access to AWS resources.
- Enable HTTPS for API Gateway.
- Use parameter store or secrets manager for sensitive environment variables.

### Production Environment Setup

For a production environment, create a `.env.production` file in the root directory with the following variables:

```env
NODE_ENV=production
PORT=3000
DB_HOST=your-production-db-host
DB_PORT=5432
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
```

## Future Work
- Add comprehensive test coverage for edge cases
- Optimize database queries for better performance
- Integrate CI/CD pipelines for automated testing and deployment
- Implement a circuit breaker mechanism
- Change services such that you can connect to other environment services should the need arise
- Implement unit tests
- Implement E2E tests

## Misc. Interview Notes
Order:
- I used cents for price to avoid floating point issues
- I included price as a property because when dealing with contracts, prices can vary

OrderService:
- The inventory check should really be either a call that can check all items at once or placed in an async loop to avoid blocking

External Microservices:
- Implmentation of circuit breaker logic would require a good think on how you want to handle incoming order requests since the request to the external services will fail if the curcuit is open