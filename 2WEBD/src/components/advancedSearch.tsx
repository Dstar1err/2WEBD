import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchObjects } from '../api/metMusuem';

const AdvancedSearch: React.FC = () => {
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    const query = `departmentId=${department}&dateBegin=${date}&tags=${tags}`;
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
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Department ID"
        />
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
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
