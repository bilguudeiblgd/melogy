import { useEffect } from "react"
import { useRouter } from "next/router"
import Text from "@/components/Text"
import Loading from "./Loading"

export const ReNavigation = ({ path, }: { path: string }) => {
    const defaultPath = "/"
    const router = useRouter()
    useEffect(() => {
        router.push(path)
    }, [path, router])
    return (
        <Loading/>
    )
}