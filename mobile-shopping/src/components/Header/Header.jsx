import { Link } from "react-router-dom";
import { Layout, Avatar, Dropdown, Button} from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user/UserSlice";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import { toast } from "react-toastify";

const { Header: AntHeader } = Layout;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.profile);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    toast.success("Bạn đã đăng xuất thành công!");
    navigate("/shop");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <AntHeader
      style={{
        width: "100%",
        backgroundColor: "var(--color-header)", 
        padding: "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        zIndex: 100,
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div
          className="flex items-center cursor-pointer"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <img src={Logo} alt="Logo" style={{ width: 50, height: 40 }} />
          <div className="header-title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            style={{
              margin: 0,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Mobile Shopping
          </div>
        </div>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {user ? (
          <Dropdown
            menu={{ 
                items: [
                    {
                        key: "profile",
                        icon: <UserOutlined />, 
                        label: "Thông tin cá nhân", 
                        onClick: () => navigate("/profile") 
                    },
                    {
                        type: "divider",
                    },
                    { 
                        key: "logout",
                        icon: <LogoutOutlined />, 
                        label: "Đăng xuất", 
                        onClick: handleLogout 
                    },
                ], 
            }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Avatar
              src={user.image || Logo}
              size="large"
              style={{ 
                cursor: "pointer", 
                backgroundColor: "#fff",
                marginRight: 40,
              }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        ) : (
          <Button icon={<LoginOutlined />} type="primary" onClick={handleLogin} style={{ marginRight: 40 }}>
            Đăng nhập
          </Button>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;