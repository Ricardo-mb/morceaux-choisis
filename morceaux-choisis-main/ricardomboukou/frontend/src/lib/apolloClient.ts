// import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";


// const httpLink = createHttpLink({
//   uri: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/graphql",
//   credentials: "include",
// });

// const authLink = setContext((_, { headers }) => {
//   let token;
//   if (typeof window !== "undefined") {
//     token = localStorage.getItem("token");
//   }
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//       role: typeof window !== "undefined" ? localStorage.getItem("role") || "GUEST" : "GUEST",
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
//   defaultOptions: {
//     watchQuery: {
//       fetchPolicy: "cache-and-network",
//       errorPolicy: "ignore",
//     },
//     query: {
//       fetchPolicy: "network-only",
//       errorPolicy: "all",
//     },
//     mutate: {
//       errorPolicy: "all",
//     },
//   },
// });

// export default client;




import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, Reference } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";


const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/graphql",
  credentials: "include",
  fetchOptions: {
    mode: "cors",
  },
});

const authLink = setContext((_, { headers }) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
  const role = typeof window !== "undefined" ? localStorage.getItem("role") || "GUEST" : "GUEST";

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      role,
    },
  };
});

const debugLink = new ApolloLink((operation, forward) => {
  console.log(`Starting operation: ${operation.operationName}`);
  console.log(`Variables: ${JSON.stringify(operation.variables)}`);
  return forward(operation).map(response => {
    console.log(`Response from ${operation.operationName}:`, response);
    return response;
  });
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, debugLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          projects: {
            keyArgs: false, // Use false to indicate no arguments are used for cache key
            merge(existing : Reference[] = [], incoming: Reference[], { readField }) {
              const existingIds = new Set(existing.map(project => readField<string>('id', project)));
              return [...existing, ...incoming.filter(project => !existingIds.has(readField<string>('id', project)))];
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
    query: {
      fetchPolicy: "network-only",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

export default client;

