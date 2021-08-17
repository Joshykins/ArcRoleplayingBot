import express from 'express'
import { ObjectId } from 'mongodb';
import { Log, LogLevels } from 'src/util/logger';
import { AuthorizeRequestDto } from '../data/dtos/dto.auth';
import { SecureRoute } from '../middleware/middleware.auth';
import { AuthorizeUser } from '../services/service.login';

const LoginRouter = express.Router()

//Authorize
LoginRouter.post('/authorize', async(req, res) => {
    const authorizeReq : AuthorizeRequestDto = req.body;
    await AuthorizeUser(authorizeReq);
    res.send("Authorizing your shit dog");
});


//Middleware to secure route
//Will secure routes below this one
LoginRouter.use(async (req, res, next ) => {
    await SecureRoute(req, res);
});


//Example of a secured route that has access to the stored userId
LoginRouter.post('/update' , async (req, res) => {
    const userId : ObjectId = res.locals.userId;
    
    //Do stuff with userId

})


export { LoginRouter };