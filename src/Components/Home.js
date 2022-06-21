import React, { useEffect } from 'react'
import { Sportik } from './Sportik';
import { Goods } from './Goods'
import { useHistory } from 'react-router-dom'
import {Footer} from './Footer';


export const Home = ({ user }) => {

    const history = useHistory();

   

    return (
        <div className='wrapper'>
            <Sportik user={user} />
            <Goods />
            <Footer/>
        </div>
    )
}
