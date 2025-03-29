import React from 'react'
import ChartDisplay from './ChartDisplay'

const ResultsDisplay = ({ currentQuery }) => {
  if (!currentQuery) {
    return (
      <div className="card">
        <div className="card-body text-center text-muted">
          <p className="mb-0 text-white">Submit a query to see results</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Your Query:</h5>
          <div className="alert alert-light mb-0">
            {currentQuery.query}
          </div>
        </div>
      </div>
      
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <ChartDisplay chartData={currentQuery.response.data} />
        </div>
      </div>
      
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Tabular Data:</h5>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  {Object.keys(currentQuery.response.tableData[0]).map((key) => (
                    <th key={key} scope="col">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentQuery.response.tableData.map((row, index) => (
                  <tr key={index} className="text-black">
                  {Object.values(row).map((value, i) => (
                    <td key={i} className="text-black">
                      {value}
                    </td>
                  ))}
                </tr>
                
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsDisplay