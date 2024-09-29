export enum TYPES {
    HUSTLE = "HUSTLE",
    GUARDIAN = "GUARDIAN",
    EMPATH = "EMPATH",
    CAPTAIN = "CAPTAIN",
    JESTER = "JESTER",
    CHATTERBOX = "CHATTERBOX",
    BRAINIAC = "BRAINIAC",
    CRITIC = "CRITIC",
    ROMANTIC = "ROMANTIC",
    TRENDSETTER = "TRENDSETTER",
    MAVERICK = "MAVERICK",
    WILDCARD = "WILDCARD",
    MOOD = "MOOD",
    SAGE = "SAGE"
}
// #TODO: have types and interface in 1 folder


export enum PHASE {
    PHASE0, PHASE1, PHASE_DONE
}

export const Phase0QualitiesPart0 = [
    {text: "Determined", types: [TYPES.HUSTLE, TYPES.GUARDIAN]},
    {text: "Caring", types: [TYPES.EMPATH, TYPES.CAPTAIN]},
    {text: "Entertaining", types: [TYPES.JESTER, TYPES.CHATTERBOX]},
    {text: "Logical", types: [TYPES.BRAINIAC, TYPES.CRITIC]},
    {text: "Good taste", types: [TYPES.ROMANTIC, TYPES.TRENDSETTER]},
    {text: "Bold", types: [TYPES.MAVERICK, TYPES.WILDCARD]},
    {text: "Deep", types: [TYPES.MOOD, TYPES.SAGE]}
];

export const Phase0QualitiesPart1 = [
    {text: "Judgmental", types: [TYPES.CHATTERBOX, TYPES.CRITIC]},
    {text: "Controlling", types: [TYPES.HUSTLE, TYPES.CAPTAIN]},
    {text: "Stubborn", types: [TYPES.MAVERICK, TYPES.GUARDIAN]},
    {text: "Self-focused", types: [TYPES.ROMANTIC, TYPES.TRENDSETTER]},
    {text: "Self-neglecting", types: [TYPES.SAGE, TYPES.EMPATH]},
    {text: "Lazy", types: [TYPES.BRAINIAC, TYPES.MOOD]},
    {text: "Reckless", types: [TYPES.WILDCARD, TYPES.JESTER]}
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
    info: TypeScoreType[]
}

export const Phase1Questions = [
    {text: "Stand up for people", types: [TYPES.GUARDIAN]},
    {text: "Love solving puzzles", types: [TYPES.BRAINIAC]},
    {text: "Give life changing advice", types: [TYPES.SAGE]},
    {text: "Focus on self improvement", types: [TYPES.HUSTLE]},
    {text: "Organize group activities", types: [TYPES.CAPTAIN]},
    {text: "Do the most random things", types: [TYPES.WILDCARD]},
    {text: "Understand how others feel", types: [TYPES.EMPATH]},
    {text: "Never run out of things to say", types: [TYPES.CHATTERBOX]},
    {text: "Make everyone laugh", types: [TYPES.JESTER]},
    {text: "Start and win an argument", types: [TYPES.CRITIC]},
    {text: "Have a million date ideas", types: [TYPES.ROMANTIC]},
    {text: "Take the best photos", types: [TYPES.TRENDSETTER]},
    {text: "Never leave their house", types: [TYPES.MOOD]},
    {text: "Get called to the principal's office", types: [TYPES.MAVERICK]}
];

