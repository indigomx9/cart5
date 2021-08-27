import React from "react";
import Head from "next/head";
import { Title } from "./Title";

export const Page = ({ title, children }) => {
    return (
        <React.Fragment>
            <Head>
                <title>{ title } - Next Shop</title>
            </Head>
            <main className="px-6 py-4">
                <Title>{ title }</Title>
                { children }
            </main>
        </React.Fragment>
    );
};





