import { useState, useEffect } from 'react'
import './App.css'
import { useParams } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import HomePage from './components/HomePage'
import ShopPage from './components/ShopPage'

function App() {
  const [shopData, setShopData] = useState(null);
  const [cart, setCart] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const { shop } = useParams();

  function addToCart(info) {
    const newCart = Array.from(cart);
    for (let i=0; i<newCart.length; i++) {
      if (newCart[i].item.id === info.item.id) {
        newCart[i].quantity++;
        setCart(newCart);
        setItemQuantity(itemQuantity+1);
        return;
      }
    }
    newCart.push(info);
    setItemQuantity(itemQuantity+1);
    setCart(newCart);
  }

  function getQuantity(id) {
    const found = cart.find((info) => info.item.id === id);
    if (found) return found.quantity;
    return 0;
  }

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/category/electronics', {mode: 'cors'})
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((json) => {
        setLoading(false);
        return setShopData(json);
      }
      )
      .catch((error) => console.log(error)
      );
  }, []);

  return (
    <div className='main'>
      <NavigationBar itemQuantity={(itemQuantity < 100) ? itemQuantity : '99+'} />
      {(shop === 'shopping-cart') ? (
        <ShopPage shopData={shopData} loading={loading} cart={cart} />
      ) : (
        <HomePage shopData={shopData} loading={loading} addToCart={addToCart} getQuantity={getQuantity} />
      )
      }
    </div>
  )
}

export default App
