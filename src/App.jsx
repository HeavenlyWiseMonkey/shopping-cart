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

  function addToCart(info, index) {
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

  function updateQuantity(index, newValue) {
    const newCart = Array.from(cart);
    setItemQuantity(itemQuantity-newCart[index].quantity+newValue);
    newCart[index].quantity = newValue;
    setCart(newCart);
  }

  function deleteInfo(id) {
    const newCart = cart.filter((info) => {
      if (info.item.id !== id) {
        return true;
      }
      else {
        setItemQuantity(itemQuantity-info.quantity);
        return false;
      }
    });
    setCart(newCart);
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
      <NavigationBar itemQuantity={itemQuantity} />
      {(shop === 'shopping-cart') ? (
        <ShopPage cart={cart} getQuantity={getQuantity} updateQuantity={updateQuantity} deleteInfo={deleteInfo} />
      ) : (
        <HomePage shopData={shopData} loading={loading} addToCart={addToCart} getQuantity={getQuantity} updateQuantity={updateQuantity} />
      )
      }
    </div>
  )
}

export default App
