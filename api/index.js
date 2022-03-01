import {ApolloServer} from 'apollo-server-express';
import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import {typeDefs, resolvers} from "./graphql";
import {sequelize} from "./models";

require('dotenv').config();

async function startApolloServer(typeDefs, resolvers) {
    let port = process.env.PORT
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
    });

    sequelize.sync({alter:true})
        .then(() => console.log("connected"))
        .catch(err => {
            console.log(err)
        })

    await server.start();
    app.use(express.json());
    app.get('/', ((req, res, next) => {
        res.status(200).json("Server is alive");
    }));

    server.applyMiddleware({app});
    app.listen(port, () => console.log(`server is running in http://localhost:${port}${server.graphqlPath}`))
}

startApolloServer(typeDefs, resolvers);