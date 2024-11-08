import '../styles/HomePage.css'
import Loading from './Loading';

function Card(item) {
    item = item.item;
    return (
        <div className='card'>
            <img src={item.image} />
            <p>{item.title}</p>
            <p>{item.description}</p>
            <p>${item.price}</p>
            <p>{item.rating.rate} out of {item.rating.count}</p>
        </div>
    )
}

export default function HomePage({shopData, loading}) {
    let cards;
    if (shopData) {
        cards = shopData.map((item) =>
            <Card key={item.id} item={item} />
        );
    }

    return (
        <div className="HomePage">
            {(shopData) && cards}
            {(loading) && <Loading />}
        </div>
    )
}