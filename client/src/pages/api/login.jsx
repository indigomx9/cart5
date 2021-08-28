import cookie from "cookie";
import { fetchJSON } from "../../global/FetchAPI";
const { CMS_URL } = process.env;
const URL = `${CMS_URL}/auth/local`;

export default async function Login(req, res) {
    if (req.method !== "POST") {
        res.status(405).end();
        return;
    };
    const { email, password } = req.body;
    try {
        const { jwt, user } = await fetchJSON(URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                identifier: email,
                password: password
            }),
        });
        res.status(200)
            .setHeader("Set-Cookie", cookie.serialize("jwt", jwt, {
                path: "/api",
                httpOnly: true,
            }))
            .json({
                id: user.id,
                name: user.username,
        });
    } catch (error) {
        res.status(401).end();
    }
};



