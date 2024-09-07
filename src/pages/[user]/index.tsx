import { useRouter } from 'next/router'
import {signIn, useSession} from "next-auth/react";
import AccessDenied from "@/components/AccessDenied";
import Navbar from "@/components/Navbar";
import Skeleton from "@/components/Skeleton";
import {TypeScoreType} from "@/components/Test/Properties";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "@/pages/_app";

export default function Page() {
  const router = useRouter()
  const userName : string[] | string | undefined = router.query.user
  const GLOBALS = useContext(GlobalContext)
  const [topThreeType, setTopThreeType] = useState<TypeScoreType[]|null>()
  const { data: session } = useSession()

  useEffect(() => {
    fetchResultScore()
  })

  if(!session) {
    signIn()
  }

  if(session?.user.userHandle != userName) {
    return <AccessDenied />
  }

  const findTopThree = (res: TypeScoreType[]): TypeScoreType[] => {
    // Sort the array based on score in descending order
    const sortedResults = [...res].sort((a, b) => b.score - a.score);

    // Return the top three results
    return sortedResults.slice(0, 3);
  };


  const fetchResultScore = async () => {
    try {
      const response = await fetch(`${GLOBALS.baseURL}/api/get-results`, {
        method: 'POST',
        body: JSON.stringify({userHandle: session?.user.userHandle})
      })
      const data = await response.json()
      const results: TypeScoreType[] = data.data
      if(results && results.length >= 3) {
        const topThree = findTopThree(results);
        setTopThreeType(topThree); // Update the state with the top three results
      }
      else {
        console.log("Some error let's go")
      }
    } catch(e) {

    }
  }




  return <Skeleton>
    <Navbar/>
    <div>
      {topThreeType && topThreeType.map((types, index) =>
          <div key={index}>
            <p>
              {types.personality_type} with score: {types.score}
            </p>
      </div>
      )}

    </div>
  </Skeleton>
}



