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

  function addToCart(info, id) {
    const newCart = Array.from(cart);
    if (newCart[id] && newCart[id].item.id === id) {
      newCart[id].quantity++;
    }
    else {
      newCart[id] = info;
    }
    setCart(newCart);
    setItemQuantity(itemQuantity+1);
  }

  function getQuantity(id) {
    const found = cart.find((info) => (info && info.item.id === id));
    if (found) return found.quantity;
    return 0;
  }

  function updateQuantity(id, newValue) {
    const newCart = Array.from(cart);
    setItemQuantity(itemQuantity-newCart[id].quantity+newValue);
    newCart[id].quantity = newValue;
    setCart(newCart);
  }

  function deleteInfo(id) {
    const newCart = Array.from(cart);
    setItemQuantity(itemQuantity-newCart[id].quantity);
    newCart[id] = undefined;
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

  // useEffect(() => {
  //   fetch('https://fakestoreapi.com/products', {mode:'cors'})
  //   .then((response) => {
  //     if (response.status > 400) {
  //       throw new Error("server error");
  //     }
  //     console.log(response.json());
  //   })
  // }, []);

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
