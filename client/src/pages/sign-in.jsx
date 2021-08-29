import React from "react";
import { Page } from "../components/Page";
import { Input } from "../components/Input";
import { Field } from "../components/Field";
import { Button } from "../components/Button";
import { useRouter } from "next/router";
import { useSignIn } from "../hooks/UserHooks";

export default function SignIn() {
    const router = useRouter();
    const { signInError, signInLoading, signIn } = useSignIn();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const valid = await signIn(email, password);
        if (valid) {
            router.push("/");
        };
    };

    return (
        <Page title="Sign In">
        <form onSubmit={handleSubmit}>
            <Field label="Email">
                <Input 
                    required
                    type="email" 
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </Field>
            <Field label="Password">
                <Input 
                    required
                    type="password" 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </Field>
            {signInError && (
                <p className="text-red-700">
                    Invalid credentials
                </p>
            )}
            {signInLoading ? (
                <p>Loading...</p>
            ) : (
                <Button type="submit">
                    Sign In
                </Button>
            )}
        </form>
        </Page>
    );
};





