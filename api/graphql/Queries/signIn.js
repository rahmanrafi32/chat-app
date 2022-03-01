import {User} from '../../models/user';
import {UserInputError} from "apollo-server-core";
import bcrypt from "bcrypt";

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

        return {
            msg: "Success"
        };
    } catch (err) {
        // console.log(err.extensions);
        throw new UserInputError("BAD_USER_INPUT", err.extensions);
    }
}