import React from "react";
import Head from "next/head";
import { Title } from "../components/Title";
import { getProducts } from "../global/FetchAPI.JS";
import { ProductCard } from "../components/ProductCard";

export async function getStaticProps() {
    console.log("[HomePage] getStaticProps()");
    const products = await getProducts();
    return {
        props: { products },
        revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    };
};

export default function Index({ products }) {
    console.log("[HomePage] ServerRender:", products);
    return (
        <React.StrictMode>
            <Head><title>Next Shop</title></Head>
            <main className="p-1">
                <Title>Next Shop</Title>
            </main>
            <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <li key={product.id}>
                        <ProductCard product={product} />
                    </li>
                ))}
            </ul>
        </React.StrictMode>
    );
};






