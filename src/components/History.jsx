import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submitQuery, clearQueryHistory } from '../features/queries/queriesSlice'

const QueryHistory = () => {
  const dispatch = useDispatch()
  const { queries } = useSelector(state => state.queries)

  const handleQueryClick = (queryText) => {
    dispatch(submitQuery(queryText))
  }

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your query history?')) {
      dispatch(clearQueryHistory())
    }
  }

  if (queries.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        <p>No query history yet</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Query History</h3>
        <button
          onClick={handleClearHistory}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Clear All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Query
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {queries.map((query, index) => (
              <tr key={index} className="hover:bg-gray-750">
                <td className="px-4 py-3 whitespace-normal text-sm text-gray-200 max-w-xs truncate">
                  {query.query}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                  {new Date(query.timestamp).toLocaleTimeString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleQueryClick(query.query)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Run
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default QueryHistory