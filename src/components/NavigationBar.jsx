import '../styles/NavigationBar.css'
import { Link } from 'react-router-dom'

export default function NavigationBar() {
    return (
        <div className="NavigationBar">
            <p className='title'>Dullmart</p>
            <Link className='shopLink' to="/shopping-page">
                <img className='shopIcon' src='./shopping-outline.svg' />
            </Link>
        </div>
    )
}