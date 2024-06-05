import React from 'react';
import { useLocation } from 'react-router-dom';
import { getObjectDetails } from '../api/metMusuem';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const { results, query } = location.state || {};

  if (!results || results.length === 0) {
    return <div>No results found for "{query}"</div>;
  }

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <ul>
        {results.map((id: number) => (
          <li key={id}>
            <ObjectSummary objectId={id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const ObjectSummary: React.FC<{ objectId: number }> = ({ objectId }) => {
  const [object, setObject] = React.useState<any>(null);

  React.useEffect(() => {
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

export default SearchResults;
