// src/features/queries/queriesAPI.js

// Mock database of possible queries and responses
const knowledgeBase = {
    sales: {
      description: "Sales data for the current year",
      response: {
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Monthly Sales',
            data: [65, 59, 80, 81, 56, 72],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        tableData: [
          { month: 'January', sales: 65, growth: '12%' },
          { month: 'February', sales: 59, growth: '-9%' },
          { month: 'March', sales: 80, growth: '36%' },
          { month: 'April', sales: 81, growth: '1%' },
          { month: 'May', sales: 56, growth: '-31%' },
          { month: 'June', sales: 72, growth: '29%' }
        ],
        insights: [
          "Sales peaked in April",
          "February saw the largest decline",
          "Overall growth rate is 12% YTD"
        ]
      }
    },
    users: {
      description: "User growth metrics",
      response: {
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [{
            label: 'Active Users',
            data: [1200, 1900, 3000, 4500],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        tableData: [
          { quarter: 'Q1', users: 1200, growth: '5%' },
          { quarter: 'Q2', users: 1900, growth: '58%' },
          { quarter: 'Q3', users: 3000, growth: '58%' },
          { quarter: 'Q4', users: 4500, growth: '50%' }
        ],
        insights: [
          "User base doubled every quarter",
          "Q2 and Q3 showed identical growth rates",
          "Retention rate improved to 85% in Q4"
        ]
      }
    },
    revenue: {
      description: "Revenue by product category",
      response: {
        data: {
          labels: ['Electronics', 'Clothing', 'Home Goods', 'Accessories'],
          datasets: [{
            label: 'Revenue Share',
            data: [45, 25, 20, 10],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        tableData: [
          { category: 'Electronics', revenue: 45000, margin: '35%' },
          { category: 'Clothing', revenue: 25000, margin: '45%' },
          { category: 'Home Goods', revenue: 20000, margin: '25%' },
          { category: 'Accessories', revenue: 10000, margin: '50%' }
        ],
        insights: [
          "Electronics account for nearly half of revenue",
          "Clothing has the highest profit margin",
          "Accessories have high margin but low volume"
        ]
      }
    }
  };
  
  // Simulated AI processing function
  export const processQuery = async (queryText) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
    
    // Convert query to lowercase for easier matching
    const query = queryText.toLowerCase();
    
    // Find matching dataset
    let matchedDataset = null;
    let matchScore = 0;
    
    for (const [key, dataset] of Object.entries(knowledgeBase)) {
      const currentScore = calculateMatchScore(query, key, dataset.description);
      if (currentScore > matchScore) {
        matchScore = currentScore;
        matchedDataset = dataset;
      }
    }
    
    // If no good match found, use a default response
    if (!matchedDataset || matchScore < 0.3) {
      return generateDefaultResponse(queryText);
    }
    
    return {
      query: queryText,
      response: matchedDataset.response,
      timestamp: new Date().toISOString(),
      confidence: matchScore.toFixed(2)
    };
  };
  
  // Generate query suggestions
  export const getSuggestions = async (partialQuery) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const suggestions = [];
    const query = partialQuery.toLowerCase();
    
    for (const [key, dataset] of Object.entries(knowledgeBase)) {
      if (key.includes(query) || dataset.description.toLowerCase().includes(query)) {
        suggestions.push({
          query: `Show me ${dataset.description.toLowerCase()}`,
          score: 0.9
        });
      }
    }
    
    // Add some generic suggestions if we don't have matches
    if (suggestions.length === 0) {
      suggestions.push(
        { query: "Show me sales data for last quarter", score: 0.7 },
        { query: "What is our current user growth rate?", score: 0.7 },
        { query: "Compare revenue by product category", score: 0.7 }
      );
    }
    
    return suggestions.slice(0, 5); // Return top 5 suggestions
  };
  
  // Helper function to calculate match score
  function calculateMatchScore(query, key, description) {
    const queryWords = query.split(/\s+/);
    const keyWords = key.split(/\s+/);
    const descWords = description.toLowerCase().split(/\s+/);
    
    let score = 0;
    
    // Check for direct matches
    if (query.includes(key)) score += 0.5;
    if (query.includes(description.toLowerCase())) score += 0.3;
    
    // Check for word matches
    queryWords.forEach(word => {
      if (keyWords.includes(word)) score += 0.2;
      if (descWords.includes(word)) score += 0.1;
    });
    
    return Math.min(1, score); // Cap at 1
  }
  
  // Generate a default response when no good match is found
  function generateDefaultResponse(queryText) {
    return {
      query: queryText,
      response: {
        data: {
          labels: ['Data 1', 'Data 2', 'Data 3', 'Data 4'],
          datasets: [{
            label: 'Sample Data',
            data: [10, 20, 30, 40],
            backgroundColor: 'rgba(199, 199, 199, 0.2)',
            borderColor: 'rgba(199, 199, 199, 1)',
            borderWidth: 1
          }]
        },
        tableData: [
          { category: 'Sample 1', value: 10 },
          { category: 'Sample 2', value: 20 },
          { category: 'Sample 3', value: 30 },
          { category: 'Sample 4', value: 40 }
        ],
        insights: [
          "I couldn't find specific data for your query",
          "Try asking about sales, users, or revenue",
          "Be more specific with time frames or metrics"
        ]
      },
      timestamp: new Date().toISOString(),
      confidence: 0.1
    };
  }