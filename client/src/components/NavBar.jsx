import React from "react";
import Link from "next/link";
import { fetchJSON } from "../global/FetchAPI";
import { useUser } from "../hooks/UserHooks";

export const NavBar = () => {
    const user = useUser();
    
    const handleSignOut = async () => {
        await fetchJSON("/api/logout");
        // FIXME setUser(undefined);
    };

    console.log("[NavBar] user:", user);

    return (
        <nav className="px-2 py-1 text-sm">
            <ul className="flex gap-2">
                <li className="text-lg font-extrabold">
                    <Link href="/">
                        <a>Next Shop</a>
                    </Link>
                </li>
                <li role="separator" className="flex-1" />
                {user ? (
                    <React.Fragment>
                        <li>{user.name}</li>
                        <li>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </li>
                    </React.Fragment>
                ) : (
                    <li>
                        <Link href="/sign-in">
                            <a>Sign In</a>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};




