import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  submitQuery,
  clearQueryHistory,
} from "../features/queries/queriesSlice";

const QueryHistory = () => {
  const dispatch = useDispatch();
  const { queries } = useSelector((state) => state.queries);

  const handleQueryClick = (queryText) => {
    dispatch(submitQuery(queryText));
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your query history?")) {
      dispatch(clearQueryHistory());
    }
  };

  if (queries.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center text-muted">
          <p className="mb-0 text-white">No query history yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0 text-black">Query History</h5>
        <button
          onClick={handleClearHistory}
          className="btn btn-sm btn-outline-danger"
        >
          Clear All
        </button>
      </div>
      <div className="card-body p-0">
        <ul
          className="list-group list-group-flush"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          {queries.map((query, index) => (
            <li key={index} className="list-group-item list-group-item-action">
              <button
                onClick={() => handleQueryClick(query.query)}
                className="btn btn-link text-start p-0 border-0 text-decoration-none w-100"
              >
                <div className="d-flex flex-column">
                  <span className="text-dark">{query.query}</span>
                  <small className="text-muted">
                    {new Date(query.timestamp).toLocaleString()}
                  </small>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QueryHistory;
