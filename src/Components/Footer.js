import React, { useContext } from 'react'
import { FaVk} from 'react-icons/fa';
import { FaInstagram} from 'react-icons/fa';
import { FaEnvelope} from 'react-icons/fa';


import {ProductsContext} from '../Global/ProductsContext'

export const Footer = () => {
    const { products } = useContext(ProductsContext);
    return (
        <>
        {products.length !== 0 && <div className='Footer '> 
        <h3> <a href="/" className='sport'> Sportik</a></h3>
        <div>
            <a href="https://vk.com/kisheeer"> 
            <FaVk className='vk'/>
            </a>    
            <p className='textfoot'>Вконтакте</p>
        </div>
        
        <div>
            <a href="">
            <FaInstagram className='inst'/>
            </a>
            <p className='textfoot'>Инстаграмм</p>
            </div>
            <div>
            <a href="mailto:biakov01@mail.ru">
            <FaEnvelope className='mail'/>
           </a>
           <p className='textfootmail'>Почта-mail</p>
            </div>
        </div>}
        </>
    )
}