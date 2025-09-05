import { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import HeaderBar from './components/Header/Header';
import LeftBar from './components/LeftBar/LeftBar';
import { AvatarProvider } from './pages/Context/AvatarContext';
import './App.css';

//lazy loading
const Shop = lazy(() => import('./pages/Shop/Shop'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Profile = lazy(() => import('./pages/Profile/Profile'));

//main layout
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (product) => {
    setCartItems(prev => {
      const existingProduct = prev.find(item => item.id === product.id);
      if(existingProduct) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1}
            : item
        );
      }
      return [...prev, { ...product, quantity: 1}];
    });
  };

  const handleChangeQuantity = (id, newQty) => {
    setCartItems(prev => 
      cartItems.map(item => 
        item.id === id
          ? { ...item, quantity: newQty > 0 ? newQty : 1 }
          : item  
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <AvatarProvider>
      <div className='main-layout'>
      <HeaderBar />
      <LeftBar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/*<MainContent />*/}
      <div className={`main-content${collapsed ? ' collapsed' : ''}`}>
        <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
          <Routes>
            {/* Route cho Shop với nested routing */}
            <Route path="/shop/*" element={<Shop collapsed={collapsed} addToCart={addToCart} />} />

            {/* Route cho Cart */}
            <Route path="/cart" element={<Cart 
            cartItems={cartItems} 
            collapsed={collapsed}
            onChangeQuantity={handleChangeQuantity}
            onRemoveItem={handleRemoveItem} />} />

            {/* Route cho Profile */}
            <Route path="/profile" element={<Profile collapsed={collapsed} />} />
            
            {/* Default route - Shop */}
            <Route path="/" element={<Shop collapsed={collapsed} addToCart={addToCart} />} />

            {/* Catch-all route */}
            <Route path="*" element={<Shop collapsed={collapsed} addToCart={addToCart} />} />
          </Routes>
        </Suspense>
      </div>
    </div>
    </AvatarProvider>
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