import React from "react";
import Head from "next/head";
import Image from "next/image";
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
            <Head><title>Next Shop</title></Head>
            <main className="px-6 py-4">
                <Title>{product.title}</Title>
                <section className="flex flex-col lg:flex-row">
                    <aside>
                        <Image 
                            src={product.pictureURL} alt="" 
                            width={640} height={480}
                        />
                    </aside>
                    <aside className="flex-1 lg:ml-4">
                        <p className="text-sm">{product.description}</p>
                        <p className="text-lg font-bold mt-2">{product.price}</p>
                    </aside>
                </section>
            </main>
        </React.Fragment>
    );
};




