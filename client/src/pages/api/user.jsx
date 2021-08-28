import { fetchJSON } from "../../global/FetchAPI";
const { CMS_URL } = process.env;

export default async function User(req, res) {
    const { jwt } = req.cookies;
    if (!jwt) {
        res.status(401).end();
        return;
    };
    try {
        const user = await fetchJSON(`${CMS_URL}/users/me`, {
            headers: {"Authorization": `Bearer ${jwt}`},
        })
        res.status(200).json({
            id: user.id,
            name: user.username,
        });
    } catch (error) {
        res.status(401).end();
    }
};





