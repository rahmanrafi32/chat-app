import {User} from '../../models/user';
import {UserInputError} from "apollo-server-core";
import bcrypt from "bcrypt";
import {accessToken, refreshToken} from "../../helper/jwtCreator";

export const signIn = async (_, {username, password}, ctx, req) => {
    let errors = {};
    try {
        let user = await User.findOne({
            where: {
                username
            }
        });
        if (!user) {
            errors.user = "User not found";
            throw new UserInputError("BAD_USER_INPUT", errors);
        }

        let comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
            errors.password = "Password didn't match";
            throw new UserInputError("BAD_USER_INPUT", errors);
        }

        let access_JWT_token = await accessToken({
            _id: user._id,
            username: user.username,
            email: user.email
        });


        let refresh_JWT_token = await refreshToken({
            _id: user._id,
            username: user.username,
            email: user.email
        });

        return {
            msg: "Success",
            jwt: {
                accessToken: access_JWT_token,
                refreshToken: refresh_JWT_token
            }
        };
    } catch (err) {
        console.log(err);
        throw new UserInputError("BAD_USER_INPUT", {errors: err.extensions});
    }
}