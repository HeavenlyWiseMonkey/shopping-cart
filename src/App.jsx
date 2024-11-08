import { useState, useEffect } from 'react'
import './App.css'
import { useParams } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import HomePage from './components/HomePage'
import ShopPage from './components/ShopPage'

function App() {
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { goToShopPage } = useParams();

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
      <NavigationBar />
      {(goToShopPage === 'shop-page') ? (
        <ShopPage shopData={shopData} loading={loading} />
      ) : (
        <HomePage shopData={shopData} loading={loading} />
      )
      }
    </div>
  )
}

export default App
