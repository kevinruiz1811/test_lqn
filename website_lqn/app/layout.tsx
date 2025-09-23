import { ReactNode } from "react";
import ApolloWrapper from "../components/ApolloWrapper";
import { Orbitron } from "next/font/google";

export const metadata = {
  title: "Star Wars Fans",
};

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "black", fontFamily: orbitron.style.fontFamily }}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
