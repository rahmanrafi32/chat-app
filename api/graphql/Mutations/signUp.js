import {User} from '../../models/user';
import {UserInputError} from "apollo-server-core";
import bcrypt from "bcrypt";

export const signUp = async (_, {payload: {username, email, password}}, ctx, req) => {
    let errors = {};
    const validPass = (pass) => {
        const regEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
        return regEx.test(pass);
    }
    try {
        if (!validPass(password)) errors.password = "Enter a valid password";
        password = await bcrypt.hash(password, 10);
        return await User.create({username, email, password});
    } catch (err) {
        // console.log(err);
        if (err.name === 'SequelizeValidationError' || err.name === "SequelizeUniqueConstraintError") {
            err.errors.forEach(e => errors[e.path] = e.message);
        }
        throw new UserInputError("BAD_USER_INPUT", {errors});
    }
}