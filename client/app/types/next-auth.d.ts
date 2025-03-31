import { ROLE } from "@/app/utils/types";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
    role?: ROLE;
    token?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email: string;
      image?: string | null;
      role: ROLE;
      token?: string;
    }
  }

  interface JWT {
    id?: string;
    email?: string;
    name?: string;
    picture?: string;
    image?: string | null;
    role?: ROLE;
    token?: string;
  }
}