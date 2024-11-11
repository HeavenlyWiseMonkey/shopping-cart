import '../styles/NavigationBar.css'
import { Link } from 'react-router-dom'

function Categories() {
    return (
        <div className='categories'>
            <Link to='/electronics'>Electronics</Link>
            <Link to='/jewelery'>Jewelery</Link>
            <Link to='/men-clothing'>Men's Clothing</Link>
            <Link to='/women-clothing'>Women's Clothing</Link>
        </div>
    )
}

export default function NavigationBar({itemQuantity}) {
    return (
        <div className="NavigationBar">
            <Link to='/'>
                <p className='title'>Dullmart</p>
            </Link>
            <Categories />
            <div className='cart'>
                <Link className='shopLink' to="/shopping-cart">
                    <img className='shopIcon' src='./shopping-outline.svg' />
                    {(itemQuantity>0) && <span className='cartNumber'>{(itemQuantity < 100) ? itemQuantity : '99+'}</span>}
                </Link>
            </div>
        </div>
    )
}