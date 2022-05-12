import React, { useState } from 'react'
import { storage, db } from '../Config/Config'

export const AddendumGoods = () => {

    const [nameGoods, setNameGoods] = useState('');
    const [priceTagGoods, setPriceTagGoods] = useState(0);
    const [imgGoods, setImgGoods] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg']; // image types

    const imgGoodsHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setImgGoods(selectedFile);
            setError('')
        }
        else {
            setImgGoods(null);
            setError('Пожалуйста, выберите допустимый тип изображения (jpg или png)');
        }
    }

    // add product
    const addProduct = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`product-save/${imgGoods.name}`).put(imgGoods);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => setError(err.message)
            , () => {
                storage.ref('product-save').child(imgGoods.name).getDownloadURL().then(url => {
                    db.collection('Products').add({
                        NameGoods: nameGoods,
                        PriceTagGoods: Number(priceTagGoods),
                        ImgGoods: url
                    }).then(() => {
                        setNameGoods('');
                        setPriceTagGoods(0)
                        setImgGoods('');
                        setError('');
                        document.getElementById('file').value = '';
                    }).catch(err => setError(err.message))
                })
            })
    }

    return (
        <div className='container'>
            <br />
            <h2>Добавить товар</h2>
            <hr />
            <form autoComplete="off" className='form-group' onSubmit={addProduct}>
                <label htmlFor="product-name">Название товара</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setNameGoods(e.target.value)} value={nameGoods} />
                <br />
                <label htmlFor="product-price">Цена товара</label>
                <input type="number" className='form-control' required
                    onChange={(e) => setPriceTagGoods(e.target.value)} value={priceTagGoods} />
                <br />
                <label htmlFor="product-img">Картинка товара</label>
                <input type="file" className='form-control' id="file" required
                    onChange={imgGoodsHandler} />
                <br />
                <button type="submit" className='btn-site'>Добавить</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
        </div>
    )
}
