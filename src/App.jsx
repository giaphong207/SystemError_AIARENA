import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import StudioPage from './pages/StudioPage';
import CollectionPage from './pages/CollectionPage';
import CulturePage from './pages/CulturePage';

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<StudioPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/culture" element={<CulturePage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;