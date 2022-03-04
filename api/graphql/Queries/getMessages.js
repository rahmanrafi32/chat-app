import {AuthenticationError} from "apollo-server-core";
import {User} from "../../models/user";
import {Message} from "../../models/message";
import {Op} from "sequelize";

export const getMessages = async (_, {from}, {username}, req) => {
    let errors = {};
    try {
        if (!username) {
            errors.user = "User not found";
            throw new AuthenticationError("UNAUTHORIZED", {errors});
        }

        const sender = await User.findOne({
            where: {
                username: from
            }
        });

        if (!sender) {
            errors.user = "User not found";
            throw new AuthenticationError("UNAUTHORIZED", {errors});
        }

        const usernames = [username, sender.username];
        const messages = await Message.findAll({
            where: {
                from: {[Op.in]: usernames},
                to: {[Op.in]: usernames}
            },
            order: [['createdAt', 'DESC']]
        });

        return messages;

    } catch (err) {
        console.log(err);
    }
}