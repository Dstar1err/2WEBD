import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {getObjectDetails, searchObjects} from '../api/metMusuem';
import '../styles/quicksearch.css';

const QuickSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        handleSearch();
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSearch = async () => {
    try {
      const data = await searchObjects(query);
      if (data.objectIDs && data.objectIDs.length > 0) {
        setResults(data.objectIDs.slice(0, 10));
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleNavigate = () => {
    navigate('/search', { state: { results, query } });
  };

  return (
    <div className="search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the collection..."
        className="search-bar"
      />
      <button onClick={handleNavigate} className="button">Search</button>
      <ul>
        {results.map((id) => (
          <li key={id}>
            <ObjectSummary objectId={id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const ObjectSummary: React.FC<{ objectId: number }> = ({ objectId }) => {
  const [object, setObject] = useState<any>(null);

  useEffect(() => {
    const fetchObjectDetails = async () => {
      try {
        const data = await getObjectDetails(objectId);
        setObject(data);
      } catch (error) {
        console.error('Error fetching object details:', error);
      }
    };

    fetchObjectDetails();
  }, [objectId]);

  if (!object) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={object.primaryImageSmall} alt={object.title} />
      <h2>{object.title}</h2>
      <p>{object.artistDisplayName}</p>
    </div>
  );
};

export default QuickSearch;
