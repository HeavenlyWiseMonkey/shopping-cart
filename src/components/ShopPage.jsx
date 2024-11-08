import '../styles/ShopPage.css'
import Loading from './Loading'

export default function ShopPage({shopData, loading, cart}) {
    return (
        <div className="ShopPage">
            ShopPage
            {loading && <Loading />}
        </div>
    )
}