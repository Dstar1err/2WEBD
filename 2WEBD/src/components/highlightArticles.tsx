import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getHighlightObjects, getObjectDetails } from '../api/metMusuem';
import QuickSearch from "./quickSearch.tsx";
import '../styles/highlightArticles.css';

interface HighlightObject {
  objectID: number;
  title: string;
  primaryImage: string;
  artistDisplayName: string;
}

const HighlightArticles: React.FC = () => {
  const [highlights, setHighlights] = useState<HighlightObject[]>([]);
  const location = useLocation();
  const results = location.state;

  console.log("results in AdvancedSearch", results);

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
      <div>
        <QuickSearch />
      </div>
      <div className="HighlightArticles">
        <h2 className="title">Popular Articles</h2>
        <ul className="highlight-list">
          {highlights.map(object => (
            <li key={object.objectID} className="highlight-item">
              <Link to={`/object/${object.objectID}`} className="highlight-link">
                <img src={object.primaryImage} alt={object.title} width="100" className="highlight-image" />
                <p className="highlight-title">{object.title}</p>
                <p className="highlight-artist">{object.artistDisplayName}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HighlightArticles;
