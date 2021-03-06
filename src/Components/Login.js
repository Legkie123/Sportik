import React, { useState } from 'react'
import { auth } from '../Config/Config'
import { Link } from 'react-router-dom'

export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setEmail('');
            setPassword('');
            setError('');
            props.history.push('/');
        }).catch(err => setError(err.message));
    }

    return (
        <div className='container'>
            <div className='text-uppercase Reg'>
            <h2 >Sportik</h2>
            <p >Магазин спортивных товаров</p>
            </div>
            <br />
            <h2 className='text-uppercase'>Вход</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={login}>
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required
                    onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Введите свой Email'/>
                <br />
                <label htmlFor="password">Пароль</label>
                <input type="password" className='form-control' required
                    onChange={(e) => setPassword(e.target.value)} value={password}  placeholder='Введите свой пароль'/>
                <br />
                <button type="submit" className='btn-site'>Вход</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            <br />
            <div className='reg'>
            <span>
                <Link to="signup"> Регистрация</Link>
            </span>
            <br />
            <span>
                <Link to="/">Главная страница</Link>
            </span>
            </div>
        </div>
        
    )
}
