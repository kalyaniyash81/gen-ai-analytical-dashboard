import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Mock API call simulation
export const submitQuery = createAsyncThunk(
  'queries/submitQuery',
  async (queryText, { getState }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Generate mock response based on query
    const mockResponses = {
      sales: {
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            label: 'Sales 2023',
            data: [65, 59, 80, 81, 56],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        tableData: [
          { month: 'Jan', sales: 65 },
          { month: 'Feb', sales: 59 },
          { month: 'Mar', sales: 80 },
          { month: 'Apr', sales: 81 },
          { month: 'May', sales: 56 }
        ]
      },
      users: {
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [{
            label: 'User Growth',
            data: [120, 190, 300, 450],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        tableData: [
          { quarter: 'Q1', users: 120 },
          { quarter: 'Q2', users: 190 },
          { quarter: 'Q3', users: 300 },
          { quarter: 'Q4', users: 450 }
        ]
      }
    }

    // Default response if no keyword matches
    const defaultResponse = {
      data: {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [{
          label: 'Sample Data',
          data: [10, 20, 30, 40],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      tableData: [
        { category: 'A', value: 10 },
        { category: 'B', value: 20 },
        { category: 'C', value: 30 },
        { category: 'D', value: 40 }
      ]
    }

    // Check query text for keywords
    const queryLower = queryText.toLowerCase()
    let response = defaultResponse
    
    if (queryLower.includes('sales')) {
      response = mockResponses.sales
    } else if (queryLower.includes('user') || queryLower.includes('growth')) {
      response = mockResponses.users
    }

    return {
      query: queryText,
      response,
      timestamp: new Date().toISOString()
    }
  }
)

const queriesSlice = createSlice({
  name: 'queries',
  initialState: {
    queries: JSON.parse(localStorage.getItem('queryHistory')) || [],
    currentQuery: null,
    isLoading: false,
    error: null
  },
  reducers: {
    clearQueryHistory: (state) => {
      state.queries = []
      localStorage.setItem('queryHistory', JSON.stringify(state.queries))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitQuery.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(submitQuery.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentQuery = action.payload
        // Add to history if not already there
        if (!state.queries.some(q => q.query === action.payload.query)) {
          state.queries.unshift(action.payload)
          localStorage.setItem('queryHistory', JSON.stringify(state.queries))
        }
      })
      .addCase(submitQuery.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const { clearQueryHistory } = queriesSlice.actions
export default queriesSlice.reducer