import { useState, useEffect } from 'react'
import './App.css'
import { useParams } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import CategoryPage from './components/CategoryPage'
import ShopPage from './components/ShopPage'
import Loading from './components/Loading'

function App() {
  const [shopData, setShopData] = useState(null);
  const [cart, setCart] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { shop } = useParams();

  function roundDecimal(num) {
    return Math.round(num * 100) /100;
  }

  function addToCart(info, id) {
    const newCart = Array.from(cart);
    if (newCart[id] && newCart[id].item.id === id) {
      newCart[id].quantity++;
    }
    else {
      newCart[id] = info;
    }
    const newSubtotal = subtotal+newCart[id].item.price;
    setSubtotal(roundDecimal(newSubtotal));
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
    const newSubtotal = subtotal+(newValue-newCart[id].quantity)*newCart[id].item.price;
    setSubtotal(roundDecimal(newSubtotal));
    setItemQuantity(itemQuantity+newValue-newCart[id].quantity);
    newCart[id].quantity = newValue;
    setCart(newCart);
  }

  function deleteInfo(id) {
    const newCart = Array.from(cart);
    const info = newCart[id];
    const newSubtotal = subtotal-info.item.price*info.quantity;
    setSubtotal(roundDecimal(newSubtotal));
    setItemQuantity(itemQuantity-info.quantity);
    newCart[id] = undefined;
    setCart(newCart);
  }

  useEffect(() => {
    fetch('https://fakestoreapi.com/products', {mode:'cors'})
    .then((response) => {
      if (response.status > 400) {
        throw new Error("server error");
      }
      return response.json();
    })
    .then((json) => {
      setLoading(false);
      return setShopData(json);
    })
    .catch((error) => console.log(error));
  }, []);

  return (
    <div className='main'>
      <NavigationBar itemQuantity={itemQuantity} />
      {(loading) ? <Loading /> :
      (shop === 'shopping-cart') ? (
        <ShopPage cart={cart} getQuantity={getQuantity} updateQuantity={updateQuantity} deleteInfo={deleteInfo} itemQuantity={itemQuantity} subtotal={subtotal} />
      ) : 
      (shop === 'electronics') ? (
        <CategoryPage shopData={shopData.slice(8,14)} addToCart={addToCart} getQuantity={getQuantity} updateQuantity={updateQuantity} />
      ) :
      (shop === 'jewelery') ? (
        <CategoryPage shopData={shopData.slice(4,8)} addToCart={addToCart} getQuantity={getQuantity} updateQuantity={updateQuantity} />
      ) :
      (shop === 'men-clothing') ? (
        <CategoryPage shopData={shopData.slice(0,4)} addToCart={addToCart} getQuantity={getQuantity} updateQuantity={updateQuantity} />
      ) :
      (shop === 'women-clothing') ? (
        <CategoryPage shopData={shopData.slice(14,20)} addToCart={addToCart} getQuantity={getQuantity} updateQuantity={updateQuantity} />
      ) :
      (
        <CategoryPage shopData={shopData} addToCart={addToCart} getQuantity={getQuantity} updateQuantity={updateQuantity} />
      )}
    </div>
  )
}

export default App
