import { authOptions } from "@/app/libs/auth";
import NextAuth from "next-auth";

export const handler = NextAuth(authOptions) as never;

export { handler as GET, handler as POST };