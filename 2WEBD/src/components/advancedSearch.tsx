import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchObjects } from '../api/metMusuem';
import '../styles/advencedSearch.css';

const AdvancedSearch: React.FC = () => {
  const [title, setTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    const query = `title=${title}&artistName=${artistName}&tags=${tags}`;
    try {
      const data = await searchObjects(query);
      navigate('/search', { state: { results: data.objectIDs.slice(0, 10), query } });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <h1>Advanced Search</h1>
      <form>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          placeholder="Artist Name"
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags"
        />
        <button type="button" onClick={handleSearch}>Search</button>
      </form>
    </div>
  );
};

export default AdvancedSearch;
