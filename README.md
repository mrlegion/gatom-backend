# GATOM Backend

[NestJS](https://nestjs.com/) backend API for GATOM system management.

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Database Schema](#database-schema)
- [API Modules](#api-modules)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)

## Project Overview

GATOM is a user and organizational management system with the following capabilities:

- **Authentication & Authorization** - JWT-based authentication with refresh tokens
- **User Management** - Employee profiles, roles, password management
- **Organization Management** - Corporate organization structure
- **Department/Subsidiary Management** - Branch management within organizations
- **Position/Role Management** - Position definitions and assignments
- **Development Tracking** - System, subsystem, module, and development type tracking

## Architecture

```
src/
├── config/           # Configuration files and bootstraps
│   ├── bootstraps/   # Module bootstraps (Swagger, CORS, Validation)
│   ├── strategies/   # Authentication strategies (JWT)
│   └── jwt.config.ts # JWT configuration
│
├── repositories/     # Data access layer (Prisma repositories)
│   ├── employee/     # Employee data access
│   ├── organization/ # Organization data access
│   ├── password-history/ # Password history tracking
│   ├── position/     # Position data access
│   ├── prisma/       # Prisma service instance
│   └── subsidiary/   # Subsidiary data access
│
├── services/         # Business logic layer
│   ├── jwt/          # JWT token operations
│   ├── prisma/       # Database connection management
│   └── index.ts      # Service exports
│
├── shared/           # Shared utilities and types
│   ├── decorators/   # Custom decorators (@Auth, @CurrentUser)
│   ├── guards/       # Authentication guards (JWTAuthGuard)
│   ├── response/     # Response wrappers
│   └── utils/        # Utility functions
│
├── v1/modules/       # API modules (versioned)
│   ├── auth/         # Authentication module
│   │   ├── controller.ts
│   │   ├── dto/      # Request/Response DTOs
│   │   └── service.ts
│   ├── organization/ # Organization management
│   │   ├── controller.ts
│   │   ├── dto/
│   │   └── service.ts
│   ├── position/     # Position management
│   │   ├── controller.ts
│   │   ├── dto/
│   │   └── service.ts
│   └── subsidiary/   # Subsidiary/Branch management
│       ├── controller.ts
│       ├── dto/
│       └── service.ts
│
├── app.module.ts     # Root application module
└── main.ts           # Application entry point
```

## Technologies

- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.7+
- **Database**: PostgreSQL with Prisma ORM 7.x
- **Authentication**: JWT (JSON Web Tokens) with HTTP-only cookies
- **API Documentation**: Swagger/OpenAPI
- **Password Hashing**: Argon2
- **Validation**: class-validator
- **Testing**: Jest
- **Redis**: Session caching and rate limiting
- **RabbitMQ**: Message queue for notifications

## Database Schema

### Core Models

| Model | Description | Fields |
|-------|-------------|--------|
| `User` | User authentication data | id, email, passwordHash, isActive, isUseTwoFactor, lastLogin, createdAt, updatedAt |
| `UserPasswordHistory` | Password change history | id, email, password, createdAt |
| `Employee` | Employee profile | id, username, firstName, lastName, middleName, avatar, role, positionId, subsidiaryId, userId |
| `Role` | User roles enum | USER, DEVELOPER, CONSULTANT, ADMIN |
| `Organization` | Organization details | id, title, shortTitle, ogrn, inn, kpp, oktmo, subsidiaries[] |
| `Subsidiary` | Subsidiary/branch | id, title, address, phones[], emails[], organizationId, employees[] |
| `Position` | Position definitions | id, title, isNonActive, employees[] |

### Development Tracking Models

| Model | Description | Fields |
|-------|-------------|--------|
| `System` | System catalog entry | id, code, name, prefix, subsystems[], developments[] |
| `Subsystem` | Subsystem types | id, code, name, type, mandants[], systemId |
| `SubsystemType` | Subsystem type enum | DEVELOPMENT, TEST, PRODUCTION, PRODUCTION_COPY |
| `Module` | Application modules | id, code, name, developments[] |
| `DevelopmentType` | Development type catalog | id, code, name, developments[] |
| `Development` | Development records | id, moduleId, systemId, typeId, code, number, package, run, comments, inactive, allocated, createdAt, updatedAt |

### Enum Values

- **Role**: USER \| DEVELOPER \| CONSULTANT \| ADMIN
- **SubsystemType**: DEVELOPMENT \| TEST \| PRODUCTION \| PRODUCTION_COPY

## API Modules

### Authentication Module (`/api/auth/*`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | User login | No |
| POST | `/auth/register` | User registration | No |
| POST | `/auth/logout` | Logout user | Yes |
| POST | `/auth/refresh` | Refresh JWT tokens | Yes |
| POST | `/auth/change-password` | Change password | Yes |

### Organization Module (`/api/organizations/*`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/organizations` | Get all organizations | No |
| GET | `/organizations/find-by/id/:id` | Get organization by ID | No |
| GET | `/organizations/find-by/title/:title` | Find by title | No |
| POST | `/organizations/find-by/ids` | Find by IDs | No |
| POST | `/organizations` | Create organization | Yes |
| PUT | `/organizations/:id` | Update organization | Yes |
| DELETE | `/organizations/:id` | Delete organization | Yes |

### Position Module (`/api/positions/*`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/positions` | Get all positions | No |
| GET | `/positions/find-by-id/:id` | Get position by ID | No |
| POST | `/positions` | Create position | Yes |
| PUT | `/positions/:id` | Update position | Yes |
| DELETE | `/positions/:id` | Delete position | Yes |

### Subsidiary Module (`/api/subsidiaries/*`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/subsidiaries` | Get all subsidiaries | No |
| GET | `/subsidiaries/find-by/id/:id` | Get by ID | No |
| GET | `/subsidiaries/find-by/title/:title` | Find by title | No |
| GET | `/subsidiaries/find-by/organization/:orgId` | Find by organization | No |
| POST | `/subsidiaries` | Create subsidiary | Yes |
| PUT | `/subsidiaries/:id` | Update subsidiary | Yes |
| PATCH | `/subsidiaries/connect/:id` | Connect to organization | Yes |
| DELETE | `/subsidiaries/:id` | Delete subsidiary | Yes |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis (optional)
- RabbitMQ (optional)

### Installation

```bash
# Install dependencies
npm install

# Generate environment variables file
cp .env.example .env
# Edit .env with your configuration
```

### Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma db push

# Reset database (optional)
npx prisma db push --force-reset
```

### Development

```bash
# Start development server with hot-reload
npm run start:dev

# Start production build
npm run build
npm run start:prod
```

The application will be available at:
- Main API: `http://localhost:5000/api`
- Swagger Docs: `http://localhost:5000/docs`
- OpenAPI JSON: `http://localhost:5000/openapi.json`

### Configuration

Edit `.env`:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/g_atom"

# JWT
JWT_SECRET="your-secret-key"
JWT_ACCESS_EXPIRES_IN="1h"
JWT_REFRESH_EXPIRES_IN="7d"

# HTTP Server
HTTP_PORT=5000
HTTP_HOST="http://localhost:5000"
```

## Development

### Scripts

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start development server with hot-reload |
| `npm run build` | Build for production |
| `npm run start:prod` | Start production server |
| `npm run lint` | Run ESLint and fix issues |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:cov` | Run tests with coverage report |

### Code Style

- TypeScript target: ES2023
- Strict null checks enabled (with some exceptions)
- ES Module syntax
- Import sorting via Prettier plugin

### Testing

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov
```

## API Documentation

Interactive API documentation is available at `/docs` with Swagger UI.

OpenAPI specification files are served at:
- JSON: `/openapi.json`
- YAML: `/openapi.yaml`

## Security Features

- **Password Hashing**: Argon2id algorithm
- **JWT Authentication**: Access and refresh tokens
- **HTTP-only Cookies**: Secure token storage
- **Password History**: Prevent password reuse
- **Role-Based Access Control**: USER, DEVELOPER, CONSULTANT, ADMIN roles
- **Validation**: Class-validator for request validation

## License

MIT.
