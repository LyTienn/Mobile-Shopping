import { useParams, useNavigate } from 'react-router-dom';
import { Button, notification } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';
import Cart from '../../assets/images/cart.png';
import './Product.css';

const Product = ({ productItems, collapsed, addToCart }) => {
    const { productId } = useParams();
    const product = productItems.find(p => p.id === Number(productId));
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const handleAddToCart = () => {
        addToCart(product);
        api.success({
            message: 'Thêm vào giỏ hàng thành công!',
            description: `${product.name} đã được thêm vào giỏ hàng của bạn.`,
            placement: 'topRight',
            icon: <CheckCircleOutlined style={{ color: '#1a8ec4ff' }} />,
            duration: 3, 
        });
    };
    const handleNavigateToCart = () => {
        navigate('/cart');
    }
    return (
        <div className={`product-page${collapsed ? ' collapsed' : ''}`}>
            {contextHolder}
            <div className='product-header'>
                <div className='product-title-container'>
                    <div className='product-title h2'>Shop</div>
                    <Breadcrumb />
                </div>
                <img className='cart-tool'
                    src={Cart}
                    alt='cart'
                    style={{ cursor: 'pointer' }}
                    onClick={handleNavigateToCart}
                />
            </div>
            
            <hr />

            <div className='product-content'>
                <div className='product-detail-container'>
                    <div className='product-image-section'>
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="product-detail-img"
                        />
                        <div className="product-actions">
                            <Button className='h2'
                                type="primary" 
                                size="large"
                                style={{ 
                                    flex: '1', 
                                    maxWidth: '170px',
                                    height: '48px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    backgroundColor: 'var(--color-addtocart-btn',
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
                            >
                                Mua ngay
                            </Button>
                        </div>
                    </div>

                    <div className='product-info-section'>
                        <h1 className="product-name">{product.name}</h1>
                        <div className="product-price p1-b" style={{ 
                            color: '#e74c3c', 
                        }}>
                            {product.price}
                        </div>
                        
                        <div className="product-rating p2-r">
                            <span>Đánh giá: {product.rating} ⭐</span>
                            <span style={{ color: '#666' }}>({Math.floor(Math.random() * 100) + 50} đánh giá)</span>
                        </div>

                        <div className="product-specs">
                            <h3 style={{ 
                                marginBottom: '16px', 
                                fontSize: '18px',
                                fontWeight: 'bold' 
                            }}>
                                Thông tin chung:
                            </h3>
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: '1fr 1fr', 
                                gap: '12px',
                                fontSize: '14px'
                            }}>
                                <div><strong>Mã sản phẩm:</strong> SP{product.id.toString().padStart(4, '0')}</div>
                                <div><strong>Giá gốc:</strong> {product.priceValue.toLocaleString('vi-VN')} VNĐ</div>
                                <div><strong>Đánh giá:</strong> {product.rating}/5 sao</div>
                                <div><strong>Tình trạng:</strong> <span style={{color: '#28a745'}}>Còn hàng</span></div>
                                <div><strong>Bảo hành:</strong> 12 tháng</div>
                                <div><strong>Xuất xứ:</strong> Việt Nam</div>
                            </div>
                        </div>

                        <div className="product-description">
                            <h3 style={{  
                                fontSize: '18px',
                                fontWeight: 'bold' 
                            }}>
                                Mô tả sản phẩm:
                            </h3>
                            <p className='p3-r' style={{ color: '#666' }}>
                                {product.name} là một sản phẩm chất lượng cao với thiết kế hiện đại và tính năng vượt trội. 
                                Sản phẩm được đánh giá {product.rating}/5 sao bởi người dùng và có giá cạnh tranh trên thị trường.
                                Đây là lựa chọn hoàn hảo cho những ai đang tìm kiếm một thiết bị di động đáng tin cậy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;