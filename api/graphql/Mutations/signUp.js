import {User} from '../../models/user';
import {UserInputError} from "apollo-server-core";

export const signUp = async (_, {payload}, ctx, req) => {
    let errors = {};
    try {
        return await User.create(payload);
    } catch (err) {
        // console.log(err);
        throw new UserInputError("Bad input", {errors: err});
    }
}