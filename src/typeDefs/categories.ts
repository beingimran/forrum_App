import { gql } from "apollo-server";

export default gql`
  type Query {
    getAllCategory: [Category!]!
  }

  type Mutation {
    addCategory(inputCategory: inputCategory): respones!
    updateCategory(ID: ID, inputCategory: inputCategory): Category!
  }

  type respones {
    code: Int!
    success: Boolean!
    message: String!
  }

  input inputCategory {
    title: String!
    description: String!
  }


  type Category {
    _id:ID
    title: String!
    description: String!
    posts:[String]
  }
`;
