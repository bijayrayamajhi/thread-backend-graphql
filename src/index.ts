import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

const init = async () => {
  const app = express();
  const PORT = process.env.PORT || 8000;
  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query {
    hello: String
    say(name: String): String
    hero: String
    }
    `,
    resolvers: {
      Query: {
        hello: () => "hi i am bijay rayamajhi",
        hero: () => "hi i am calling from hero",
        say: (_: any, { name }: { name: string }) => `hello ${name}, how are you?`,
      },
    },
  });
  app.use(express.json());

  await gqlServer.start();
  app.use("/graphql", expressMiddleware(gqlServer));
  app.get("/", (req, res) => {
    res.send("hi i am root");
  });

  app.listen(PORT, () => {
    console.log(`listening to the port ${PORT}`);
  });
};

init();
