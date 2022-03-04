import {gql} from "apollo-server-express";

export const typeDefs = gql`
    input SignUpInput{
        username: String,
        email: String,
        password: String,
    }

    type User{
        username: String,
        email: String,
        password: String,
    }

    type Tokens{
        accessToken: String,
        refreshToken: String
    }

    type return{
        msg: String,
        jwt: Tokens
    }

    type Message {
        text: String,
        from: String,
        to: String
    }

    input MessageInput{
        text: String,
        to: String
    }

    type Query{
        test:String,
        signIn(username:String,password:String): return,
        getMessages(from:String): [Message]
    }

    type Mutation{
        test: String,
        signUp(payload:SignUpInput): User,
        jwt_refresh_token(refresh_Token:String): return,
        message(payload: MessageInput): Message
    }
    
    type Subscription{
        newMessageSubscription: Message
    }
    
`