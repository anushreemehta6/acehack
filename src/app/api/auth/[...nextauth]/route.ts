import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/get-started',
    signOut: '/get-started',
    error: '/get-started',
  },
  callbacks: {
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.type = token.type;
      }
      return session;
    },
    async jwt({ token, user, account }: any) {
      if (user) {
        token.sub = user.id;
        // Get the user type from the URL state parameter
        if (account?.provider === 'google') {
          const url = new URL(account.redirect_uri);
          const state = url.searchParams.get('state');
          if (state) {
            try {
              const stateData = JSON.parse(decodeURIComponent(state));
              token.type = stateData.type;
            } catch (error) {
              console.error('Error parsing state:', error);
              token.type = 'creator'; // Default to creator if state parsing fails
            }
          }
        }
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
});

export { handler as GET, handler as POST }; 