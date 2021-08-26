import React from "react";
import Link from "next/link";
import Image from "next/image";

export const ProductCard = ({ product }) => {
    return (
        <React.Fragment>
            <main className="border my-4 w-80 
                shadow hover:shadow-xl">
                <Link href={`/products/${product.id}`}>
                    <a>
                        <Image src={product.pictureURL} alt="" 
                            width={320} height={240} />
                        <aside className="p-2 flex 
                            justify-between items-baseline">
                            <h2 className="text-lg font-bold">
                                {product.title}
                            </h2>
                            <span>{product.price}</span>
                        </aside>
                    </a>
                </Link>
            </main>
        </React.Fragment>
    );
};




