"use client";

import { ReactNode } from "react";
import client from "../lib/apollo";
import { ApolloProvider } from "@apollo/client/react";

interface Props {
  children: ReactNode;
}

export default function ApolloWrapper({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
