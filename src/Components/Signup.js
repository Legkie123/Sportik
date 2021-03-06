import React, { useState } from 'react'
import { auth, db } from '../Config/Config'
import { Link } from 'react-router-dom'

export const Signup = (props) => {

    // defining state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // signup
    const signup = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            db.collection('SignedUpUsersData').doc(cred.user.uid).set({
                Name: name,
                Email: email,
                Password: password
            }).then(() => {
                setName('');
                setEmail('');
                setPassword('');
                setError('');
                props.history.push('/login');
            }).catch(err => setError(err.message));
        }).catch(err => setError(err.message));
    }

    return (
        <div className='container'>
            <div className='text-uppercase Reg'>
            <h2 >Sportik</h2>
            <p >Магазин спортивных товаров</p>
            </div>
            <br />
            <h2 className='text-uppercase'>Регистрация</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={signup}>
                <label htmlFor="name" >Имя</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setName(e.target.value)} value={name} placeholder='Введите свое имя' />
                <br />
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required
                    onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Введите свой Email'/>
                <br />
                <label htmlFor="passowrd">Пароль</label>
                <input type="password" className='form-control' required
                    onChange={(e) => setPassword(e.target.value)} value={password}  placeholder='Введите пароль'/>
                <br />
                <button type="submit" className='btn-site'>Зарегестрироваться</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            
            <span>
                <Link to="login">Вход</Link>
            </span>
            <br />
            <span>
                <Link to="/">Главная страница</Link>
            </span>
        </div>
    )
}
