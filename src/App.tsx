import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Customise from './pages/Customise';
import ErrorBoundary from './components/common/ErrorBoundary';
import Dashboard from './pages/Dashboard';
// import './styles/global.css';


const App: React.FC = () => {
  return (
      <ErrorBoundary>
        <Router>
          <Layout>
            <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customise" element={<Customise />} />
            </Routes>
          </Layout>
        </Router>
      </ErrorBoundary>
  );
};

export default App;
