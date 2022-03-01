import {gql} from "apollo-server-core";

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

    type Query{
        test:String,
        signIn(username:String,password:String): return,
    }

    type Mutation{
        test: String,
        signUp(payload:SignUpInput): User,
        jwt_refresh_token(refresh_Token:String): return,
        protected_route: return
    }
`