import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchObjects, getObjectDetails } from '../api/metMusuem';
import '../styles/quicksearch.css';

const QuickSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

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

  const handleSearch = async () => {
    try {
      const data = await searchObjects(query);
      navigate('/search', { state: { results: data.objectIDs.slice(0, 10), query } });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the collection..."
        className="search-bar"
      />
      <button onClick={handleSearch} className="button">Search</button>
      <div className="search-results">
        {results.map((object) => (
            <Link to={`/object/${object.objectID}`}>
              <div key={object.objectID} className="search-result-item">
                <img src={object.primaryImageSmall} alt={object.title}/>
                <div>
                  <h2>{object.title}</h2>
                  <p>{object.artistDisplayName}</p>

                </div>
              </div>
            </Link>

        ))}
      </div>
    </div>
  );
};

export default QuickSearch;
