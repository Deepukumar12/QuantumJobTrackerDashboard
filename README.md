# Overview

This is a quantum computing job management dashboard application built with React, Express.js, and TypeScript. The system provides a comprehensive interface for managing quantum computing jobs, monitoring backend systems, and tracking execution analytics. The application simulates IBM Quantum services and provides real-time job tracking, status monitoring, and data visualization capabilities.

The application now includes a comprehensive quantum computing educational documentation section with interactive 3D visualizations to help users learn quantum computing concepts from beginner to advanced levels.

# Recent Changes

## AdminKit-Inspired Admin Dashboard with Real-time Features (October 12, 2025)
- **Professional Admin Dashboard**: Complete redesign with AdminKit-inspired aesthetics
  - Clean, modern card layouts with gradients and smooth animations
  - Comprehensive analytics with revenue charts and user growth metrics
  - Real-time clock and geolocation display in header showing current time and user location
  - Professional color-coded stat cards for key metrics (revenue, users, jobs, latency)
  - Recent activity feed with icon-based event visualization
  
- **Interactive User Location Map** (`/admin`):
  - Global user distribution visualization using Leaflet maps
  - Color-coded markers based on subscription plan (Enterprise, Premium, Free)
  - Size-encoded markers indicating user count per location
  - Interactive popups showing city, country, user count, and plan type
  - Top locations sidebar with real-time statistics
  - Live user counts and location metrics
  
- **Real-time Event Calendar** (`/admin`):
  - Month navigation with animated calendar grid
  - Event type indicators (maintenance, release, meeting, quantum)
  - Color-coded event categories with custom icons
  - Event details panel with time, attendees, and descriptions
  - Live badge showing real-time activity
  - Upcoming events list with filtering capabilities
  
- **Enhanced Analytics Visualizations**:
  - Dual revenue charts (line chart for trends, bar chart for monthly data)
  - Responsive chart layouts using Recharts library
  - AdminKit-style stat cards with trend indicators
  - Framer Motion animations for smooth transitions
  
- **Dependencies Added**:
  - `leaflet@^1.9.4` - Interactive map library
  - `react-leaflet@^4.2.1` - React bindings for Leaflet
  - `@types/leaflet` - TypeScript definitions for Leaflet

## Admin Dashboard Navigation Enhancement (October 2025)
- **Fixed Routing System**: Corrected admin dashboard to use react-router-dom consistently throughout the application
  - Migrated from wouter to react-router-dom for admin navigation
  - Implemented proper nested routing with relative paths
  - All admin pages now accessible via proper URL paths:
    - `/admin` - Analytics Dashboard (default)
    - `/admin/pricing` - Pricing Plans Management
    - `/admin/users` - User Management
    - `/admin/content` - Content Management
    - `/admin/news` - News Management
    - `/admin/game-scores` - Game Scores & Leaderboard
    - `/admin/audit-logs` - System Audit Logs
  - Active link highlighting based on current route
  - Smooth navigation with sidebar links

## Advanced Documentation & Quiz System (October 2025)
- **Enhanced Documentation**: Significantly upgraded quantum computing documentation at `/docs` with:
  - 12 comprehensive sections with smooth scroll animations
  - Progress tracking bar showing reading progress
  - Scroll-to-top button for easy navigation
  - Professional visual components with Framer Motion animations
  - Interactive diagrams and code examples with copy functionality
  - FAQ section with expand/collapse interactions
  - Algorithm timeline showing quantum computing milestones
  - Best practices guide for quantum development
  - Comprehensive resources section

- **Interactive Quiz System**: Professional knowledge testing feature with:
  - 5 quiz categories (Basics, Superposition, Entanglement, Gates, Algorithms)
  - 25+ questions spanning beginner to advanced difficulty
  - Multiple choice and true/false question types
  - Real-time progress tracking with accuracy and streak counters
  - Instant feedback with detailed explanations
  - Beautiful results screen with grade calculation (A+ to D)
  - Achievement badges system (Perfect Score, Quantum Expert, Quick Learner)
  - Category selection interface with difficulty indicators
  - Retake functionality and seamless navigation

- **3D Visualizations & Diagrams**: 
  - Bloch Sphere visualization for qubit states
  - Quantum particle wave function representation
  - Interactive quantum gates 3D display
  - Animated quantum circuit diagrams showing gate sequences
  - Classical vs Quantum bit comparison animations
  - Interactive algorithm timeline with milestones

- **Code Examples**: Professional code display with:
  - Syntax-highlighted examples (Qiskit, Python)
  - Copy-to-clipboard functionality
  - Examples for basic circuits, Grover's algorithm, and VQE
  - Terminal-style code windows

## OpenAI Integration (October 2025)
- Configured OpenAI API integration for AI-powered quantum analysis features
- Added secure API key management through Replit Secrets

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React with TypeScript**: Modern React application using functional components and hooks
- **Vite**: Build tool and development server for fast development experience
- **Tailwind CSS + shadcn/ui**: Utility-first CSS framework with pre-built component library
- **Framer Motion**: Animation library for smooth UI transitions and interactions
- **React Query**: Server state management and data fetching with automatic caching
- **React Router**: Client-side routing for navigation between pages
- **React Three Fiber**: 3D graphics library for interactive quantum visualizations

## Backend Architecture
- **Express.js**: RESTful API server handling quantum job operations
- **TypeScript**: Full type safety across the entire application stack
- **Memory Storage**: In-memory data storage with interfaces for future database integration
- **Simulated IBM Quantum Integration**: Mock service simulating real IBM Quantum API behavior
- **Real-time Updates**: Automatic job status transitions and live dashboard updates

## Data Storage Solutions
- **Drizzle ORM**: Database toolkit configured for PostgreSQL with schema definitions
- **PostgreSQL**: Production database setup (currently using Neon serverless)
- **In-memory Storage**: Development and demo mode using Map-based storage
- **Schema Management**: Shared schema definitions between frontend and backend

## Authentication and Authorization
- **Client-side Authentication**: Simple token-based auth stored in localStorage
- **Protected Routes**: Route guards preventing unauthorized access to dashboard
- **Demo Mode**: Accepts any credentials for demonstration purposes
- **Session Management**: User data persistence across browser sessions

## External Dependencies
- **IBM Quantum API Integration**: Service layer for connecting to IBM Quantum backends
- **OpenAI API**: AI-powered quantum analysis and assistance features
- **Neon Database**: Serverless PostgreSQL hosting for production deployments
- **Recharts**: Data visualization library for analytics charts and graphs
- **Three.js**: 3D graphics engine for quantum state visualizations
- **Leaflet**: Interactive mapping library for global user location visualization
- **Date-fns**: Date manipulation and formatting utilities
- **Axios**: HTTP client for external API communications

The application follows a monorepo structure with shared types and schemas, enabling type-safe communication between frontend and backend. The architecture supports both development simulation and production quantum computing integration.