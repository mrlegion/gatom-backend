# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a NestJS-based backend application for a system called "GATOM". The application follows a modular architecture with a clear separation of concerns between different components.

### Key Technologies
- **Framework**: NestJS (v11)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based authentication
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest

## Architecture Structure

### High-Level Organization
```
src/
├── config/           # Application configuration files
├── repositories/     # Data access layer (Prisma repositories)
├── services/         # Business logic and external services
├── shared/           # Shared utilities, types, decorators, guards
├── v1/modules/       # API modules (versioned)
│   ├── auth/         # Authentication module
│   ├── organization/ # Organization management module
│   ├── position/     # Position management module
│   └── subsidiary/   # Subsidiary management module
├── app.module.ts     # Root application module
└── main.ts           # Application entry point
```

### Module Structure
Each module follows a consistent pattern:
- `*.module.ts` - Module definition
- `*.controller.ts` - HTTP request handlers
- `*.service.ts` - Business logic
- `dto/` - Data Transfer Objects (requests/responses)
- `types/` - Module-specific types

### Data Access Pattern
- **Repositories**: Handle all database operations using Prisma ORM
- **Services**: Contain business logic and orchestrate repository calls
- **Controllers**: Handle HTTP requests and delegate to services

## Common Development Tasks

### Building and Running
```bash
# Development
npm run start:dev

# Production build
npm run build

# Production run
npm run start:prod

# Linting
npm run lint

# Formatting
npm run format
```

### Testing
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov
```

### Database Operations
The application uses Prisma ORM for database operations. Prisma schema and client are generated from the database structure.

### Environment Configuration
Environment variables are managed through `.env` files and accessed via NestJS ConfigService.

## API Structure
API endpoints are organized by modules under the `/api` prefix:
- Auth: `/api/auth/*`
- Organizations: `/api/organizations/*`
- Positions: `/api/positions/*`
- Subsidiaries: `/api/subsidiaries/*`

## Authentication
JWT-based authentication with refresh tokens stored in secure HTTP-only cookies.

## Code Quality Standards
- Strict TypeScript with modern ES2023 target
- ESLint and Prettier for code formatting
- Comprehensive API documentation with Swagger
- DTOs for request/response validation
- Repository pattern for data access

## Key Dependencies
- `@nestjs/*` - Core NestJS framework
- `@prisma/*` - Database ORM
- `@nestjs/jwt` - JWT handling
- `class-validator` - Request validation
- `argon2` - Password hashing
- `@nestjs/swagger` - API documentation