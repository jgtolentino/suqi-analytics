# Suqi Analytics - Frontend Dashboard

A modern React-based analytics dashboard for retail intelligence, featuring interactive data visualizations and real-time insights.

## 🚀 Features

- **Interactive Dashboards**: Multi-role dashboard system (Executive, Regional Manager, Analyst, Store Owner)
- **Data Visualizations**: Charts powered by Recharts with treemap, line charts, bar charts
- **Real-time Analytics**: Live data updates and interactive filters
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **AI Integration**: Natural language queries and insights
- **TBWA Branding**: Professional corporate design system

## 🏗️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5.4.20
- **Styling**: Tailwind CSS 3.4.1
- **Charts**: Recharts 2.12.7
- **Icons**: Lucide React 0.428.0
- **State Management**: Zustand 4.5.2
- **Authentication**: Supabase Auth

## 📦 Project Structure

```
src/
├── components/
│   ├── cards/          # Reusable card components
│   ├── charts/         # Chart components (line, bar, pie)
│   ├── databank/       # Data visualization components
│   ├── layout/         # Layout components (Sidebar, Header)
│   ├── sections/       # Page sections (ProductMix, ConsumerBehavior)
│   └── ui/             # Base UI components
├── lib/
│   ├── supabase.ts     # Database client configuration
│   └── utils.ts        # Utility functions
├── store/
│   └── dashboardStore.ts # Dashboard state management
└── App.tsx             # Main application component
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd suqi-frontend-clean
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env.local` file:
```env
# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Development Mode (set to false for production)
VITE_USE_MOCK_DATA=true
```

4. **Start Development Server**
```bash
npm run dev
```

5. **Build for Production**
```bash
npm run build
```

## 📊 Dashboard Sections

### Executive Dashboard
- **KPI Metrics**: Revenue, growth rates, satisfaction scores
- **Transaction Trends**: Real-time transaction volume and patterns
- **Geographic Intelligence**: Regional performance analysis
- **Consumer Insights**: Behavior patterns and demographics

### Regional Manager Dashboard
- **Store Performance**: Individual store metrics and comparisons
- **Product Mix**: Category and SKU performance analysis
- **Consumer Behavior**: Regional customer analysis
- **Competitive Analysis**: Market positioning insights

### Store Owner Dashboard
- **Daily Operations**: Transaction volume, peak hours
- **Product Performance**: Top selling items, inventory insights
- **Customer Analysis**: Demographics and purchase patterns
- **Actionable Insights**: AI-powered recommendations

### Analyst Dashboard
- **Deep Analytics**: Advanced statistical analysis
- **Data Exploration**: Interactive data mining tools
- **Report Generation**: Customizable analytics reports
- **Trend Analysis**: Historical data and forecasting

## 🎨 Design System

### Colors (TBWA Brand)
- **Primary**: Yellow (#FFD700) - TBWA signature color
- **Secondary**: Black (#000000) - Professional contrast
- **Background**: White (#FFFFFF) - Clean interface
- **Text**: Gray scale for hierarchy

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: Inter regular, optimized readability
- **Numbers**: Tabular figures for data alignment

### Components
- **Cards**: Consistent shadow, border radius, padding
- **Charts**: Interactive with hover states and tooltips
- **Buttons**: Primary/secondary variants with TBWA styling
- **Forms**: Clean inputs with focus states

## 📈 Data Visualization Components

### Interactive Treemap (`ProductMixChart`)
- **Category Distribution**: Proportional rectangles for market share
- **Brand Drill-down**: Click categories to explore brand breakdown
- **Philippine Brands**: Local brands (Piattos, Nova, Royal) included
- **Navigation**: Back button for seamless category/brand switching

### Transaction Trends (`TransactionTrendsChart`)
- **Time Series**: Daily, weekly, monthly transaction patterns
- **Multiple Metrics**: Volume, value, average transaction size
- **Interactive Filters**: Date range, store, category filters

### Consumer Behavior Analysis
- **Funnel Charts**: Customer journey visualization
- **Demographic Breakdowns**: Age, gender, location analysis
- **Purchase Patterns**: Seasonal trends and preferences

### Geographic Intelligence
- **Philippine Map**: Region-based performance visualization
- **Store Locations**: Individual store performance mapping
- **Regional Comparisons**: Side-by-side regional analysis

## 🔧 Configuration

### Vite Configuration
- **Base URL**: Configurable for different deployment environments
- **Build Optimization**: Tree shaking, code splitting
- **Development**: Hot module replacement, fast refresh

### Tailwind Configuration
- **TBWA Theme**: Custom color palette and typography
- **Responsive Breakpoints**: Mobile-first approach
- **Custom Utilities**: Dashboard-specific utility classes

## 🚀 Deployment

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to GitHub Pages
```

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod --dir=dist
```

## 🔍 Development Notes

### Mock Data vs Real Data
- **Development**: Uses mock data for rapid prototyping
- **Production**: Connects to Supabase backend for real data
- **Toggle**: `VITE_USE_MOCK_DATA` environment variable

### Component Architecture
- **Modular Design**: Reusable components with TypeScript interfaces
- **State Management**: Zustand for global dashboard state
- **Props Interface**: Well-defined TypeScript interfaces for all components

### Performance Optimization
- **Lazy Loading**: Code splitting for dashboard sections
- **Memoization**: React.memo for expensive chart components
- **Bundle Analysis**: Regular bundle size monitoring

## 🐛 Known Issues & Limitations

1. **Mock Data**: Currently uses sample data; requires backend integration
2. **Real-time Updates**: Polling-based; WebSocket integration planned
3. **Mobile Optimization**: Some charts need mobile-specific responsive improvements
4. **Accessibility**: ARIA labels and keyboard navigation to be enhanced

## 🔮 Future Enhancements

- **Real-time WebSocket**: Live data updates without polling
- **Advanced Filters**: More sophisticated filtering and search
- **Export Functionality**: PDF/Excel export for reports
- **Customizable Dashboards**: User-configurable dashboard layouts
- **Dark Mode**: Theme switching capability
- **Internationalization**: Multi-language support

## 📄 License

Private project for TBWA Singapore.

## 👥 Team

- **Frontend Development**: React + TypeScript implementation
- **Design System**: TBWA brand guidelines
- **Data Visualization**: Recharts integration
- **Backend Integration**: Supabase configuration

---

For questions or support, please contact the development team.