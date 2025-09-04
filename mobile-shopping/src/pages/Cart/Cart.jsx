import { useState } from 'react';
import './Cart.css';

const Cart = ({ cartItems, collapsed }) => {

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
                            <img src={item.image} alt={item.name} className='cart-item-img'/>
                            <div className='cart-item-detail'>
                                <b className='cart-item-name'>Điện thoại {item.name}</b>
                                <div className='cart-item-desc'>{item.description}</div>
                                <div className='cart-item-price'>
                                    <b>{item.price}</b>
                                </div>
                            </div>
                            <div className='cart-item-actions'>
                                <button className='cart-action-btn'>+</button>
                                <span className='cart-item-qty'>{item.quantity}</span>
                                <button className='cart-action-btn'>-</button>
                            </div>
                            <button className='cart-item-remove'>×</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
};

export default Cart;
