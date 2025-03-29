import React from 'react'
import { useSelector } from 'react-redux'
import QueryInput from './components/QueryInput'
import ResultsDisplay from './components/ResultsDisplay'
import History from './components/History'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const { currentQuery, isLoading, error } = useSelector(state => state.queries)

  return (
    <div className="flex min-h-screen bg-gray-100">
     
      
      
      <main className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
  Gen AI Analytics Dashboard
</h1>
       
        
        <div className="mb-8">
          <br />
          <QueryInput />
        </div>
        
        {isLoading && (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2">Processing your query...</p>
          </div>
        )}
        
        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
            Error: {error}
          </div>
        )}
           
        
        <ResultsDisplay currentQuery={currentQuery} />
        <History />
     
       
      </main>
    </div>
  )
}

export default App