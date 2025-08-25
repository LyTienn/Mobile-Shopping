import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import './App.css';

function AppContent() {

  return (
    <>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
