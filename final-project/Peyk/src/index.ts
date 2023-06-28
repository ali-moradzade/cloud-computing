import {connect} from 'mongoose';
import {PEYK} from "./config";
import {app} from "./app";

(async () => {
    await connect(PEYK.mongodb.url);
    await app.listen(PEYK.app.port);

    console.log(`Starting server at port: ${PEYK.app.port} ..`)
})();
