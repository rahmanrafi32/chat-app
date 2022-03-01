import {verifyJwtToken} from "../../helper/jwtValidator";
import {accessToken, refreshToken} from "../../helper/jwtCreator";
import {AuthenticationError} from "apollo-server-core";

export const jwt_refresh_token = async (_, {refresh_Token}, ctx, req) => {
    let errors={};
    try {
        let data = await verifyJwtToken(`Bearer ${refresh_Token}`);
        if(data.msg === "UNAUTHORIZED"){
            errors.token = "Not a valid token";
            throw new AuthenticationError("UNAUTHORIZED", errors);
        }

        let access_token = await accessToken(data);
        let refresh_token = await refreshToken(data);

        return {
            msg: 'New Token Created',
            jwt: {
                accessToken: access_token,
                refreshToken: refresh_token
            }
        }
    } catch (err) {
        // console.log(err);
        throw new AuthenticationError("UNAUTHORIZED", {errors: err.extensions});
    }
}