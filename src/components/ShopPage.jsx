import '../styles/ShopPage.css'
import Loading from './Loading'

import { useState } from 'react';

function CheckOutCard({item, quantity, index, updateQuantity, deleteInfo}) {
    const cryptoId = self.crypto.randomUUID();
    const [qty, setQty] = useState(quantity);
    const [edit, setEdit] = useState(false);

    function editAndUpdate(cryptoId, index, id) {
        const input = document.getElementById(cryptoId);
        const newValue = Number(input.value);
        if (newValue===0) {
            deleteInfo(id);
        }
        else {
            updateQuantity(index, newValue);
        }
        setEdit(false);
    }

    return (
        <div className='checkOutCard'>
            <img src={item.image} />
            <p>{item.title}</p>
            {(edit) ? <div className='editQuantity'>
                <label htmlFor={cryptoId}>Quantity</label>
                <input id={cryptoId} value={qty} onChange={(e) => setQty(e.target.value)}></input>
                <button type='button' onClick={() => editAndUpdate(cryptoId, index, item.id)}>Update</button>
            </div> :
            <div className='quantity'>
                <p>Quantity: {qty}</p>
                <button type='button' onClick={() => setEdit(true)}>Edit</button>
            </div>}
            <button type='button' onClick={() => deleteInfo(item.id)}>Delete</button>
            <p>${item.price}</p>
        </div>
    )
}

export default function ShopPage({cart, getQuantity, updateQuantity, deleteInfo}) {
    let cards;
    cards = cart.map((info, i=0) => 
        <CheckOutCard key={info.item.id} item={info.item} quantity={getQuantity(info.item.id)} index={i++} updateQuantity={updateQuantity} deleteInfo={deleteInfo} />
    );
    return (
        <div className="ShopPage">
            {(cart.length) ? cards : <p>No items in cart</p>}
        </div>
    )
}