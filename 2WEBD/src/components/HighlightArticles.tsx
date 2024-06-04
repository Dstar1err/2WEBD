import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHighlightObjects, getObjectDetails } from '../api/metMusuem';

interface HighlightObject {
  objectID: number;
  title: string;
  primaryImage: string;
  artistDisplayName: string;
}

const HighlightArticles: React.FC = () => {
  const [highlights, setHighlights] = useState<HighlightObject[]>([]);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        // @ts-ignore
        const data = await getHighlightObjects();
        const objectDetailsPromises = data.objectIDs.slice(0, 10).map(async (id: number) => {
          const objectData = await getObjectDetails(id);
          return {
            objectID: objectData.objectID,
            title: objectData.title,
            primaryImage: objectData.primaryImage,
            artistDisplayName: objectData.artistDisplayName,
          };
        });
        const objectDetails = await Promise.all(objectDetailsPromises);
        setHighlights(objectDetails);
      } catch (error) {
        console.error('Error fetching highlights:', error);
      }
    };

    fetchHighlights();
  }, []);

  return (
    <div>
      <h2>Highlighted Articles</h2>
      <ul>
        {highlights.map(object => (
          <li key={object.objectID}>
            <Link to={`/object/${object.objectID}`}>
              <img src={object.primaryImage} alt={object.title} width="100" />
              <p>{object.title}</p>
              <p>{object.artistDisplayName}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HighlightArticles;
