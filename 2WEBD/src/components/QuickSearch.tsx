import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchObjects } from '../api/metMusuem';

const QuickSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    const data = await searchObjects(query);
    navigate('/search', { state: { results: data.objectIDs.slice(0, 10), query } });
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the collection..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default QuickSearch;
