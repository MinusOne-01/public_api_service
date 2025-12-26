import { createNewApiKey } from "./apiKey.service.js";

export default async function requestKey(req, res){
    console.log("Name->", req.body.name);
    const key = await createNewApiKey( {name: req.body.name} );
    console.log("here...");
    console.log(key);
    res.json(key);
}