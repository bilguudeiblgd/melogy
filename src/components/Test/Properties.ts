import { upperCase } from "lodash";

export enum TYPES {
    HUSTLE = "HUSTLE",
    PROTECTOR = "PROTECTOR",
    EMPATH = "EMPATH",
    CAPTAIN = "CAPTAIN",
    JESTER = "JESTER",
    CHATTERBOX = "CHATTERBOX",
    BRAINIAC = "BRAINIAC",
    CRITIC = "CRITIC",
    ROMANTIC = "ROMANTIC",
    TRENDSETTER = "TRENDSETTER",
    MAVERICK = "MAVERICK",
    RANDOM = "RANDOM",
    MOOD = "MOOD",
    WISDOM = "WISDOM"
}

// export const DUO_DYNAMIC_TYPES: Record<string, string> = {
//     [`${TYPES.RANDOM},${TYPES.GUARDIAN}`]: "Hustle and Guardian",

//     [`${TYPES.HUSTLE},${TYPES.GUARDIAN}`]: "Hustle and Guardian",
//     [`${TYPES.HUSTLE},${TYPES.EMPATH}`]: "Hustle and Empath",
//     [`${TYPES.HUSTLE},${TYPES.CAPTAIN}`]: "Hustle and Captain",
//     [`${TYPES.HUSTLE},${TYPES.JESTER}`]: "Hustle and Jester",
//     [`${TYPES.HUSTLE},${TYPES.CHATTERBOX}`]: "Hustle and Chatterbox",
// }
// #TODO: have types and interface in 1 folder

// This creates a map: { "HUSTLE": TYPES.HUSTLE, ... }


export const stringToTypeEnum = (str: string): TYPES | null => {
    function isValidType(value: string): value is TYPES {
        return Object.values(TYPES).includes(value as TYPES);
    }

    if (isValidType(str.toUpperCase())) {
        return str.toUpperCase() as TYPES
    }
    else return null
}


export const type2description: Record<TYPES, string> = {
    [TYPES.HUSTLE]: "Always chasing goals",
    [TYPES.PROTECTOR]: "Protects the group",
    [TYPES.EMPATH]: "Feels with you",
    [TYPES.CAPTAIN]: "Leads the way",
    [TYPES.JESTER]: "Brings the laughs",
    [TYPES.CHATTERBOX]: "Talks non-stop",
    [TYPES.BRAINIAC]: "Knows the answer",
    [TYPES.CRITIC]: "Questions everything, always",
    [TYPES.ROMANTIC]: "Loves with passion",
    [TYPES.TRENDSETTER]: "Sets the trends",
    [TYPES.MAVERICK]: "Breaks the rules",
    [TYPES.RANDOM]: "Full of surprises",
    [TYPES.MOOD]: "Changes like weather",
    [TYPES.WISDOM]: "Shares wise words",
};


export enum PHASE {
    PHASE0, PHASE1, PHASE_DONE
}

export const Phase0QualitiesPart0 = [
    { text: "Determined", types: [TYPES.HUSTLE, TYPES.PROTECTOR] },
    { text: "Caring", types: [TYPES.EMPATH, TYPES.CAPTAIN] },
    { text: "Entertaining", types: [TYPES.JESTER, TYPES.CHATTERBOX] },
    { text: "Logical", types: [TYPES.BRAINIAC, TYPES.CRITIC] },
    { text: "Good taste", types: [TYPES.ROMANTIC, TYPES.TRENDSETTER] },
    { text: "Bold", types: [TYPES.MAVERICK, TYPES.RANDOM] },
    { text: "Deep", types: [TYPES.MOOD, TYPES.WISDOM] }
];

export const Phase0QualitiesPart1 = [
    { text: "Judgmental", types: [TYPES.CHATTERBOX, TYPES.CRITIC] },
    { text: "Controlling", types: [TYPES.HUSTLE, TYPES.CAPTAIN] },
    { text: "Stubborn", types: [TYPES.MAVERICK, TYPES.PROTECTOR] },
    { text: "Self-focused", types: [TYPES.ROMANTIC, TYPES.TRENDSETTER] },
    { text: "Self-neglecting", types: [TYPES.WISDOM, TYPES.EMPATH] },
    { text: "Lazy", types: [TYPES.BRAINIAC, TYPES.MOOD] },
    { text: "Reckless", types: [TYPES.RANDOM, TYPES.JESTER] }
];

export interface Phase0QuestionType {
    text: string,
    type: TYPES[]
}

export interface TestInfoInterface {
    phase0: {
        group0: string[],
        group1: string[],
    }
    phase1: string[]
}


export interface Phase1QuestionType {
    text: string,
    type: TYPES
}

export type TypeScoreType = {
    personality_type: string;
    score: number
}

export type TestTypeDb = {
    testReceiver: string | null;
    testGiver: string | null;
    info: TypeScoreType[];
    group: string;
}

export const Phase1Questions = [
    { text: "Stand up for people", types: [TYPES.PROTECTOR] },
    { text: "Love solving puzzles", types: [TYPES.BRAINIAC] },
    { text: "Give life changing advice", types: [TYPES.WISDOM] },
    { text: "Focus on self improvement", types: [TYPES.HUSTLE] },
    { text: "Organize group activities", types: [TYPES.CAPTAIN] },
    { text: "Do the most random things", types: [TYPES.RANDOM] },
    { text: "Understand how others feel", types: [TYPES.EMPATH] },
    { text: "Never run out of things to say", types: [TYPES.CHATTERBOX] },
    { text: "Make everyone laugh", types: [TYPES.JESTER] },
    { text: "Start and win an argument", types: [TYPES.CRITIC] },
    { text: "Have a million date ideas", types: [TYPES.ROMANTIC] },
    { text: "Take the best photos", types: [TYPES.TRENDSETTER] },
    { text: "Never leave their house", types: [TYPES.MOOD] },
    { text: "Get called to the principal's office", types: [TYPES.MAVERICK] }
];


