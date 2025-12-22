import { env } from "./config/env";
import app from "./app";

app.listen(env.port, () => {
    console.log(`Auth service running on port ${env.port}`);
});