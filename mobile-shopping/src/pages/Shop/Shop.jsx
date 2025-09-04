import { useState, Suspense, lazy } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Filter1 from '../../components/Filter/Filter';
import Filter from '../../assets/images/Filter.png';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';
import Samsung from '../../assets/images/Samsung glx a31.png';
import Ip12 from '../../assets/images/ip12.webp';
import Xiaomi from '../../assets/images/xiaomi_redmi_note10.webp';
import { Rate, Button } from "antd";
import './Shop.css';

// Lazy load Product component
const Product = lazy(() => import('../Product/Product'));

const productItems = [
    { id: 1, name: 'Samsung Galaxy A31', price: '5.299.000 VNĐ', priceValue: 5299000, image: Samsung, rating: 4 },
    { id: 2, name: 'iPhone 12', price: '12.000.000 VNĐ', priceValue: 12000000, image: Ip12, rating: 4.5 },
    { id: 3, name: 'Xiaomi Redmi Note 10', price: '4.500.000 VNĐ', priceValue: 4500000, image: Xiaomi, rating: 4 },
    { id: 4, name: 'Oppo A54', price: '3.990.000 VNĐ', priceValue: 3990000, image: Samsung, rating: 3 },
    { id: 5, name: 'Vivo Y20s', price: '4.290.000 VNĐ', priceValue: 4290000, image: Samsung, rating: 4 },
    { id: 6, name: 'Realme 8', price: '4.000.000 VNĐ', priceValue: 4000000, image: Samsung, rating: 4 },
];

// Component hiển thị danh sách sản phẩm
const ShopProductList = ({ handleViewProduct, collapsed }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [filter, setFilter] = useState({
        priceFrom: 0,
        priceTo: 50000000,
        ratingFrom: 0,
        ratingTo: 5
    });
    const [pendingFilter, setPendingFilter] = useState(filter);
    const [search, setSearch] = useState("");
    
    const handleFilterChange = (newFilter) => {
        setPendingFilter(newFilter);
    };

    const handleApplyFilter = () => {
        setFilter(pendingFilter);
    }

    const handleResetFilter = (resetFilters) => {
        setPendingFilter(resetFilters);
    }

    const searchProduct = productItems.filter((p) => {
        const matchSearch =
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.price.toLowerCase().includes(search.toLowerCase());
        const matchPrice = p.priceValue >= filter.priceFrom && p.priceValue <= filter.priceTo;
        const matchRating =
            p.rating >= filter.ratingFrom &&
            p.rating <= filter.ratingTo;

        return matchSearch && matchPrice && matchRating;
    });

    return (
        <div className={`shop-page${collapsed ? ' collapsed' : ''}`}>
            <div className='shop-header'>
                <div>
                    <div className='shop-title h2'>Shop</div>
                    <Breadcrumb />
                </div>
                <div className='shop-tool'>
                    <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <img src={Filter} alt='filter' className='filter-icon'
                        onMouseEnter={() => setShowFilter(true)}
                    />
                    {showFilter && (
                        <div
                            className="filter-dropdown"
                            onMouseEnter={() => setShowFilter(true)}
                            onMouseLeave={() => setShowFilter(false)}
                            style={{
                                position: 'absolute',
                                top: '110px',
                                right: 0,
                                zIndex: 10
                            }}
                        >
                            <Filter1
                                filter={pendingFilter} 
                                onFilterChange={handleFilterChange}
                                onReset={handleResetFilter}
                                onApply={handleApplyFilter}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className='shop-product'>
                <div className='shop-product-list'>
                    {searchProduct.map(item => (
                        <div className='shop-product-item' key={item.id}>
                            <div className='shop-product-interact'>
                                <img src={item.image} alt={item.name} />
                                <Button type='default' className='view-btn' onClick={() => handleViewProduct(item.id)}>
                                    View
                                </Button>
                            </div>
                            <div className='shop-product-info'>
                                <h3 className='p1-b'>{item.name}</h3>
                                <p className='h3'>{item.price}</p>
                                <Rate allowHalf defaultValue={item.rating} />
                            </div>
                        </div>
                    ))}
                    {searchProduct.length === 0 && search && (
                        <div className='no-products p1-r'>
                            <p>Không tìm thấy sản phẩm nào phù hợp với từ khóa "{search}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Shop = ({ collapsed, addToCart }) => {
    const navigate = useNavigate();

    const handleViewProduct = (productId) => {
        navigate(`/shop/product/${productId}`);
    };

    return (
        <Routes>
            <Route 
                index 
                element={
                    <ShopProductList handleViewProduct={handleViewProduct} collapsed={collapsed} />
                } 
            />
            
            <Route
                path="product/:productId"
                element={
                    <Suspense fallback={<div className="loading-spinner">Loading Product...</div>}>
                        <Product productItems={productItems} collapsed={collapsed} addToCart={addToCart} />
                    </Suspense>
                }
            />
        </Routes>
    );
};

export default Shop;