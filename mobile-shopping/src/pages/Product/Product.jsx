import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';
import './Product.css';

const Product = ({ productItems }) => {
    const { productId } = useParams();
    const navigate = useNavigate();
    
    // Tìm sản phẩm theo ID
    const product = productItems.find(p => p.id === Number(productId));

    const handleBackToShop = () => {
        navigate('/shop');
    };

    if (!product) {
        return (
            <div className='product-page'>
                <div className='product-header'>
                    <div>
                        <div className='shop-title h2'>Shop</div>
                        <div className='shop-breadcrumbs'>
                            <Breadcrumb />
                        </div>
                    </div>
                </div>
                <hr />
                <div className='product-content' style={{ padding: '20px', textAlign: 'center' }}>
                    <div className='no-product'>
                        <h3>Không tìm thấy sản phẩm!</h3>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='product-page'>
            {/* Header section */}
            <div className='product-header'>
                <div>
                    <div className='shop-title h2'>Shop</div>
                    <div className='shop-breadcrumbs'>
                        <Breadcrumb />
                    </div>
                </div>
            </div>
            
            <hr />

            {/* Product detail content */}
            <div className='product-content' style={{ padding: '20px' }}>
                <div className='product-detail-container' style={{ 
                    display: 'flex', 
                    gap: '30px', 
                    alignItems: 'flex-start',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {/* Product image */}
                    <div className='product-image-section' style={{ 
                        flex: '0 0 400px',
                        textAlign: 'center'
                    }}>
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="product-detail-img"
                            style={{
                                width: '100%',
                                maxWidth: '400px',
                                height: 'auto',
                                border: '1px solid #f0f0f0',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                        />
                    </div>

                    {/* Product info */}
                    <div className='product-info-section' style={{ flex: '1' }}>
                        <h1 className="product-name" style={{ 
                            fontSize: '28px', 
                            marginBottom: '16px',
                            fontWeight: 'bold',
                            color: '#333'
                        }}>
                            {product.name}
                        </h1>
                        
                        <div className="product-price" style={{ 
                            fontSize: '24px', 
                            color: '#e74c3c', 
                            fontWeight: 'bold',
                            marginBottom: '16px'
                        }}>
                            {product.price}
                        </div>
                        
                        <div className="product-rating" style={{ 
                            fontSize: '16px',
                            marginBottom: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <span>Đánh giá: {product.rating} ⭐</span>
                            <span style={{ color: '#666' }}>({Math.floor(Math.random() * 100) + 50} đánh giá)</span>
                        </div>

                        {/* Product specifications */}
                        <div className="product-specs" style={{ 
                            background: '#f9f9f9',
                            padding: '20px',
                            borderRadius: '8px',
                            marginBottom: '24px',
                            border: '1px solid #e9e9e9'
                        }}>
                            <h3 style={{ 
                                marginBottom: '16px', 
                                fontSize: '18px',
                                fontWeight: 'bold' 
                            }}>
                                Thông số kỹ thuật:
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
                                <div><strong>Xuất xứ:</strong> Chính hãng</div>
                            </div>
                        </div>

                        {/* Product description */}
                        <div className="product-description" style={{ 
                            marginBottom: '24px',
                            lineHeight: '1.6'
                        }}>
                            <h3 style={{ 
                                marginBottom: '12px', 
                                fontSize: '18px',
                                fontWeight: 'bold' 
                            }}>
                                Mô tả sản phẩm:
                            </h3>
                            <p style={{ color: '#666', fontSize: '14px' }}>
                                {product.name} là một sản phẩm chất lượng cao với thiết kế hiện đại và tính năng vượt trội. 
                                Sản phẩm được đánh giá {product.rating}/5 sao bởi người dùng và có giá cạnh tranh trên thị trường.
                                Đây là lựa chọn hoàn hảo cho những ai đang tìm kiếm một thiết bị di động đáng tin cậy.
                            </p>
                        </div>

                        {/* Action buttons */}
                        <div className="product-actions" style={{ 
                            display: 'flex', 
                            gap: '16px',
                            marginTop: '32px'
                        }}>
                            <Button 
                                type="primary" 
                                size="large"
                                style={{ 
                                    flex: '1', 
                                    maxWidth: '200px',
                                    height: '48px',
                                    fontSize: '16px',
                                    fontWeight: 'bold'
                                }}
                            >
                                Thêm vào giỏ hàng
                            </Button>
                            <Button 
                                type="default" 
                                size="large"
                                style={{ 
                                    flex: '1', 
                                    maxWidth: '200px',
                                    height: '48px',
                                    fontSize: '16px',
                                    backgroundColor: '#ff6b6b',
                                    color: 'white',
                                    border: 'none'
                                }}
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