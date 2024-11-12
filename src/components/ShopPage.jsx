import '../styles/ShopPage.css'
import Loading from './Loading'

import { useState } from 'react';

function CheckOutCard({item, quantity, updateQuantity, deleteInfo}) {
    const cryptoId = self.crypto.randomUUID();
    const [qty, setQty] = useState(quantity);
    const [edit, setEdit] = useState(false);

    function editAndUpdate(cryptoId, id) {
        const input = document.getElementById(cryptoId);
        const newValue = Number(input.value);
        if (newValue===0) {
            deleteInfo(id);
        }
        else {
            updateQuantity(id, newValue);
        }
        setEdit(false);
    }

    return (
        <div className='checkOutCard'>
            <img src={item.image} />
            <div className='information'>
                <p className='cardTitle'>{item.title}</p>
                {/* toggle edit on and off */}
                <div className='edit'>
                    {(edit) ? <div className='editQuantity'>
                        <label htmlFor={cryptoId}>Quantity</label>
                        <input id={cryptoId} value={qty} onChange={(e) => setQty(e.target.value)}></input>
                        <button type='button' onClick={() => editAndUpdate(cryptoId, item.id)}>Update</button>
                    </div> :
                    <div className='quantity'>
                        <p>Quantity: {qty}</p>
                        <button type='button' onClick={() => setEdit(true)}>Edit</button>
                    </div>}
                    <button type='button' onClick={() => deleteInfo(item.id)}>Delete</button>
                </div>
            </div>
            <p className='price'>${item.price.toFixed(2)}</p>
        </div>
    )
}

function Subtotal({itemQuantity, subtotal}) {
    return (
        <div className='subtotalBox'>
            <p className='subtotal'>Subtotal ({itemQuantity} items): <span className='price'>${subtotal.toFixed(2)}</span></p>
            <button type='button'>Proceed to Checkout</button>
        </div>
    )
}

export default function ShopPage({cart, getQuantity, updateQuantity, deleteInfo, itemQuantity, subtotal}) {
    let cards;
    cards = cart.map((info) =>
        (info) && <CheckOutCard key={info.item.id} item={info.item} quantity={getQuantity(info.item.id)} updateQuantity={updateQuantity} deleteInfo={deleteInfo} />
    );
    return (
        <div className="ShopPage">
            {(cart.length) ? cards : <p className='noItems'>No items in cart</p>}
            {(subtotal > 0) && <Subtotal itemQuantity={itemQuantity} subtotal={subtotal} />}
        </div>
    )
}