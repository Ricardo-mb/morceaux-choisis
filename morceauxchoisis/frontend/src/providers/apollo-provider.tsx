"use client";

import { ApolloProvider as Provider } from "@apollo/client";
import client from "@/lib/apolloClient";
/**
 * The ApolloWrapper component wraps the ApolloProvider from @apollo/client.
 * It passes the client instance as a prop to the ApolloProvider.
 *
 * @param {{ children: ReactNode }} props
 * @prop {ReactNode} children - The children to be rendered inside the ApolloProvider.
 * @returns {ReactElement} The rendered ApolloProvider with the given children.
 */
export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <Provider client={client}>{children}</Provider>;
}
