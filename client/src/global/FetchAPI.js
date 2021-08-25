function stripProduct(product) {
    return {
        id: product.id,
        title: product.title,
    };
};

const URL = "http://localhost:1337/products";
export async function getProducts() {
    const res = await fetch(URL);
    const products = await res.json();
    return products.map(stripProduct);
};





