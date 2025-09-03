import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const breadcrumbMap = {
    shop: { label: "Shop", to: "/shop" },
    product: { label: "Product", to: "" },
    cart: { label: "Cart", to: "/cart" },
    profile: { label: "Profile", to: "/profile" }
};

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnameArr = location.pathname.split('/').filter(x => x);

    let itemsArr = pathnameArr;
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
                        <span className="h3">{config.label}</span>
                    </Breadcrumb.Item>
                );
            }
            return (
                <Breadcrumb.Item key={idx}>
                    <Link to={config.to} className="h3">{config.label}</Link>
                </Breadcrumb.Item>
            );
        }
        // Nếu không có config thì hiển thị tên gốc
        return (
            <Breadcrumb.Item key={idx}>
                <span className="h3">{item}</span>
            </Breadcrumb.Item>
        );
    });

    return (
        <nav className="breadcrumbs" style={{ padding: '8px 0', marginLeft: '8px' }}>
            <Breadcrumb>
                {items}
            </Breadcrumb>
        </nav>
    );
};

export default Breadcrumbs;