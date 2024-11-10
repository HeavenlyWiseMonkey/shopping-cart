import '../styles/HomePage.css'
import Loading from './Loading';

function Info(item, quantity) {
    return {item, quantity}
}

// Added index
function Card({item, addToCart, quantity, id}) {
    return (
        <div className='card'>
            <img src={item.image} />
            <p>{item.title}</p>
            <p>{item.description}</p>
            <p>${item.price}</p>
            <Rating rate={item.rating.rate} count={item.rating.count} />
            <button type='button' onClick={() => addToCart(Info(item, 1), id)}>Add to Cart</button>
            {(quantity > 0) && <p>{quantity} in Cart</p>}
        </div>
    )
}

function Rating({rate, count}) {
    const fullStars = Math.floor(rate/1);
    const halfStar = (rate % 1) >= 0.5;
    const emptyStars = 5 - fullStars - ((halfStar) ? 1 : 0);

    return (
        <div className='rating'>
            {Array(fullStars).fill(true).map((_, i) => <span key={i} className='star on' />)}
            {(halfStar) && <span className='star half' />}
            {Array(emptyStars).fill(true).map((_, i) => <span key={i} className='star off' />)}
            <span>{count}</span>
        </div>
    )
}

export default function HomePage({shopData, loading, addToCart, getQuantity}) {
    let cards;
    // Added index
    if (shopData) {
        cards = shopData.map((item) =>
            <Card key={item.id} item={item} addToCart={addToCart} quantity={getQuantity(item.id)} id={item.id} />
        );
    }

    return (
        <div className="HomePage">
            {(shopData) && cards}
            {(loading) && <Loading />}
        </div>
    )
}