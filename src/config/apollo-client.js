import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://trusted-gannet-53.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret":
      "ouExmH80Dgm1PsoBL33JDyLqVokvaUi5KMrQ9p712uvzeb04lX5Q6htIWJTSw3Pr",
  },
});

export default client;
