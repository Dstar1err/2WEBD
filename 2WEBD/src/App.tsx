import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './pages/homePage';
import AdvancedSearchPage from './pages/advancedSearchPage';
import ObjectDetailPage from './pages/objectDetailPage';
import SearchResults from './pages/searchResults';


const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<AdvancedSearchPage />} />
          <Route path="/search" element={<SearchResults />} />
        <Route path="/object/:id" element={<ObjectDetailPage />} />

      </Routes>
        <Footer />
    </Router>
  );
};

export default App;
