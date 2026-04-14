# Shop Hub - E-Commerce Frontend Application

A modern React-based e-commerce frontend application for Shop Hub, featuring a complete online shopping experience with product catalog, shopping cart, and checkout functionality.

## Features

- **Product Catalog**: Browse 40+ products with detailed information
- **Search & Filtering**: Real-time search by name and category filtering
- **Shopping Cart**: Add/remove items with localStorage persistence
- **Checkout Process**: Complete checkout simulation with order confirmation
- **Order History**: View past orders and order details
- **Stock Management**: Real-time stock tracking and updates
- **User Authentication**: Login system with profile management
- **Wishlist**: Save favorite products for later
- **Client-Side Caching**: Optimized performance with intelligent caching
- **Responsive Design**: Mobile-first design that works on all devices

## Technologies Used

- **React** with Vite for fast development
- **React Router** for client-side navigation
- **Context API** for state management
- **localStorage** for data persistence
- **CSS Variables** for consistent theming
- **Modern JavaScript (ES6+)**

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm run dev
```

Open your browser and navigate to: http://localhost:5173

## Project Structure

```
frontend/
src/
  components/          # Reusable UI components
  context/           # React context providers
  data/              # Static data (products)
  pages/             # Page components
  styles/            # CSS stylesheets
  App.jsx            # Main application component
  main.jsx           # Application entry point
```

## Key Features

### Caching Implementation
- **Product Data Cache**: 5-minute cache with network simulation
- **Search Cache**: Recent search suggestions
- **Filter Persistence**: Category filters saved per session

### Stock Management
- Real-time stock updates across all pages
- Stock validation prevents overselling
- Visual stock status indicators

### User Experience
- Smooth scroll-to-top on all pages
- Responsive design for all screen sizes
- Modern, intuitive interface

## Developer

- **Name**: Rihana Abdellah
- **ID**: RP1872

## License

This project is part of SE333 Web Technologies 2 assessment.
