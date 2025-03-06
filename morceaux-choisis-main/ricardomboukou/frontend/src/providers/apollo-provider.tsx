"use client";

import { ApolloProvider as Provider } from "@apollo/client";
import client from "@/lib/apolloClient";
/**
 * The ApolloWrapper component wraps the ApolloProvider from @apollo/client.
 * It passes the client instance as a prop to the ApolloProvider.
 *
 * @param props - The props for the component.
 * @param props.children - The children to be rendered inside the ApolloProvider.
 * @returns The rendered ApolloProvider with the given children.
 */
import { ReactNode, ReactElement } from "react";

interface ApolloWrapperProps {
  children: ReactNode;
}

export function ApolloWrapper({ children }: ApolloWrapperProps): ReactElement {
  return <Provider client={client}>{children}</Provider>;
}
