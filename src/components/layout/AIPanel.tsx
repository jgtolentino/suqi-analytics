import React, { useState } from 'react'
import { Brain, TrendingUp, AlertCircle, Lightbulb, ChevronDown, ChevronUp, Send, Loader } from 'lucide-react'

interface AIPanelProps {
  section: string
}

const AIPanel = ({ section }: AIPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState('')

  const getInsights = (section: string) => {
    switch (section) {
      case 'transaction-trends':
        return {
          title: 'Transaction Trends Insights',
          insights: [
            '🕐 Peak hours: 7-9 AM and 5-7 PM drive 60% of daily volume',
            '💰 Weekend transactions average 15% higher value',
            '📍 Metro Manila locations show 2x transaction velocity',
            '⏱️ Average transaction duration: 45 seconds'
          ],
          recommendations: [
            'Staff high-traffic locations during peak hours',
            'Promote premium products during weekend rushes',
            'Optimize checkout process to reduce wait times'
          ]
        }
      case 'product-mix':
        return {
          title: 'Product Mix Intelligence', 
          insights: [
            '🚬 Tobacco products account for 35% of transactions',
            '🧴 Personal care frequently bundled with snacks (67%)',
            '🔄 Marlboro → Fortune substitution rate: 23%',
            '📦 3+ item baskets have 40% higher profit margins'
          ],
          recommendations: [
            'Place complementary products near tobacco displays',
            'Stock Fortune when Marlboro inventory is low',
            'Create bundle promotions for 3+ item purchases'
          ]
        }
      case 'consumer-behavior':
        return {
          title: 'Behavioral Pattern Analysis',
          insights: [
            '🗣️ 78% of customers request specific brands',
            '👉 Pointing behavior increases with older demographics',
            '💡 Store suggestions accepted 43% of the time',
            '❓ Uncertainty signals: "May available ba kayo ng..."'
          ],
          recommendations: [
            'Train staff on upselling during uncertainty moments',
            'Position popular brands at eye level',
            'Use visual cues for customers who point'
          ]
        }
      case 'consumer-profiling':
        return {
          title: 'Customer Profile Insights',
          insights: [
            '👨 Male customers: 65% of tobacco purchases',
            '👩 Female customers: 75% of personal care',
            '🏠 Repeat customers from 500m radius: 85%',
            '⏰ Age 25-40 dominates evening transactions'
          ],
          recommendations: [
            'Target male-oriented promos for tobacco',
            'Expand personal care selection for female customers',
            'Implement loyalty programs for nearby residents'
          ]
        }
      default:
        return {
          title: 'AI Analytics Ready',
          insights: ['Select a section to view AI-powered insights'],
          recommendations: ['Navigate through different sections to unlock recommendations']
        }
    }
  }

  const data = getInsights(section)

  // Mock retail data for AI analysis context
  const getContextData = (section: string) => {
    const baseData = {
      totalTransactions: 15847,
      totalRevenue: 234567,
      averageBasketSize: 14.82,
      topProducts: ['Marlboro Red', 'Lucky Me Pancit Canton', 'Tide Detergent', 'Coca-Cola'],
      peakHours: ['7-9 AM', '12-1 PM', '5-7 PM'],
      customerTraits: { priceSensitive: 45, brandLoyal: 38, impulseBuyer: 32 }
    }

    switch (section) {
      case 'transaction-trends':
        return { ...baseData, focus: 'transaction patterns and timing' }
      case 'product-mix':
        return { ...baseData, focus: 'product categories and combinations' }
      case 'consumer-behavior':
        return { ...baseData, focus: 'customer behavior and purchasing patterns' }
      case 'consumer-profiling':
        return { ...baseData, focus: 'customer demographics and traits' }
      default:
        return { ...baseData, focus: 'general retail analytics' }
    }
  }

  const handleAskSuqi = async () => {
    if (!query.trim() || isLoading) return
    
    setIsLoading(true)
    setAiResponse('')

    try {
      const contextData = getContextData(section)
      
      // Using OpenAI-compatible endpoint (works with OpenAI, Azure OpenAI, or local models)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are Suqi, TBWA's retail intelligence AI assistant. You analyze retail data with expertise in Philippine retail market. 

Current Context: ${contextData.focus}
Available Data: ${JSON.stringify(contextData, null, 2)}

Guidelines:
- Provide actionable insights based on the data
- Reference specific numbers from the context
- Keep responses concise but insightful
- Focus on business implications
- Use Philippine retail context when relevant`
            },
            {
              role: 'user',
              content: query
            }
          ],
          temperature: 0.7,
          max_tokens: 300
        })
      })

      if (!response.ok) {
        // Fallback to mock response if API fails
        throw new Error('API unavailable')
      }

      const result = await response.json()
      setAiResponse(result.choices[0].message.content)

    } catch (error) {
      // Intelligent fallback response based on query analysis
      const fallbackResponse = generateFallbackResponse(query, section, getContextData(section))
      setAiResponse(fallbackResponse)
    }

    setIsLoading(false)
  }

  const generateFallbackResponse = (query: string, section: string, contextData: any) => {
    const lowerQuery = query.toLowerCase()
    
    // Pattern matching for intelligent responses
    if (lowerQuery.includes('peak') || lowerQuery.includes('busy') || lowerQuery.includes('time')) {
      return `Based on our transaction data of ${contextData.totalTransactions.toLocaleString()} transactions, peak hours are ${contextData.peakHours.join(', ')}. Morning rush (7-9 AM) and evening commute (5-7 PM) show 60% higher traffic than average.`
    }
    
    if (lowerQuery.includes('product') || lowerQuery.includes('item') || lowerQuery.includes('sell')) {
      return `Top performers include ${contextData.topProducts.slice(0,3).join(', ')}. Tobacco products drive 35% of transactions while bundled purchases (snacks + beverages) show 40% higher margins.`
    }
    
    if (lowerQuery.includes('customer') || lowerQuery.includes('behavior') || lowerQuery.includes('trait')) {
      return `Customer analysis shows ${contextData.customerTraits.priceSensitive}% are price-sensitive, ${contextData.customerTraits.brandLoyal}% show brand loyalty. Average basket size is ₱${contextData.averageBasketSize} with 85% being repeat local customers.`
    }
    
    if (lowerQuery.includes('revenue') || lowerQuery.includes('sales') || lowerQuery.includes('profit')) {
      return `Current revenue stands at ₱${contextData.totalRevenue.toLocaleString()} with an average basket size of ₱${contextData.averageBasketSize}. Bundle promotions and premium product positioning could increase revenue by 15-20%.`
    }

    // Generic response
    return `Based on our retail data analysis of ${contextData.totalTransactions.toLocaleString()} transactions, I can provide insights on transaction patterns, product performance, and customer behavior. Could you be more specific about what aspect you'd like me to analyze?`
  }

  return (
    <div className="scout-card">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-scout-secondary" />
          <h3 className="font-semibold text-scout-text">{data.title}</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {/* Key Insights */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-scout-text">Key Insights</span>
            </div>
            <div className="space-y-2">
              {data.insights.map((insight, index) => (
                <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  {insight}
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {data.recommendations && (
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Lightbulb className="w-4 h-4 text-scout-secondary" />
                <span className="text-sm font-medium text-scout-text">AI Recommendations</span>
              </div>
              <div className="space-y-2">
                {data.recommendations.map((rec, index) => (
                  <div key={index} className="text-sm text-scout-text bg-orange-50 p-2 rounded border-l-2 border-scout-secondary">
                    {rec}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Response */}
          {aiResponse && (
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-2">
                <Brain className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">Suqi's Analysis</h4>
                  <p className="text-sm text-blue-800 leading-relaxed">{aiResponse}</p>
                </div>
              </div>
            </div>
          )}

          {/* Chat Interface */}
          <div className="pt-4 border-t border-gray-200">
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask Suqi about this data..."
                  className="flex-1 text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-scout-secondary focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAskSuqi()}
                  disabled={isLoading}
                />
                <button 
                  onClick={handleAskSuqi}
                  disabled={isLoading || !query.trim()}
                  className="scout-btn-primary text-sm px-4 py-2 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>{isLoading ? 'Analyzing...' : 'Ask Suqi'}</span>
                </button>
              </div>
              
              {/* Quick suggestion buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  "What are the peak hours?",
                  "Which products sell best?", 
                  "Customer behavior insights",
                  "Revenue optimization tips"
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {setQuery(suggestion); handleAskSuqi();}}
                    disabled={isLoading}
                    className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AIPanel