import React, { useEffect } from 'react'
import { Sportik } from './Sportik';
import { Goods } from './Goods'
import { useHistory } from 'react-router-dom'
import { auth } from '../Config/Config'

export const Home = ({ user }) => {

    const history = useHistory();

    useEffect(() => {
        
        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/login');
            }
        })
    })

    return (
        <div className='wrapper'>
            <Sportik user={user} />
            <Goods/>
        </div>
    )
}
