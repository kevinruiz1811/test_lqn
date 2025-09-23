import { ReactNode } from "react";
import ApolloWrapper from "../components/ApolloWrapper";

export const metadata = {
  title: "Star Wars Fans",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
