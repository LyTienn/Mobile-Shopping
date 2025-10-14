import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/user/UserSlice";
import { toast } from "react-toastify";
import Logo from '../../assets/images/Logo.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isLoggedIn } = useSelector((state) => state.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
    }

    useEffect(() => {
        console.log('State changed:', { isLoggedIn, loading, error }); // Debug
        
        if (isLoggedIn && !loading && !error) {
            toast.success("Đăng nhập thành công");
            const timer = setTimeout(() => {
                navigate("/");
            }, 2000);
            return () => clearTimeout(timer); 
        }
        
        // Hiển thị lỗi nếu có
        if (error && !loading) {
            toast.error(error);
        }
    }, [isLoggedIn, loading, error, navigate]);

    return (
        <div className="login-container">
            <img src={Logo} alt='Logo' className="logo" />
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <input className="p2-r" type="text" value={username} placeholder="emilys" required onChange={(e) => setUsername(e.target.value)} />
                    <div style={{ position: "relative" }}>
                        <input
                            className="p2-r"
                            type={showPass ? "text" : "password"}
                            value={password}
                            placeholder="emilyspass"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: "100%" }}
                        />
                        <span
                            style={{
                                position: "absolute",
                                right: 12,
                                top: "50%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                                fontSize: "1.2rem",
                                color: "#888"
                            }}
                            onClick={() => setShowPass(!showPass)}
                        >
                            {!showPass ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <div className="checkbox-row">
                        <div className="checkbox-label-group">
                            <input className="p3-r" type="checkbox" id="remember" />
                            <label htmlFor="remember" className="p3-r">Lưu đăng nhập</label>
                        </div>
                        <Link to="/forgot" className="p3-r">
                            Quên mật khẩu?
                        </Link>
                    </div>
                    {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
                    <button 
                        type="submit" 
                        className="login-btn"
                        disabled={loading}    
                    >{loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>            
                </form>
            </div>
        </div>
    )
}

export default Login;