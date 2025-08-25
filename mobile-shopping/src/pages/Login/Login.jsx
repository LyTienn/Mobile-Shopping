import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/images/Logo.png';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/home');
    }

    return (
        <div className="login-container">
            <img src={Logo} alt='Logo' className="logo" />
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <input className="p2-r" type="text" placeholder="Tên đăng nhập" required />
                    <input className="p2-r" type="password" placeholder="Mật khẩu" required />
                    <div className="checkbox-row">
                        <div className="checkbox-label-group">
                            <input className="p3-r" type="checkbox" id="remember" />
                            <label htmlFor="remember" className="p3-r">Lưu đăng nhập</label>
                        </div>
                        <Link to="/forgot" className="p3-r">
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <button type="submit" className="login-btn">Đăng nhập</button>            
                </form>
            </div>
        </div>
    )
}

export default Login;