import React, { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Treemap } from 'recharts';
import { BarChart3, TrendingUp, ArrowLeft } from 'lucide-react';

interface CategoryData {
  name: string;
  value: number;
  fill: string;
  brands?: BrandData[];
}

interface BrandData {
  name: string;
  value: number;
  fill: string;
}

interface ProductMixChartProps {
  data?: CategoryData[];
}

const sampleData: CategoryData[] = [
  { 
    name: 'Snacks & Beverages', 
    value: 30, 
    fill: '#FFD700',
    brands: [
      { name: 'Coca-Cola', value: 8, fill: '#FFD700' },
      { name: 'Piattos', value: 6, fill: '#FFC700' },
      { name: 'Nova', value: 5, fill: '#FFB700' },
      { name: 'Royal', value: 4, fill: '#FFA700' },
      { name: 'Pepsi', value: 3, fill: '#FF9700' },
      { name: 'Others', value: 4, fill: '#FF8700' }
    ]
  },
  { 
    name: 'Tobacco Products', 
    value: 45, 
    fill: '#FF6B35',
    brands: [
      { name: 'Marlboro', value: 25, fill: '#FF6B35' },
      { name: 'Lucky Strike', value: 12, fill: '#FF5B25' },
      { name: 'Philip Morris', value: 5, fill: '#FF4B15' },
      { name: 'Others', value: 3, fill: '#FF3B05' }
    ]
  },
  { 
    name: 'Personal Care', 
    value: 18, 
    fill: '#4A90E2',
    brands: [
      { name: 'Colgate', value: 6, fill: '#4A90E2' },
      { name: 'Palmolive', value: 4, fill: '#3A80D2' },
      { name: 'Head & Shoulders', value: 3, fill: '#2A70C2' },
      { name: 'Sunsilk', value: 3, fill: '#1A60B2' },
      { name: 'Others', value: 2, fill: '#0A50A2' }
    ]
  },
  { 
    name: 'Household Items', 
    value: 7, 
    fill: '#7B68EE',
    brands: [
      { name: 'Tide', value: 2, fill: '#7B68EE' },
      { name: 'Ariel', value: 2, fill: '#6B58DE' },
      { name: 'Downy', value: 1, fill: '#5B48CE' },
      { name: 'Joy', value: 1, fill: '#4B38BE' },
      { name: 'Others', value: 1, fill: '#3B28AE' }
    ]
  }
];

export const ProductMixChart: React.FC<ProductMixChartProps> = ({
  data = sampleData
}) => {
  const [activeTab, setActiveTab] = useState<'treemap' | 'categoryMix' | 'pareto' | 'substitutions' | 'basket'>('treemap');
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);

  const tabs = [
    { key: 'treemap', label: 'Product Treemap' },
    { key: 'categoryMix', label: 'Category Mix' },
    { key: 'pareto', label: 'Pareto Analysis' },
    { key: 'substitutions', label: 'Substitutions' },
    { key: 'basket', label: 'Basket Analysis' }
  ] as const;

  const renderLabel = (entry: CategoryData) => {
    return `${entry.name}: ${entry.value}%`;
  };

  const CustomTreemapContent = (props: any) => {
    const { root, depth, x, y, width, height, index, payload, colors, rank, name } = props;
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 6)] : payload.fill,
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
          onClick={() => {
            if (depth === 1 && payload.brands) {
              const category = data.find(cat => cat.name === name);
              setSelectedCategory(category || null);
            }
          }}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        />
        {depth === 1 ? (
          <text x={x + width / 2} y={y + height / 2} textAnchor="middle" fill="#000" fontSize={14} fontWeight="600">
            <tspan x={x + width / 2} dy="0">{name}</tspan>
            <tspan x={x + width / 2} dy="20" fontSize={12} fontWeight="400">{payload.value}%</tspan>
          </text>
        ) : null}
        {depth === 2 ? (
          <text x={x + 4} y={y + 18} fill="#000" fontSize={10} fontWeight="500">
            <tspan x={x + 4}>{name}</tspan>
            <tspan x={x + 4} dy="12" fontSize={9}>{payload.value}%</tspan>
          </text>
        ) : null}
      </g>
    );
  };

  const getTreemapData = () => {
    if (selectedCategory) {
      return [{
        name: selectedCategory.name,
        children: selectedCategory.brands?.map(brand => ({
          name: brand.name,
          size: brand.value,
          fill: brand.fill
        })) || []
      }];
    }
    
    return [{
      name: 'Product Categories',
      children: data.map(category => ({
        name: category.name,
        size: category.value,
        fill: category.fill,
        brands: category.brands,
        children: category.brands?.map(brand => ({
          name: brand.name,
          size: brand.value,
          fill: brand.fill
        })) || []
      }))
    }];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Product Category Distribution</h2>
        <BarChart3 className="h-4 w-4 text-gray-400" />
      </div>

      <div className="space-y-4">
        {/* SKU Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-sm text-gray-500">Total SKUs</p>
            <p className="text-xl font-bold text-gray-900">369</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Active SKUs</p>
            <p className="text-xl font-bold text-green-600">342</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">New SKUs</p>
            <p className="text-xl font-bold text-blue-600">12</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Back Button for Brand Drill-down */}
        {activeTab === 'treemap' && selectedCategory && (
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Categories
            </button>
            <span className="text-sm text-gray-600">
              Showing brands in {selectedCategory.name}
            </span>
          </div>
        )}

        {/* Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === 'treemap' ? (
              <Treemap
                data={getTreemapData()}
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
                content={<CustomTreemapContent colors={['#FFD700', '#FF6B35', '#4A90E2', '#7B68EE', '#32CD32', '#FF69B4']} />}
              />
            ) : (
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={renderLabel}
                  labelLine={false}
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Key Insight */}
        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
          <div className="flex items-start gap-2">
            <TrendingUp className="h-4 w-4 text-yellow-700 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-900">
                {activeTab === 'treemap' && selectedCategory ? 'Brand Distribution' : 'Category Insight'}
              </p>
              <p className="text-sm text-yellow-800">
                {activeTab === 'treemap' && selectedCategory 
                  ? `${selectedCategory.name} category: ${selectedCategory.brands?.find(b => b.value === Math.max(...selectedCategory.brands!.map(br => br.value)))?.name || 'Top brand'} leads with ${Math.max(...selectedCategory.brands?.map(br => br.value) || [0])}% market share.`
                  : 'Tobacco Products dominate with 45% share. Click categories in treemap to explore brand breakdown.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};