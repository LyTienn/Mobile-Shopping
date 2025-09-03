import { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import HeaderBar from './components/Header/Header';
import LeftBar from './components/LeftBar/LeftBar';
import './App.css';

//lazy loading
const Shop = lazy(() => import('./pages/Shop/Shop'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
// const Product = lazy(() => import('./pages/Product/Product'));


//main layout
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className='main-layout'>
      <HeaderBar />
      <LeftBar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/*<MainContent />*/}
      <div className={`main-content${collapsed ? ' collapsed' : ''}`}>
        <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
          <Routes>
            {/* Route cho Shop với nested routing */}
            <Route path="/shop/*" element={<Shop collapsed={collapsed} />} />

            {/* Route cho Cart */}
            <Route path="/cart" element={<Cart collapsed={collapsed} />} />

            {/* Route cho Profile */}
            <Route path="/profile" element={<Profile collapsed={collapsed} />} />
            
            {/* Default route - Shop */}
            <Route path="/" element={<Shop collapsed={collapsed} />} />

            {/* Catch-all route */}
            <Route path="*" element={<Shop collapsed={collapsed} />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

function AppContent() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<MainLayout />} />
    </Routes>
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
