import { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './layouts/Login/Login';
import HeaderBar from './components/Header/Header';
import LeftBar from './components/LeftBar/LeftBar';
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//lazy loading
const Shop = lazy(() => import('./pages/Shop/Shop'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Profile = lazy(() => import('./pages/Profile/Profile'));

//main layout
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
      <div className='main-layout'>
        <HeaderBar />
        <div className="leftbar-and-content">  
        <LeftBar collapsed={collapsed} setCollapsed={setCollapsed} /> 
        <div className={`main-content${collapsed ? ' collapsed' : ''}`}>
          <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
            <Routes>
              <Route path="/shop/*" element={<Shop />} />       
              <Route path="/cart" element={<Cart />} />        
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Shop />} />
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </Suspense>
        </div>
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
      <AppContent />
  );
}

export default App;