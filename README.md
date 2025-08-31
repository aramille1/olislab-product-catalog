# 🚀 Oli's Lab Product Catalog

A modern, responsive e-commerce application for Oli's Lab skincare products. Built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

- 🛍️ **Product Catalog** - Browse skincare products with detailed information
- 🔍 **Advanced Filtering** - Filter by category, brand, skin type, and concerns
- 🛒 **Shopping Cart** - Add products to bag with quantity controls
- 📱 **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- ⚡ **Performance Optimized** - Fast loading with skeleton screens and lazy loading
- 🎯 **Real-time Updates** - Instant product selection and cart updates

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **UI Components:** Swiper.js, React Loading Skeleton
- **Data:** CSV file with API route processing

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd olislab-home-task
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:8080](http://localhost:8080)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/products/      # API route for product data
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── common/           # Reusable components
│   ├── filters/          # Filter components
│   └── product/          # Product-specific components
├── contexts/             # React Context providers
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── constants/            # Application constants
```

## 🎯 Key Components

- **ProductDetails** - Displays selected product with images and details
- **RecommendedProducts** - Horizontal carousel of recommended products
- **AllProducts** - Filtered product grid with load more functionality
- **FilterAllProducts** - Advanced filtering with mobile-responsive design
- **ProductCard** - Reusable product card component
- **AddToBagButton** - Shopping cart functionality

## 🔧 Available Scripts

- `npm run dev` - Start development server (port 8080)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile (< 640px):** Single column layout, floating filter button
- **Tablet (640px - 1024px):** 2-3 column grid, side navigation
- **Desktop (> 1024px):** Multi-column grid, sidebar filters

## 🛒 Shopping Cart

- Global state management with React Context
- Quantity controls for each product
- Real-time updates across all components
- Persistent cart state during session

## 🔍 Filtering System

- **Categories:** Cleanser, moisturizer, serum, etc.
- **Brands:** Filter by product brand
- **Skin Types:** Dry, oily, combination, sensitive
- **Concerns:** Acne, aging, hyperpigmentation
- **Exclusions:** "Don't Show Me" functionality

## 📊 Performance Features

- **Skeleton Loading** - Visual placeholders during data loading
- **Lazy Loading** - Load more products on demand
- **Memoization** - Optimized re-rendering with React.memo
- **Code Splitting** - Automatic route-based code splitting
- **Image Optimization** - CDN-hosted AVIF images

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 📝 Documentation

For detailed project flow and architecture documentation, see:
- [PROJECT_FLOW_DOCUMENTATION.md](./PROJECT_FLOW_DOCUMENTATION.md) - Comprehensive technical documentation
- [PROJECT_FLOW_SIMPLE.txt](./PROJECT_FLOW_SIMPLE.txt) - Simple text version

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is part of the Oli's Lab assignment.

---
