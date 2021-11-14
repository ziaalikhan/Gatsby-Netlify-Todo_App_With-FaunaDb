const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");
q = faunadb.query;
const dotenv = require("dotenv");
dotenv.config();

const typeDefs = gql`
  type Query {
    AllTodoData: [TodoData!]
  }
  type TodoData {
    id: ID!
    item: String!
  }
  type Mutation {
    addTodoData(item: String!): TodoData
    deleteTodo(id: ID!): String
  }
`;

var adminClient = new faunadb.Client({
  secret: process.env.FAUNADB_ADMIN_SECRET,
  domain: "db.us.fauna.com",
});

const resolvers = {
  Query: {
    AllTodoData: async () => {
      try {
        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index("data"))),
            q.Lambda((x) => q.Get(x))
          )
        );
        console.log(result.data);
        return result.data.map((val) => {
          return {
            id: val.ref.id,
            item: val.data.item,
          };
        });
      } catch (err) {
        console.log(err);
      }
    },
  },

  Mutation: {
    addTodoData: async (_, { item }) => {
      try {
        const result = await adminClient.query(
          q.Create(q.Collection("TodosData"), {
            data: {
              item,
            },
          })
        );
        console.log(result.data);
        return result.data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteTodo: async (_, args) => {
      const id = args.id;
      // return console.log(`${id}  id ====>>> `)
      try {
        const result = await adminClient.query(
          q.Delete(q.Ref(q.Collection("TodosData"), id))
        );
        return console.log(`${result}=====>>>>is Deleted here`);
      } catch (error) {
        console.log("======>>>", error);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
