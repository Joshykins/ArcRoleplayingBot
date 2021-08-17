import express from 'express'
import { Log, LogLevels } from 'src/util/logger';
import { Users, User } from 'src/data/models/model.user';


const UnknownRouter = express.Router()

UnknownRouter.all("",(req, res) => {
    res.statusCode = 404;
    res.send("404 | Route Not Found :'( ");
})

export { UnknownRouter };