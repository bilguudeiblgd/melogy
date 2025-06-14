import { useEffect } from "react"
import { useRouter } from "next/router"
import Text from "@/components/Text"
import Loading from "./Loading"

export const ReNavigation = ({ path, }: { path: string }) => {
    const defaultPath = "/"
    const router = useRouter()
    useEffect(() => {
        router.push(path).then((state) => {
            if(!state) router.replace(defaultPath).catch((e) => {
                console.log(e)
            })
        })
    }, [path, router])
    return (
        <Loading/>
    )
}