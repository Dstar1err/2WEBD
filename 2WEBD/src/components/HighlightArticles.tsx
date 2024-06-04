import React, { useEffect, useState } from 'react';
import { getHighlightObjects } from '../api/metMusuem';
import { Link } from 'react-router-dom';

const HighlightArticles: React.FC = () => {
  const [highlights, setHighlights] = useState<any[]>([]);

  useEffect(() => {
    const fetchHighlights = async () => {
      const data = await getHighlightObjects();
      setHighlights(data.objectIDs.slice(0, 10)); // Adjust as needed
    };

    fetchHighlights();
  }, []);

  return (
    <div>
      <h2>Highlighted Articles</h2>
      <ul>
        {highlights.map(id => (
          <li key={id}>
            <Link to={`/object/${id}`}>Object ID: {id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HighlightArticles;
