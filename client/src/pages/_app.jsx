import React from "react";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

const QClient = new QueryClient();

export default function App({Component, pageProps}) {
    return (
        <QueryClientProvider client={QClient}>
            <React.StrictMode>
                <Component {...pageProps} />
            </React.StrictMode>
        </QueryClientProvider>
    );
};




