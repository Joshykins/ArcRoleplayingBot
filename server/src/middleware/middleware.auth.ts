import { Request, Response } from "express";
import { RequestFailDto } from "../data/dtos/dto.requestFail";
import { AuthenticateToken } from "../services/service.auth";


export const SecureRoute = async (
    req : Request,
    res : Response
    ) => {
        if(!req.headers.token) {
            const response : RequestFailDto = {requestFailed: "Failed to authenticate"}; 
            res.send(response)
        }
    
        const token = req.headers.token;
    
        const authentication  = AuthenticateToken(token.toString());
        if(!authentication) {
            const failResponse : RequestFailDto = { requestFailed:"Failed to authenticate request (maybe invalid token)"}
            res.send(failResponse);
        }
        else {
            res.locals.userId = authentication;
        }
}