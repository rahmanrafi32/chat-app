import {gql} from "apollo-server-core";

export const typeDefs = gql`
    input SignUpInput{
        username: String,
        email: String,
        password: String,
        confirm_password: String
    }
    
    type User{
        username: String,
        email: String,
        password: String,
    }

    type return{
        msg: String,
        jwt: String
    }

    type Query{
        test:String
    }

    type Mutation{
        test: String,
        signUp(payload:SignUpInput): User
    }
`