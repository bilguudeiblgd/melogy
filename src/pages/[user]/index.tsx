import {useRouter} from 'next/router'
import {signIn, useSession} from "next-auth/react";
import AccessDenied from "@/components/AccessDenied";
import Skeleton from "@/components/Skeleton";
import {TypeScoreType} from "@/components/Test/Properties";
import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "@/pages/_app";
import Loading from "@/components/Loading";
import TextEdgy from "@/components/TextEdgy";
import Text from "@/components/Text"
import Link from "next/link";

export default function Page() {
  const router = useRouter()
  const userName : string[] | string | undefined = router.query.user
  const GLOBALS = useContext(GlobalContext)
  const [topThreeType, setTopThreeType] = useState<TypeScoreType[]|null>()
  const {data: session, status} = useSession()

  useEffect(() => {
    const fetchResultScore = async () => {
      try {
        const response = await fetch(`${GLOBALS.baseURL}/api/get-results`, {
          method: 'POST',
          body: JSON.stringify({userHandle: session?.user.userHandle})
        })
        const data = await response.json()
        const results: TypeScoreType[] = data.data
        if (results && results.length >= 3) {
          const topThree = findTopThree(results);
          setTopThreeType(topThree); // Update the state with the top three results
        } else {
          console.log("Some error let's go")
        }
      } catch (e) {

      }
    }

    fetchResultScore()
  }, [session])

  if (status === "loading") {
    return <Loading/>
  }

  if (!session) {
    signIn()
  }

  if (session?.user.userHandle != userName) {
    return <AccessDenied/>
  }

  const findTopThree = (res: TypeScoreType[]): TypeScoreType[] => {
    // Sort the array based on score in descending order
    const sortedResults = [...res].sort((a, b) => b.score - a.score);

    // Return the top three results
    return sortedResults.slice(0, 3);
  };

  return <Skeleton showNavbar={true}>
    <div className={"flex flex-col items-center mt-12"}>
      <Text className={"text-2xl font-bold text-primary"}>RESULT: </Text>
      {topThreeType ? topThreeType.map((types, index) =>
              <ResultCard index={index} type={types.personality_type} key={index}/>
          ) :
          <span className="loading loading-ring loading-lg text-primary"></span>

      }

    </div>
  </Skeleton>
}


interface CardProps {
  index: number;
  type: string;
}

const ResultCard: React.FC<CardProps> = ({index, type}) => {
  const typeURL = `/types/${type.toLowerCase()}`
  const colors = ["#de3e5b", "#f8d24c", "#53a548"]

  return (
      // somehow colors in bg-colors[index] was not working
      <Link target={"_blank"} href={typeURL} style={{backgroundColor: `${colors[index]}`}}
            className={`btn flex rounded-2xl relative my-2 justify-center items-center w-64 h-24`}>
        <TextEdgy className={"text-base-100"}>{type}</TextEdgy>
        <div className={"absolute bottom-1 left-2"}>
          <TextEdgy className={"text-base-100 text-2xl"}>{index + 1}</TextEdgy>
        </div>
      </Link>
  )
}



