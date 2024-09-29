import React from 'react';
import {TypeScoreType} from "@/components/Test/Properties";
import TextEdgy from "@/components/TextEdgy";
import Link from "next/link";

interface Props {
    topK: number;
    typeResult: TypeScoreType[]
}

const DisplayTopKResult: React.FC<Props> = ({topK, typeResult}) => {
    const findTopK = (res: TypeScoreType[], topK: number): TypeScoreType[] => {
        // Sort the array based on score in descending order
        const sortedResults = [...res].sort((a, b) => b.score - a.score);

        // Return the top three results
        return sortedResults.slice(0, topK);
    };
    const topKResult = findTopK(typeResult, topK)
    return (
        <div>
            {topKResult ? topKResult.map((types, index) =>
                    <ResultCard index={index} type={types.personality_type} key={index}/>
                ) :
                <span className="loading loading-ring loading-lg text-primary"></span>
            }

        </div>
    );
};


interface CardProps {
    index: number;
    type: string;
}

const ResultCard: React.FC<CardProps> = ({index, type}) => {
    const typeURL = `/types/${type.toLowerCase()}`
    const colors = ["#de3e5b", "#f8d24c", "#53a548"]

    return (
        // somehow colors in bg-colors[index] was not working
        <Link target={"_blank"} href={typeURL} style={{backgroundColor: `${colors[index]}`,}}
              className={`btn flex rounded-2xl relative my-2 justify-center items-center w-64 h-24`}>
            <TextEdgy className={`text-base-100 ${index == 1 && "text-primary"}`}>{type}</TextEdgy>
            <div className={"absolute bottom-1 left-2"}>
                <TextEdgy className={`text-base-100 ${index == 1 && "text-primary"} text-2xl`}>{index + 1}</TextEdgy>
            </div>
        </Link>
    )
}


export default DisplayTopKResult;