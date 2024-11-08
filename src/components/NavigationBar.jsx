import '../styles/NavigationBar.css'
import { Link } from 'react-router-dom'

export default function NavigationBar({itemQuantity}) {
    return (
        <div className="NavigationBar">
            <p className='title'>Dullmart</p>
            <Link className='shopLink' to="/shopping-cart">
                <img className='shopIcon' src='./shopping-outline.svg' />
                <span className='cartNumber'>{itemQuantity}</span>
            </Link>
        </div>
    )
}