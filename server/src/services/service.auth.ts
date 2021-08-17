import { ObjectId } from "mongodb";
import { TokenDto } from "../data/dtos/dto.auth";
import { EnvVariables } from "../config/config.server";
import  jwt  from 'jsonwebtoken';
import { RequestFailDto } from "../data/dtos/dto.requestFail";
import { Log, LogLevels } from "../util/logger";

export const CreateToken = (_userId : ObjectId ) : TokenDto => {
    const signedToken = jwt.sign(
        {
            payload: { userId: _userId }
        }, 
        EnvVariables.signature,
        { expiresIn: '1h' }
    );
    
    return {
        token: signedToken
    }
}

export const AuthenticateToken = (tokenToAuthenticate : string) : boolean | ObjectId => {
    try {
        const decodedToken : any = jwt.verify(tokenToAuthenticate, EnvVariables.signature)
        
        const userId : ObjectId = decodedToken.payload.userId
        return userId;
    }
    catch {
        Log("Failed to Authenticate a request.", LogLevels.DEBUG);
        return false;
    }
}