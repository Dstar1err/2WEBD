import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getObjectDetails } from '../api/metMusuem';

const ObjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [object, setObject] = useState<any>(null);

  useEffect(() => {
    const fetchObjectDetails = async () => {
      const data = await getObjectDetails(Number(id));
      setObject(data);
    };

    fetchObjectDetails();
  }, [id]);

  if (!object) return <div>Loading...</div>;

  return (
    <div>
      <h1>{object.title}</h1>
      <img src={object.primaryImage} alt={object.title} />
      <p>{object.artistDisplayName}</p>
      <p>{object.department}</p>
      <p>{object.period}</p>
      <p>{object.objectDate}</p>
      <p>{object.medium}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ObjectDetail;
