import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const server = new ApolloServer({ typeDefs, resolvers,context: ({ req} ) => ({ req }) });

mongoose
  .connect(
    `mongodb+srv://imranben35:mongo123@cluster0.buw8u78.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("MongoDB connected successfully");
    return server.listen({port : 4000});
  }).then((res)=>{
    console.log(`${res.url}`)
  })
  
