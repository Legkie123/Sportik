import React, { useContext } from 'react'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'
import { auth } from '../Config/Config'
import { Icon } from 'react-icons-kit'
import {basket} from 'react-icons-kit/ikons/basket'
import { useHistory } from 'react-router-dom'
import { CartContext } from '../Global/CartContext'

export const Sportik = ({ user }) => {

    const history = useHistory();
    const {fullAmount} = useContext(CartContext);

    // handle logout
    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/login');
        })
    }

    return (
      
        <div className='header'>
            
            <div className='left'>
               <Link to ="/"><img src={logo} alt="logo" /></Link> 
            </div>
            <div className='NickName text-uppercase'>
            <h2>Sportik</h2>
            <p className="shop">Магазин спортивных товаров</p>
            </div>
            {!user && <div className='right'>
                <span><Link to="signup" className='link'>Регистрация</Link></span>
                <span><Link to="login" className='link'>Вход</Link></span>
            </div>}
            {user && <div className='right'>
                <span><Link to="/" className='link'>{user}</Link></span>
                <span><Link to="cartproducts" className='link'><Icon icon={basket} /></Link></span>
                <span className='nogoods'>{fullAmount}</span>
                <span><button className='log-btn' onClick={handleLogout}>Выйти</button></span>
            </div>}
        </div>
    )
}
