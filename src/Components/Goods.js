import React, { useContext } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
import { CartContext } from '../Global/CartContext'
import Spinner from '../images/Spinner.svg'

export const Goods = () => {

    const { products } = useContext(ProductsContext);

    const { dispatch } = useContext(CartContext);

    return (
        <>
            {products.length !== 0 && <div className='Googs text-uppercase'><h2>Товары</h2> </div>}
            <div className='casket'>
                {products.length === 0 && <div className='wait'>Подождите пожалуйста <img className='Spinner' src={Spinner} alt="Spinner"/></div>}
                {products.map(product => (
                    <div className='goods-map' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.ImgGoods} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.NameGoods}
                        </div>
                        <div className='product-price'>
                             {product.PriceTagGoods} руб.
                    </div>
                        <button className='addcart-btn' onClick={() => dispatch({ type: 'add_to_cart', id: product.ProductID, product })}>Добавить в корзину</button>
                    </div>
                ))}
            </div>
        </>
    )
}