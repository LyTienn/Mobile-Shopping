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
  // const addToCart = (product) => {
  //   setCartItems(prev => {
  //     const existingProduct = prev.find(item => item.id === product.id);
  //     if(existingProduct) {
  //       return prev.map(item =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + 1}
  //           : item
  //       );
  //     }
  //     return [...prev, { ...product, quantity: 1}];
  //   });
  // };

  // const handleChangeQuantity = (id, newQty) => {
  //   setCartItems(prev => 
  //     cartItems.map(item => 
  //       item.id === id
  //         ? { ...item, quantity: newQty > 0 ? newQty : 1 }
  //         : item  
  //     )
  //   );
  // };

  // const handleRemoveItem = (id) => {
  //   setCartItems(items => items.filter(item => item.id !== id));
  // };

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
              <Route path="/" element={<Shop />} />
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