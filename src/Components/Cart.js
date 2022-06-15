import React, { useContext, useEffect } from 'react'
import { CartContext } from '../Global/CartContext'
import { Sportik } from './Sportik';
import { Icon } from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md/ic_add'
import { ic_remove } from 'react-icons-kit/md/ic_remove'
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { auth } from '../Config/Config'

export const Cart = ({ user }) => {

    const { basket, dispatch, fullPriceTag, fullAmount } = useContext(CartContext);

    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/login');
            }
        })
    })

    return (
        <>
            <Sportik user={user} />
            <>
                {basket.length !== 0 && <h1>Корзина</h1>}
                <div className='cart-container'>
                    {
                        basket.length === 0 && <>
                            <div>В вашей корзине нет товаров </div>
                            <div><Link to="/">Вернуться на главную страницу</Link></div>
                        </>
                    }
                    {basket && basket.map(cart => (
                        <div className='cart-card' key={cart.ProductID}>

                            <div className='cart-img'>
                                <img src={cart.ImgGoods} alt="not found" />
                            </div>

                            <div className='cart-name'>{cart.NameGoods}</div>

                            <div className='cart-price-orignal'> {cart.PriceTagGoods} руб.</div>

                            <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                                <Icon icon={ic_add} size={24} />
                            </div>

                            <div className='quantity'>{cart.qty}</div>

                            <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                                <Icon icon={ic_remove} size={24} />
                            </div>

                            <div className='cart-price'>
                                 {cart.fullPriceTagPriceTagGoods} руб.
                            </div>

                            <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                                <Icon icon={iosTrashOutline} size={24} />
                            </button>
                        </div>
                    ))
                    }
                    {basket.length > 0 && <div className='cart-summary'>
                        <div className='cart-summary-heading'>
                            Данные корзины
                        </div>
                        <div className='cart-summary-price'>
                            <span>Итоговая цена</span>
                            <span>{fullPriceTag} руб.</span>
                        </div>
                        <div className='cart-summary-price'>
                            <span>Общее количество</span>
                            <span>{fullAmount} шт.</span>
                        </div>
                        <Link to='order' className='order-link'>
                            <button className='btn-site' style={{ marginTop: 5 + 'px' }}>
                                Оплата при доставке
                        </button>
                        </Link>
                    </div>}
                </div>
            </>
        </>
    )
}