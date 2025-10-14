import React, { useState, useEffect, useRef } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailProductStart } from '../../redux/product/ProductSlice';
import { Button, notification, Carousel } from 'antd';
import { toast } from "react-toastify";
import { CheckCircleOutlined } from '@ant-design/icons';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';
import { addToCart } from "../../redux/cart/CartSlice";
import { TiShoppingCart } from "react-icons/ti";
import './Product.css';

const Product = ({ collapsed }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);
    const detailProduct = useSelector((state) => state.product.detailProduct);
    const loading = useSelector((state) => state.product.loading);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [api, contextHolder] = notification.useNotification();
    const cartItems = useSelector((state) => state.cart.items);
    const cartQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );
    const navigate = useNavigate();
    const carouselRef = useRef(null);

    useEffect(() => {
        dispatch(fetchDetailProductStart(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (detailProduct && detailProduct.images?.length) {
        setSelectedIndex(0); 
        }
    }, [detailProduct]);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if(!token) {
            toast.error('Vui lòng đăng nhập!');
            return;
        }
        dispatch(addToCart(detailProduct));
        api.success({
            message: 'Thêm vào giỏ hàng thành công!',
            description: `${detailProduct.title} đã được thêm vào giỏ hàng của bạn.`,
            placement: 'topRight',
            icon: <CheckCircleOutlined style={{ color: '#1a8ec4ff' }} />,
            duration: 3, 
        });
    };

    const handleBuyNow = (e) => {
        e.stopPropagation();
        if (!token) {
        toast.error("Vui lòng đăng nhập.");
        return;
        }
        dispatch(addToCart(detailProduct));
        api.success({
            message: 'Thêm vào giỏ hàng thành công!',
            description: `${detailProduct.title} đã được thêm vào giỏ hàng của bạn.`,
            placement: 'topRight',
            icon: <CheckCircleOutlined style={{ color: '#1a8ec4ff' }} />,
            duration: 3, 
        });
        navigate("/cart");
    };

    const handleNavigateToCart = () => {
        navigate('/cart');
    }

    const onCarouselChange = (current) => {
        setSelectedIndex(current);
    };

    const onThumbnailClick = (index) => {
        setSelectedIndex(index);
        carouselRef.current.goTo(index, false);
    };

    if (loading || !detailProduct) return <p>Đang tải dữ liệu...</p>;

    return (
        <div className={`product-page${collapsed ? ' collapsed' : ''}`}>
            {contextHolder}
            <div className='product-header'>
                <div className='product-title-container'>
                    <div className='product-title text-2xl'>Shop</div>
                    <div className='product-breadcrumb-and-cart relative'>
                        <Breadcrumb />
                        <TiShoppingCart className='cart-tool text-gray-700 hover:text-gray-900 transition'
                        style={{ cursor: 'pointer' }}
                        onClick={handleNavigateToCart}
                        />
                        {cartQuantity > 0 && (
                        <span className="absolute -top-1 right-8 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                            {cartQuantity}
                        </span>
                        )}
                    </div>
                </div>
            </div>

            <div className='product-content'>
                <div className='product-detail-container'>
                    <div className='product-image-section'>
                        <div className="product-detail-img">
                            <Carousel
                                arrows infinite={false} 
                                afterChange={onCarouselChange}
                                ref={carouselRef}
                            >
                                {detailProduct.images?.map((img, idx) => (
                                    <div key={idx}>
                                        <img
                                            src={img}
                                            alt={`${detailProduct.title} - image ${idx}`}
                                            style={{ width: '100%', height: '300px', objectFit: 'cover',  backgroundColor: 'var(--color-dark-3)' }}
                                        />
                                    </div> 
                                ))}
                            </Carousel>
                            <div className="thumbnail-img flex gap-2 overflow-x-auto">
                                {detailProduct.images?.map((img, idx) => (
                                    <img
                                    key={idx}
                                    src={img}
                                    alt={`Thumbnail ${idx}`}
                                    onClick={() => onThumbnailClick(idx)}
                                    className={`w-16 h-16 object-cover rounded cursor-pointer border-3 transition ${
                                        idx === selectedIndex
                                        ? "border-blue-500"
                                        : "border-transparent"
                                    }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='product-info-section'>
                        <h2 className="product-name">{detailProduct.title}</h2>
                        <div className="product-price p1-b" style={{ 
                            color: '#e74c3c', 
                        }}>
                            ${detailProduct.price}
                        </div>

                        <div className="product-description">
                            <p className='p3-r' style={{ color: '#666' }}>
                                {detailProduct.title} là một sản phẩm chất lượng cao với thiết kế hiện đại và tính năng vượt trội. 
                                Sản phẩm được đánh giá {detailProduct.rating}/5 sao bởi người dùng và có giá cạnh tranh trên thị trường.
                                Đây là lựa chọn hoàn hảo cho những ai đang tìm kiếm một thiết bị di động đáng tin cậy và hiệu quả.
                            </p>
                        </div>
                         <div className="product-rating p2-r">
                            <span>Đánh giá: {detailProduct.rating} ⭐</span>
                            <span style={{ color: '#666' }}>({Math.floor(Math.random() * 100) + 50} đánh giá)</span>
                        </div>
                        <div className="product-actions">
                            <Button className='h2'
                                type="primary" 
                                size="large"
                                style={{ 
                                    
                                    maxWidth: '170px',
                                    height: '48px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    backgroundColor: 'var(--color-addtocart-btn)',
                                }}
                                onClick={handleAddToCart}
                            >
                                Thêm vào giỏ hàng
                            </Button>
                            <Button className='h2'
                                type="primary" 
                                size="large"
                                style={{ 
                                    flex: '1', 
                                    maxWidth: '170px',
                                    height: '48px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    backgroundColor: 'var(--color-purchase-btn)',
                                }}
                                onClick={handleBuyNow}
                            >
                                Mua ngay
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;