import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Title } from "../components/Title";
import { getProducts } from "../global/FetchAPI.JS";

export async function getStaticProps() {
    console.log("[HomePage] getStaticProps()");
    const products = await getProducts();
    return {
        props: { products },
        revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    };
};

export default function Index({ products }) {
    console.log("[HomePage] server render:", products);
    return (
        <React.StrictMode>
            <Head><title>Next Shop</title></Head>
            <main className="p-1">
                <Title>Next Shop</Title>
            </main>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <Link href={`/products/${product.id}`}>
                            <a>{product.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </React.StrictMode>
    );
};






