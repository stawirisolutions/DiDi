import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { axiosInstance } from '@/app/hooks/useAxios';
// Import your ROLE type
import { ROLE } from '@/app/utils/types';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                
                try {
                    const response = await axiosInstance.post('/auth/login', {
                        email: credentials.email,
                        password: credentials.password
                    });
                    
                    const userData = response?.data;
                    
                    if (!userData || !userData.user) {
                        return null;
                    }
                    
                    // Return the user with proper typing
                    return {
                        id: userData.user.id || userData.user._id,
                        email: userData.user.email,
                        name: userData.user.name || `${userData.user.firstName} ${userData.user.lastName}`,
                        image: userData.user.image || null,
                        role: userData.user.role || 'Customer',
                        token: userData.accessToken
                    };
                } catch (err) {
                    console.error('Auth error:', err);
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET",
        })
    ],
    session: { strategy: 'jwt', maxAge: 60 * 60 },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Safely cast user and ensure proper typing
                return {
                    ...token,
                    id: user.id || token.sub || '',
                    email: user.email || '',
                    name: user.name || '',
                    image: user.image || null,
                    token: (user as any).token || undefined,
                    role: (user as any).role as ROLE || 'Customer'
                };
            }
            return token;
        },
        async session({ session, token }) {
            // Ensure session user has all the required properties with proper types
            session.user = {
                id: token.id as string || '',
                email: token.email as string || '',
                name: token.name as string || '',
                image: token.picture as string || token.image as string || null,
                role: token.role as ROLE || 'Customer',
                token: token.token as string || undefined
            };
            return session;
        },
    },
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/login',
    },
    debug: process.env.NODE_ENV === 'development',
};