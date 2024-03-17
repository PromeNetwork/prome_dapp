import NextAuth ,{type CallbacksOptions,type Profile,type Account}from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions = {
  // Configure one or more authentication providers

  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    // ...add more providers here
  ],
}
console.log(authOptions.providers[0].clientId,authOptions.providers[0].clientSecret)

export default NextAuth(authOptions)