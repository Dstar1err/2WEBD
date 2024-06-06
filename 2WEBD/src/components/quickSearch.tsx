import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchObjects, getObjectDetails } from '../api/metMusuem';
import '../styles/quickSearch.css';

const QuickSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 0) {
        try {
          const data = await searchObjects(query);
          const objectData = await Promise.all(data.objectIDs.slice(0, 10).map((id: number) => getObjectDetails(id)));
          setResults(objectData);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="quick-search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the collection..."
        className="search-bar"
      />
      <Link to="/advanced-search" className="advanced-search-button">Advanced Search</Link>
      <div className="search-results">
        {results.map((object) => (
          <Link to={`/object/${object.objectID}`} key={object.objectID} className="search-result-item">
            <img src={object.primaryImageSmall} alt={object.title} className="search-result-image" />
            <div>
              <h2 className="search-result-title">{object.title}</h2>
              <p className="search-result-artist">{object.artistDisplayName}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickSearch;
