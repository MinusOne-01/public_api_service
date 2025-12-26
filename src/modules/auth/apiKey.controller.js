import { createNewApiKey } from "./apiKey.service";

export default function requestKey(req, res){
    const key = createNewApiKey( req.name );
    res.json(key);
}