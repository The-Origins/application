# Jacaranda Hotel Booking Engine

A modern hotel booking application built with Angular 19, featuring a comprehensive booking system with real-time room availability, secure payments, and user management.

## Tech Stack

- **Frontend Framework**: Angular 19.2
- **UI Components**: Angular Material 19.2
- **State Management**: RxJS 7.8
- **Server**: Express 4.18
- **Validation**:
  - Card Validator 10.0.2
  - libphonenumber-js 1.12.9
- **Testing**: Jasmine & Karma

## Project Structure

```
src/
├── app/                    # Core application module
├── components/            # Reusable UI components
│   ├── booking/          # Booking flow components
│   ├── booking-room/     # Room selection components
│   ├── checkout/         # Checkout process components
│   ├── country-select/   # Country selection component
│   ├── footer/           # Application footer
│   ├── header/           # Application header
│   ├── input-field/      # Custom input components
│   ├── location-nav/     # Location navigation
│   ├── login/            # Authentication components
│   ├── main/             # Main layout components
│   ├── payment/          # Payment processing components
│   ├── profile/          # User profile components
│   ├── queryForm/        # Search query components
│   ├── results/          # Search results display
│   ├── room/             # Room details components
│   ├── roomCard/         # Room card components
│   └── status/           # Status indicators
├── services/             # Application services
│   ├── booking-form/     # Booking form logic
│   ├── query-form/       # Search query handling
│   ├── room/            # Room management
│   ├── steps/           # Booking steps management
│   └── user/            # User management
├── animations/           # Animation definitions
├── data/                # Data models and interfaces
├── directives/          # Custom directives
├── lib/                 # Shared utilities
├── pipes/               # Custom pipes
└── types/               # TypeScript type definitions
```

## Features

- **Booking Management**

  - Multi-step booking process
  - Real-time room availability
  - Room type selection
  - Booking confirmation

- **User Experience**

  - Responsive design
  - Location-based navigation
  - Country selection
  - Loading indicators

- **Payment Processing**

  - Secure payment handling
  - Card validation
  - Checkout process

- **User Management**
  - User authentication
  - Profile management
  - Booking history

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI 19.2.13

### Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
ng serve
```

3. Build for production:

```bash
ng build
```

### Testing

Run unit tests:

```bash
ng test
```

Run end-to-end tests:

```bash
ng e2e
```

## Server-Side Rendering

The application supports Server-Side Rendering (SSR) using Angular Universal. To run the SSR version:

```bash
npm run serve:ssr:application
```

## License

This project is licensed under the MIT License.
