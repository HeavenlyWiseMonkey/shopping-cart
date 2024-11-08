import App from "./App";
import HomePage from "./components/HomePage";
import ShopPage from "./components/ShopPage";

const routes = [
    {
        path: '/:shop?',
        element: <App />,
    },
]

export default routes;