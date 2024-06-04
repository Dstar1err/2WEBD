// src/pages/SearchResults.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const { results, query } = location.state as { results: number[], query: string };

  if (!results.length) {
    return <div>No results found for "{query}".</div>;
  }

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      <ul>
        {results.map(id => (
          <li key={id}>
            <Link to={`/object/${id}`}>Object ID: {id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
