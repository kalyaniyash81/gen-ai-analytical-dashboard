import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submitQuery } from '../features/queries/queriesSlice'

const QueryInput = () => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.queries)

  const sampleQueries = [
    "Show me sales data for last 5 months",
    "What is our user growth rate",
    "Compare Q1 and Q2 revenue",
    "Display customer acquisition cost by channel"
  ]

  useEffect(() => {
    if (query.length > 2) {
      const filtered = sampleQueries.filter(q => 
        q.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [query])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      dispatch(submitQuery(query))
      setQuery('')
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    dispatch(submitQuery(suggestion))
  }

  return (
    <div className="container mb-4">
      <form onSubmit={handleSubmit} className="row g-2">
        <div className="col-md-10 position-relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about your data..."
            className="form-control form-control-lg"
            disabled={isLoading}
            autoComplete="off"
          />
          {showSuggestions && (
            <div className="list-group position-absolute w-100 mt-1" style={{ zIndex: 1000 }}>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="list-group-item list-group-item-action text-start"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="col-md-2">
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing...
              </>
            ) : 'Ask'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default QueryInput