import {useState,useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import Shop from '../../assets/images/shop.svg';
import Cart from '../../assets/images/cart.png';
import Profile from '../../assets/images/profile.svg';
import './LeftBar.css';

const menuItems = [
    { key: 'shop', label: 'Shop', icon: Shop, path: '/shop' },
    { key: 'cart', label: 'Cart', icon: Cart, path: '/cart' },
    { key: 'profile', label: 'Profile', icon: Profile, path: '/profile' },
];

const LeftBar = ({ collapsed, setCollapsed }) => {
    const location = useLocation();
    const handleCollapse = () => setCollapsed(!collapsed);

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth <= 768) {
                setCollapsed(true);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [setCollapsed]);
    
    return (
        <div className={`leftbar-container${collapsed ? ' collapsed' : ''}`}>
            <div className="leftbar-header">
                <span className="leftbar-title p1-r">{!collapsed && 'Menu'}</span>
                <button className="leftbar-toggle" onClick={handleCollapse}>
                    <span className="menu-icon">&#9776;</span>
                </button>
            </div>
            <div className="leftbar-menu">
                {menuItems.map(item => (
                    <Link
                        key={item.key}
                        to={item.path}
                        className={`leftbar-item${location.pathname === item.path ||
                        (item.key === 'shop' && (location.pathname === '/' || location.pathname.startsWith('/shop'))) ? ' active' : ''}`}
                    >
                        <span className="leftbar-icon">
                            <img src={item.icon} alt={`${item.label} icon`} />
                        </span>
                        {!collapsed && <span className="leftbar-label !text-base p1-r">{item.label}</span>}
                    </Link>
                ))}
            </div>
        </div>
    )
};

export default LeftBar;