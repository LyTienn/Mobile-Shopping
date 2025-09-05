import { useState, useEffect, useContext } from 'react';
import { AvatarContext } from '../../pages/Context/AvatarContext';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
// import Avatar from '../../assets/images/avatar.png';

const Header = () => {
    const { avatar } = useContext(AvatarContext);
    const navigate = useNavigate();
    const handleViewProfile = () => {
        navigate('/profile');
    }

    const handleNavigateDashboard = () => {
        navigate('/');
        window.location.reload();
    };

    return (
        <header className='header-container'>
            <div className='header-left'>
                <img src={Logo} alt='logo' className='header-logo' onClick={handleNavigateDashboard}/>
                <span className='header-title h1'>Mobile Shopping</span>
            </div>
            <div className='header-right'>
                <img src={avatar} alt='avatar' className='header-avatar' onClick={handleViewProfile}/>
            </div>
        </header>
    )
}

export default Header;