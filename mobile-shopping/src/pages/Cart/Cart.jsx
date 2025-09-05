import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import './Cart.css';

const Cart = ({ cartItems, collapsed, onChangeQuantity, onRemoveItem }) => {
    return (
        <div className={`cart-page${collapsed ? ' collapsed' : ''}`}>
            <div className='cart-header'>
                <div className='cart-title-container'>
                    <div className='cart-title h2'>Cart</div>
                </div>
                <div className='cart-info'>
                    {cartItems.length > 0 && (
                        <span>{cartItems.length} Items in bag</span>
                    )}
                </div>
            </div>
            <hr />
            {cartItems.length === 0 ? (
                <div className='empty-cart'>Giỏ hàng rỗng</div>
            ) : (
                <div className='cart-items'>
                    {cartItems.map(item => (
                        <div className='cart-item' key={item.id}>
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className='cart-item-img'  
                            />
                            <div className='cart-item-detail'>
                                <b className='cart-item-name'>Điện thoại {item.name}</b>
                                <div className='cart-item-price'>
                                    <b>{item.price}</b>
                                </div>
                            </div>
                            <div className='cart-item-actions'>
                                <button className='cart-action-btn'
                                onClick={() => onChangeQuantity(item.id, item.quantity + 1)}
                                >+</button>
                                <span className='cart-item-qty'>{item.quantity}</span>
                                <button className='cart-action-btn'
                                onClick={() => onChangeQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                >-</button>
                            </div>
                            <CloseOutlined onClick={() => onRemoveItem(item.id)} />
                        </div>
                    ))}
                </div>
            )}
            <hr />
            <div className='cart-total'>
                <div className='cart-total-row'>
                    <span>SubTotal:</span>
                    <span>
                        {cartItems
                            .reduce((sum, item) => sum + item.priceValue * item.quantity, 0)
                            .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                        }
                    </span>
                </div>
                <div className='cart-total-row'>
                    <span>Tax:</span>
                    <span>
                        {(
                            cartItems.reduce((sum, item) => sum + item.priceValue * item.quantity, 0) * 0.1)
                            .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                        }
                    </span>
                </div>
                <div className='cart-total-row total-amount'>
                    <span>Total:</span>
                    <span>
                        {(
                            cartItems.reduce((sum, item) => sum + item.priceValue * item.quantity, 0) * 1.1)
                            .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                        }
                    </span>
                </div>
            </div>
        </div>
    )
};

export default Cart;
