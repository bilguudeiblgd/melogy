import React from 'react';
import { stringToTypeEnum, type2description, TYPES, TypeScoreType } from "@/components/Test/Properties";
import TextEdgy from "@/components/TextEdgy";
import Link from "next/link";

interface Props {
    topK: number;
    typeResult: TypeScoreType[]
}

const DisplayTopKResult: React.FC<Props> = ({ topK, typeResult }) => {
    const findTopK = (res: TypeScoreType[], topK: number): TypeScoreType[] => {
        // Sort the array based on score in descending order
        const sortedResults = [...res].sort((a, b) => b.score - a.score);

        // Return the top three results
        return sortedResults.slice(0, topK);
    };
    
    const topKResult = findTopK(typeResult, topK)
    return (
        <div className="flex flex-col justify-center items-center">
            {topKResult ? topKResult.map((types, index) =>
                <ResultCard index={index} type={types.personality_type} 
                key={index}
                />
            ) :
                <span className="loading loading-ring loading-lg text-primary"></span>
            }

        </div>
    );
};


const CARD_COLORS = [
    "#ECC43F", // yellow
    "#EF6A3F", // orange
    "#9F3AF8", // purple
];
const NUMBER_COLORS = [
    "#18195A", // dark blue
    "#18195A", // dark blue
    "#18195A", // dark blue
];
const TYPE_COLORS = [
    "#01502D", // green for 1
    "#FED33D", // yellow for 2
    "#8BD91B", // green for 3
];
const DESC_COLORS = [
    "#01502D", // green for 1
    "#FED33D", // yellow for 2
    "#8BD91B", // green for 3
];

interface CardProps {
    index: number;
    type: string;
   
}

const ResultCard: React.FC<CardProps> = ({ index, type }) => {
    const typeURL = `/types/${type.toLowerCase()}`;
    const resolvedType = stringToTypeEnum(type)

    const description = resolvedType ? type2description[resolvedType] : ""
    return (
        <Link
            target="_blank"
            href={typeURL}
            style={{
                backgroundColor: CARD_COLORS[index],
            }}
            className="flex flex-row rounded-3xl my-4 px-6 py-4 items-center w-full max-w-[400px] mx-auto shadow-lg"
        >
            {/* Number */}
            <div className="flex flex-col items-center mr-6">
                <span
                    style={{
                        color: NUMBER_COLORS[index],
                        fontWeight: 900,
                        fontSize: "2.5rem",
                        lineHeight: 1,
                    }}
                >
                    {index + 1}
                </span>
            </div>
            {/* Type and Description */}
            <div className="flex flex-col justify-center">
                <span
                    style={{
                        color: TYPE_COLORS[index],
                        fontWeight: 900,
                        fontSize: "2.2rem",
                        lineHeight: 1,
                    }}
                >
                    {type}
                </span>
                <span
                    style={{
                        color: DESC_COLORS[index],
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        marginTop: "0.2rem",
                    }}
                >
                    {description}
                </span>
            </div>
        </Link>
    );
};


export default DisplayTopKResult;