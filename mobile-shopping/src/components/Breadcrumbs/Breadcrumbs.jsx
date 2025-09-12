import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import "./Breadcrumbs.css";

const breadcrumbMap = {
    shop: { label: "Shop", to: "/shop" },
    product: { label: "Product", to: "" },
    cart: { label: "Cart", to: "/cart" },
    profile: { label: "Profile", to: "/profile" }
};

const Breadcrumbs = () => {
    const location = useLocation();
    let pathnameArr = location.pathname.split('/').filter(x => x);

    let itemsArr = pathnameArr;
    if(location.pathname === '/' || pathnameArr.length === 0) {
        itemsArr = ["shop"];
    }
    if(
        pathnameArr.length === 3 &&
        pathnameArr[0] === 'shop' &&
        pathnameArr[1] === 'product'
    ) {
        itemsArr = ['shop', 'product'];
    }
    const items = itemsArr.map((item, idx) => {
        const config = breadcrumbMap[item];
        // Nếu là mục cuối thì không cần Link
        if (config) {
            if (idx === itemsArr.length - 1 || !config.to) {
                return (
                    <Breadcrumb.Item key={idx}>
                        <span className="text-xl">{config.label}</span>
                    </Breadcrumb.Item>
                );
            }
            return (
                <Breadcrumb.Item key={idx}>
                    <Link to={config.to} className="text-xl">{config.label}</Link>
                </Breadcrumb.Item>
            );
        }
        // Nếu không có config thì hiển thị tên gốc
        return (
            <Breadcrumb.Item key={idx}>
                <span className="text-xl">{item}</span>
            </Breadcrumb.Item>
        );
    });

    return (
        <nav className="breadcrumbs" style={{ padding: '8px 0' }}>
            <Breadcrumb separator={<span style={{ fontSize: '18px' }}>/</span>}>
                {items}
            </Breadcrumb>
        </nav>
    );
};

export default Breadcrumbs;