import { fetchJSON } from "../../global/FetchAPI";
const { CMS_URL } = process.env;

function stripCartItem(cartItem) {
    return {
        id: cartItem.id,
        product: {
            id: cartItem.product.id,
            title: cartItem.product.title,
            price: cartItem.product.price,
        },
        quantity: cartItem.quantity,
    }
};

export default async function ShopCart(req, res) {
    const { jwt } = req.cookies;
    if (!jwt) {
        res.status(401).end();
        return;
    };
    try {
        const cartItems = await fetchJSON(`${CMS_URL}/cart-items`, {
            headers: {"Authorization": `Bearer ${jwt}`},
        })
        res.status(200).json(cartItems.map(stripCartItem));
    } catch (error) {
        res.status(401).end();
    }
};





