import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getObjectDetails } from '../api/metMusuem';
import "../styles/objectDetail.css";
const ObjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [object, setObject] = useState<any>(null);

  useEffect(() => {
    const fetchObjectDetails = async () => {
      try {
        const object = await getObjectDetails(Number(id));
        setObject(object);
      } catch (error) {
        console.error('Error fetching object details:', error);
      }
    };

    fetchObjectDetails();
  }, [id]);

  if (!object) return <div>Loading...</div>;

  return (
      <div>
          <div className="image-wrapper">
              <img alt={object.objectName} src={object.primaryImageSmall}/>
          </div>
          <div className="item-row">
            <label>Title:</label>
            <div>{object.title}</div>
          </div>
        {
            // added a null check for the ones I noticed are sometimes returned as null from the server, for a better user experience :)
            object.artistDisplayName && (
                <div className="item-row">
                    <label>Artist:</label>
                    <div>{object.artistDisplayName}</div>
                </div>
            )
        }
        {
            object.classification && (
                <div className="item-row">
                    <label>Classification:</label>
                    <div>{object.classification}</div>
                </div>
            )
        }
        <div className="item-row">
            <label>Dimensions:</label>
            <div>{object.dimensions}</div>
        </div>
        <div className="item-row">
            <label>Date:</label>
            <div>{object.objectDate}</div>
        </div>
        {
            object.period && (
                <div className="item-row">
                    <label>Period:</label>
                    <div>{object.period}</div>
                </div>
            )
        }
        <div className="item-row">
            <label>Credit line:</label>
            <div>{object.creditLine}</div>
        </div>
    </div>
)
    ;
};

export default ObjectDetail;
