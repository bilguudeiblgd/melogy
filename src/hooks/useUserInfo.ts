import {useSession} from "next-auth/react";
import {useState} from "react";
import {useRouter} from "next/router"
import {User} from "next-auth";

function useUserStatus() {
    const {data: session} = useSession()
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    if(session?.user) {
    //     query the user
    //     session?.user.
        setUser(session.user)
        if(user?.userHandle) {
            router.push('/gethandle')
        }
        return user
    }



    return user
}