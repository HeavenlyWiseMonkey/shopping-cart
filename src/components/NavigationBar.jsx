import '../styles/NavigationBar.css'
import { Link } from 'react-router-dom'

export default function NavigationBar({itemQuantity}) {
    return (
        <div className="NavigationBar">
            <Link to='/'>
                <p className='title'>Dullmart</p>
            </Link>
            <Link className='shopLink' to="/shopping-cart">
                <img className='shopIcon' src='./shopping-outline.svg' />
                {(itemQuantity>0) && <span className='cartNumber'>{(itemQuantity < 100) ? itemQuantity : '99+'}</span>}
            </Link>
        </div>
    )
}