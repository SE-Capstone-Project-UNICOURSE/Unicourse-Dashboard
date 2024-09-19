# Unicourse Dashboard

The **Unicourse Dashboard** is a modular and scalable application designed to manage various features for users, including authentication, blog management, course management, and a personalized user dashboard. This project follows a feature-based modular architecture, making it easy to extend and maintain.

## Architecture Overview

The project uses a modular architecture, where each feature is encapsulated into its own module, making the application highly scalable and maintainable. Each module contains its own services, components, views, and state management logic.

We use Redux for global state management and React Hook Form for form control and validation.

## Key Technologies

- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: Simplifies global state management in a predictable and efficient way.
- **React Hook Form**: A performant library for form validation and management.
- **TypeScript**: A superset of JavaScript that provides type-checking at compile time.

## Project Structure

```plaintext
src/
│
├── components/        # Shared UI components
│   ├── atoms/         # Small reusable components like buttons and inputs
│   ├── chart/         # Components for displaying charts
│   └── molecules/     # More complex components built from atoms
│
├── constants/         # Global constants and configurations
│   └── appConstants.ts
│
├── features/          # Feature modules of the application
│   ├── auth/          # User authentication module
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── services/
│   │   └── views/
│   ├── blogs/         # Blog management feature
│   ├── courses/       # Course management feature
│   └── dashboard/     # Main user dashboard
│
├── hooks/             # Custom hooks used in the project
│   ├── useAuthentication.ts
│   └── useScrollToTop.ts
│
├── routes/            # Application routing
│   └── Router.tsx
│
├── stores/            # Redux state management
│   ├── actions/       # Action creators
│   ├── middlewares/   # Middleware for side-effects
│   ├── reducers/      # State reducers
│   ├── services/      # API calls and related functions
│   ├── slices/        # Redux slices for state management
│   └── types/         # TypeScript types for the store
│
├── theme/             # Theme and styling for the application
│   └── create-theme.ts
│
└── utils/             # Utility functions and HTTP client
    ├── httpClient.ts  # HTTP Client configuration for API calls
    └── helpers.ts     # General utility functions
