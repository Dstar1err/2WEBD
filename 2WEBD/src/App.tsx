import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './pages/homePage';
import AdvancedSearchPage from './pages/advancedSearchPage';
import ObjectDetailPage from './pages/objectDetailPage';
import ResultSearch from "./pages/resultSearch.tsx";


const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route>
          <Route index element={<HomePage />} />
          <Route path="/advanced-search" element={<AdvancedSearchPage />} />
            <Route path="/search" element={<ResultSearch />} />
        </Route>
        <Route path="/object/:id" element={<ObjectDetailPage />} />
      </Routes>
        <Footer />
    </Router>
  );
};

export default App;
