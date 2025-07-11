# Video Streaming Application

## Overview

This is a full-stack video streaming application built with React, Express, and PostgreSQL. The application allows users to browse and watch videos, while providing an admin panel for content management. The architecture follows a modern full-stack pattern with a React frontend, Express backend, and PostgreSQL database using Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI primitives with custom shadcn/ui components

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Module System**: ES Modules
- **Authentication**: JWT-based authentication with bcrypt for password hashing
- **API Design**: RESTful API with proper error handling and logging middleware
- **Development**: Hot reloading with tsx

### Database Architecture
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM for type-safe database queries
- **Connection**: Neon serverless connection with WebSocket support
- **Schema**: Well-structured tables for admins, videos, and video views

## Key Components

### Database Schema
- **admins**: Admin user management with username/password authentication
- **videos**: Core video metadata including title, description, URLs, categories, tags, and engagement metrics
- **video_views**: View tracking with IP and user agent logging
- **Relations**: Proper foreign key relationships between videos and views

### Authentication System
- JWT token-based authentication for admin access
- Bcrypt password hashing for security
- Middleware for protecting admin routes
- Client-side token storage and management

### Video Management
- Video CRUD operations through admin panel
- Category and tag-based organization
- View tracking and analytics
- Thumbnail and video URL management

### Frontend Pages
- **Home**: Featured and popular video sections
- **Videos**: Paginated video browsing with filtering
- **Video Player**: Custom video player with view tracking
- **Admin Panel**: Complete admin interface for video management
- **Navbar**: Navigation with search functionality

## Data Flow

1. **Video Serving**: Videos are served through URL references stored in the database
2. **View Tracking**: Each video view is logged with metadata for analytics
3. **Admin Operations**: CRUD operations flow through authenticated API endpoints
4. **Client State**: TanStack Query manages server state with proper caching and synchronization
5. **Authentication Flow**: JWT tokens are used for admin authentication with automatic token refresh

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing solution
- **jsonwebtoken**: JWT authentication
- **bcrypt**: Password hashing

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **date-fns**: Date formatting utilities

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations are applied via `db:push` command

### Environment Configuration
- **Development**: Uses tsx for hot reloading with Vite dev server
- **Production**: Serves built static files from Express server
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Replit Integration
- Includes Replit-specific plugins for development experience
- Runtime error overlay for debugging
- Cartographer plugin for enhanced development tools

The application is designed to be deployed on platforms that support Node.js applications with PostgreSQL databases, with particular optimization for Replit deployment.