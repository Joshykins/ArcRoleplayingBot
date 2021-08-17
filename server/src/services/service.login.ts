
import { Users } from "src/data/models/model.user";
import bcrypt from "bcryptjs";
import { LogLevels } from "src/util/logger";
import { Log } from "src/util/logger";
import { AuthorizeRequestDto, TokenDto } from "../data/dtos/dto.auth";
import { RequestFailDto } from "../data/dtos/dto.requestFail";
import { CreateToken } from "./service.auth";
import { UserInfoDto } from "../data/dtos/dto.userInfo";
import axios from "axios";
import { EnvVariables } from "../config/config.server";
import { jsonToUrlParams } from "../util/jsonToParams";

//User Registration Service
// ------------------------------
export const AuthorizeUser = async (authorizeRequest : AuthorizeRequestDto) : Promise<RequestFailDto | UserInfoDto> => {
    let accessTokenData : OAuthInformationDto;

    //Authorize with discord APIs
    const body = jsonToUrlParams({
        client_id: EnvVariables.clientId,
        client_secret: EnvVariables.clientSecret,
        grant_type: 'authorization_code',
        code: authorizeRequest.exchangeCode,
        redirect_uri: 'http://localhost:1234/'
    });
    try {
        const AccessTokenResponse = await axios.post(
            "https://discord.com/api/oauth2/token", 
            body,
             {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                },
             }
        );
        accessTokenData = AccessTokenResponse.data;
    }
    catch(er) {
        Log(er, LogLevels.ERROR);
    }
    
    console.log(accessTokenData);
    //Get Identity
    //Access token 0J3GdGxCHeNiZM7ojheCvH7FHDCSSK
    

    //Check if discord userId exists in db


    //If exists, sign discord id and return

    return;
    //If not exists, insert, then sign discord id and return
    
}
