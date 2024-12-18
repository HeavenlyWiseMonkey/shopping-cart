import '../styles/CategoryPage.css'

function Info(item, quantity) {
    return {item, quantity}
}

function Card({item, addToCart, quantity, id}) {
    return (
        <div className='card'>
            <img src={item.image} />
            <p className='cardTitle'>{item.title}</p>
            <p>{item.description}</p>
            <p className='price'>${item.price.toFixed(2)}</p>
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

export default function CategoryPage({shopData, addToCart, getQuantity}) {
    let cards;
    if (shopData) {
        cards = shopData.map((item) =>
            <Card key={item.id} item={item} addToCart={addToCart} quantity={getQuantity(item.id)} id={item.id} />
        );
    }

    return (
        <div className="CategoryPage">
            {(shopData) && cards}
        </div>
    )
}