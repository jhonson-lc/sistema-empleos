import { signIn,signOut } from "next-auth/react";

export default{
    signIn : ({email}:any) => signIn("email",{email}),
    signOut : () => signOut()
}