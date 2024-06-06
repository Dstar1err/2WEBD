import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
   <div>
    <header>
      <h1><Link to="/">The Metropolitan Museum of Art Collection</Link></h1>

    </header>

    </div>
  );
};

export default Header;
