import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getObjectDetails } from '../api/metMusuem';
import '../styles/resultSearch.css';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const { results, query } = location.state || {};
  const [objects, setObjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchObjects = async () => {
      if (results && results.length > 0) {
        const objectsData = await Promise.all(results.map((id: number) => getObjectDetails(id)));
        setObjects(objectsData);
      }
    };

    fetchObjects();
  }, [results]);

  if (!results || results.length === 0) {
    return <div>No results found for "{query}"</div>;
  }

  return (
    <div className="search-results">
      <h1>Search Results for "{query}"</h1>
      <ul>
        {objects.map((object) => (
            <Link to={`/object/${object.objectID}`}>
          <li key={object.objectID}>
            <div className="object-summary">
              <img src={object.primaryImageSmall} alt={object.title} />
              <div>
                <h2>{object.title}</h2>
                <p>{object.artistDisplayName}</p>
              </div>
            </div>
          </li>
            </Link>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;