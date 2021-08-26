export class APIError extends Error {
    constructor(URL, status) {
        super(`'${URL}' returned ${status}`);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, APIError);
        };
        this.name = "APIError";
        this.status = status;
    };
};

async function fetchJSON(URL) {
    const res = await fetch(URL);
    if (!res.ok) {
        throw new APIError(URL, res.status);
    };
    return await res.json();
};

const { CMS_URL } = process.env;
export async function getProduct(id) {
    const product = await fetchJSON(`${CMS_URL}/products/${id}`);    
    return stripProduct(product);
};

export async function getProducts() {
    const products = await fetchJSON(`${CMS_URL}/products`);
    return products.map(stripProduct);
};

function stripProduct(product) {
    return {
        id: product.id,
        title: product.title,
        description: product.description,
        price: "$" + product.price.toFixed(2),
        pictureURL: CMS_URL + product.picture.url,
    };
};



