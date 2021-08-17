import express from 'express'
import { Log, LogLevels } from 'src/util/logger';

const ExampleRouter = express.Router()

//Middleware before router actually receives requests
ExampleRouter.use((req, res, next) => {
    //Could put auth logic here, or something else u need for router
    next();
})

//Endpoint
ExampleRouter.get('/test' /*Endpoint position*/, (req, res) => {

    //Query parameters
    Log(`Query param 'bob' was ${req.query.bob || "NOT GIVEN :("}`, LogLevels.DEBUG);
    //Body Paramters
    Log(`Example Endpoint: ${req.body.test || "NO TEST PARM RECEIVED"}`, LogLevels.DEBUG);

    res.send("DID get");
})

export { ExampleRouter };