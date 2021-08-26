import React from "react";
import Head from "next/head";
import { Title } from "../../components/Title";
import { APIError, getProduct, 
    getProducts } from "../../global/FetchAPI";

export async function getStaticPaths() {
    const products = await getProducts();
    return {
        paths: products.map((product) => ({
            params: { id: product.id.toString() },
        })),
        fallback: "blocking",
    }
};

export async function getStaticProps({params: {id}}) {
    try {
        const product = await getProduct(id);
        return {
            props: { product },
            revalidate: parseInt(process.env.REVALIDATE_SECONDS),
        };
    } catch (error) {
        if (error instanceof APIError && 
                error.status === 404) {
            return { notFound: true };
        }
        throw error;
    }
};
export default function ProductPage({product}) {
    console.log("[ProductPage] render:", product);
    return (
        <React.Fragment>
            <Head>
                <title>Next Shop</title>
            </Head>
            <main className="px-6 py-4">
                <Title>{product.title}</Title>
                <p>{product.description}</p>
            </main>
        </React.Fragment>
    );
};




