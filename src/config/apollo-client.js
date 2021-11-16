import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://measured-sloth-21.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret":
      "lzdQLDCP9NoL4jyAbbJy5J3XG5vXt41ptaGhhXJenopWAVN96Gfj754P0HMMuWoa",
  },
});
