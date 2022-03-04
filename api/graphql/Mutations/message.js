import {Message} from "../../models/message";
import {AuthenticationError, UserInputError} from "apollo-server-core";
import {User} from "../../models/user";

export const message = async (_, {payload: {text, to}}, {username}, req) => {
    let errors = {};
    try {
        if (!username) {
            errors.user = "User not found";
            throw new AuthenticationError("UNAUTHORIZED", {errors});
        }

        let recipient = await User.findOne({
            where: {
                username: to
            }
        });

        if (!recipient) {
            errors.recipient = "Recipient not found";
            throw new UserInputError("BAD_INPUT", {errors});
        } else if (recipient.username === username) {
            errors.message = "You cant send message to yourself"
            throw new UserInputError("BAD_INPUT", {errors});
        }


        return await Message.create({
            from: username,
            to,
            text
        });


    } catch (err) {
        // console.log(err);
        throw new UserInputError("BAD_INPUT", {errors});
    }
}