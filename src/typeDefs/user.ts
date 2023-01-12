import {gql} from 'apollo-server';


export default gql`

    type Mutation{
        register(userInput: UserInput!): UserResponse!
        login(userInput: UserInput!): UserResponse!}
    type User{
        id: ID!
        "Unique username, can use to identify user"
        username: String!
        "JWT"
        token: String!
        "Array of post id"
        posts: [String]
        "Array of post id"
        likes: [String]
    }

    input UserInput{
        username: String!
        password: String!
    }

    type UserResponse implements ResponseWithStatus{
        status: ID!
        user: User
    }
`;