import React from "react";
import Head from "next/head";
import { Title } from "../components/Title";

export default function Index() {
    return (
        <React.StrictMode>
            <Head>
                <title>Next Shop</title>
            </Head>
            <main className="p-1">
                <Title>Next Shop</Title>
            </main>
        </React.StrictMode>
    );
};






