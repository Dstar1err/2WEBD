import React from 'react';
import QuickSearch from './QuickSearch.tsx';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <h1><Link to="/">The Metropolitan Museum of Art Collection</Link></h1>
      <QuickSearch />
    </header>
  );
};

export default Header;
