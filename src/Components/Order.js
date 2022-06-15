import React, { useState, useEffect, useContext } from 'react'
import { auth, db } from '../Config/Config'
import { CartContext } from '../Global/CartContext'
import { Sportik } from './Sportik';
import { useHistory } from 'react-router-dom'


export const Order = (props) => {

    const history = useHistory();

    const {  fullPriceTag, fullAmount, dispatch } = useContext(CartContext);

    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('SignedUpUsersData').doc(user.uid).onSnapshot(snapshot => {
                    setName(snapshot.data().Name);
                    setEmail(snapshot.data().Email);
                })
            }
            else {
                history.push('/login')
            }
        })
    })

    const Send = (e) => {
        e.preventDefault();
        auth.onAuthStateChanged(user => {
            if (user) {
                const date = new Date();
                const time = date.getTime();
                db.collection('Client-order' + user.uid).doc('_' + time).set({
                    ClientName: name,
                    ClientEmail: email,
                    ClientNumber: number,
                    ClientAddress: address,
                    ClientPay: fullPriceTag, 
                    ClientAmount: fullAmount,
                }).then(() => {
                    setNumber('');
                    setAddress('');
                    dispatch({ type: 'EMPTY' })
                    setSuccessMsg('Ваш заказ успешно размещен. Спасибо, что посетили нас. Вы будете перенаправлены на главную страницу через 5 секунд');
                    setTimeout(() => {
                        history.push('/')
                    }, 5000)
                }).catch(err => setError(err.message))
            }
        })
    }

    return (
        <>
            <Sportik user={props.user} />
            <div className='container'>
                <br />
                <h2>Детали заказа</h2>
                <br />
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                <form autoComplete="off" className='form-group' onSubmit={Send}>
                    <label htmlFor="name">Имя</label>
                    <input type="text" className='form-control' required
                        value={name} disabled />
                    <br />
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' required
                        value={email} disabled />
                    <br />
                    <label htmlFor="number">Номер телефона</label>
                    <input type="text" className='form-control' required
                         onChange={(e) => setNumber(e.target.value)} value={number} placeholder='+79048999900' />
                    <br />
                    <label htmlFor="Delivery Address">Адрес доставки</label>
                    <input type="text" className='form-control' required
                        onChange={(e) => setAddress(e.target.value)} value={address} 
                        placeholder='г.Ижевск,ул.Кирова,д 122,кв.12'
                        />
                    <br />
                    <label htmlFor="Price To Pay">Цена</label>
                    <input type="number" className='form-control' required
                        value={fullPriceTag} disabled />
                    <br />
                    <label htmlFor="Total No of Products">Количество товаров</label>
                    <input type="number" className='form-control' required
                        value={fullAmount} disabled />
                    <br />
                    <button type="submit" className='btn-site'>Отправить</button>
                </form>
                {error && <span className='error-msg'>{error}</span>}
            </div>
        </>
    )
}
