import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../../redux/cart/CartSlice";
import { CloseOutlined } from '@ant-design/icons';
import './Cart.css';

const Cart = ({  collapsed }) => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const token = useSelector((state) => state.user.token);
    if (!token) {
        return (
        <div className="p-6 bg-white rounded-lg">
            <Title level={2}>Giỏ hàng</Title>
            <p className="text-lg mt-4 text-red-600">
            Vui lòng đăng nhập để sử dụng giỏ hàng.
            </p>
        </div>
        );
    }

    const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity,0);
    const tax = subTotal * 0.1;
    const grandTotal = subTotal + tax;

    return (
        <div className={`cart-page${collapsed ? ' collapsed' : ''}`}>
            <div className='cart-header'>
                <div>
                    <div className="cart-title text-2xl">Cart</div>
                </div>
                <div className='cart-info'>
                    {cartItems.length > 0 && (
                        <span>{cartItems.length} Items in bag</span>
                    )}
                </div>
            </div>
            {cartItems.length === 0 ? (
                <div className='empty-cart'>Giỏ hàng rỗng</div>
            ) : (
                <div className="cart-body">
                    <div className='cart-content space-y-4'>
                    {cartItems.map(item => (
                        <div 
                            className='cart-item grid grid-cols-6 gap-4 items-center border-b pb-4' 
                            key={item.id}
                        >
                            <div className="col-span-1">
                                <img
                                src={item.thumbnail || item.image}
                                alt={item.title}
                                className="w-full rounded"
                                />
                            </div>
                            <div className='col-span-3 flex flex-col text-left gap-4'>
                                <b className='text-lg'> {item.title}</b>
                                <div className=' text-red-500'>
                                    <b>${item.price}</b>
                                </div>
                            </div>
                            <div className='cart-item-actions col-span-2 flex justify-end'>
                                <button className='cart-action-btn'
                                onClick={() => dispatch(increaseQuantity(item.id))}
                                >+</button>
                                <span className='cart-item-qty'>{item.quantity}</span>
                                <button className='cart-action-btn'
                                onClick={() => dispatch(decreaseQuantity(item.id))}
                                disabled={item.quantity <= 1}
                                >-</button>
                                <div className="col-span-2 flex justify-end">
                                    <button
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                    className="remove-cart bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                                    >
                                    Xoá
                                    </button>
                                </div>
                            </div>
                            <CloseOutlined onClick={() => dispatch(removeFromCart(item.id))} />
                        </div>
                    ))}
                    </div>
                    <div className='cart-total'>
                        <div className='cart-total-row text-base'>
                            <span>SubTotal:</span>
                            <span className="text-red-600">${subTotal.toFixed(2)}</span>
                        </div>
                        <div className='cart-total-row text-base'>
                            <span>Tax:</span>
                            <span className="text-red-600">${tax.toFixed(2)}</span>
                        </div>
                        <div className='cart-total-row text-2xl'>
                            <span>Total:</span>
                            <span className="text-red-600 font-bold">${grandTotal.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={() => dispatch(clearCart())}
                            className="remove-total mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Xoá toàn bộ giỏ hàng
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
};

export default Cart;