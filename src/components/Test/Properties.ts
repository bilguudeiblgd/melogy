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
    STYL = "STYL",
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
    [TYPES.STYL]: "Sets the trends",
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
    { text: "Good taste", types: [TYPES.ROMANTIC, TYPES.STYL] },
    { text: "Bold", types: [TYPES.MAVERICK, TYPES.RANDOM] },
    { text: "Deep", types: [TYPES.MOOD, TYPES.WISDOM] }
];

export const Phase0QualitiesPart1 = [
    { text: "Judgmental", types: [TYPES.CHATTERBOX, TYPES.CRITIC] },
    { text: "Controlling", types: [TYPES.HUSTLE, TYPES.CAPTAIN] },
    { text: "Stubborn", types: [TYPES.MAVERICK, TYPES.PROTECTOR] },
    { text: "Self-focused", types: [TYPES.ROMANTIC, TYPES.STYL] },
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
    { text: "Take the best photos", types: [TYPES.STYL] },
    { text: "Never leave their house", types: [TYPES.MOOD] },
    { text: "Get called to the principal's office", types: [TYPES.MAVERICK] }
];


// taken vertically from the top left to bottom right
const TypeDuo: Record<string, string> = {
    [`${TYPES.RANDOM},${TYPES.RANDOM}`]: "Shares one brain cell",
    [`${TYPES.RANDOM},${TYPES.MAVERICK}`]: "Bonnie & Clyde",
    [`${TYPES.RANDOM},${TYPES.HUSTLE}`]: "Work hard, play hard",
    [`${TYPES.RANDOM},${TYPES.PROTECTOR}`]: "Good Cop, Wild Card",
    [`${TYPES.RANDOM},${TYPES.JESTER}`]: "Circus clowns",
    [`${TYPES.RANDOM},${TYPES.CHATTERBOX}`]: "TMZ",
    [`${TYPES.RANDOM},${TYPES.CAPTAIN}`]: "Order and chaos",
    [`${TYPES.RANDOM},${TYPES.EMPATH}`]: "Soul & Spark",
    [`${TYPES.RANDOM},${TYPES.MOOD}`]: "Energetic vs exhausted",
    [`${TYPES.RANDOM},${TYPES.WISDOM}`]: "Po and Shifu",
    [`${TYPES.RANDOM},${TYPES.BRAINIAC}`]: "Lab rat and Researcher",
    [`${TYPES.RANDOM},${TYPES.CRITIC}`]: "Golden retriever & Black cat",
    [`${TYPES.RANDOM},${TYPES.STYL}`]: "Divas of the club",
    [`${TYPES.RANDOM},${TYPES.ROMANTIC}`]: "Love at first sight",


    [`${TYPES.MAVERICK},${TYPES.MAVERICK}`]: "Gangsters",
    [`${TYPES.MAVERICK},${TYPES.HUSTLE}`]: "'Rules were made to break'",
    [`${TYPES.MAVERICK},${TYPES.PROTECTOR}`]: "'Fuck the government'",
    [`${TYPES.MAVERICK},${TYPES.JESTER}`]: "Criminal and lawyer",
    [`${TYPES.MAVERICK},${TYPES.CHATTERBOX}`]: "Jack & Popular",
    [`${TYPES.MAVERICK},${TYPES.CAPTAIN}`]: "Parent and Delinquent",
    [`${TYPES.MAVERICK},${TYPES.EMPATH}`]: "Angel and Devil",
    [`${TYPES.MAVERICK},${TYPES.MOOD}`]: "Thunder & rain",
    [`${TYPES.MAVERICK},${TYPES.WISDOM}`]: "Shoot first vs Ask questions",
    [`${TYPES.MAVERICK},${TYPES.BRAINIAC}`]: "Book smart & Street smart",
    [`${TYPES.MAVERICK},${TYPES.CRITIC}`]: "Bullies",
    [`${TYPES.MAVERICK},${TYPES.STYL}`]: "Leather fashion",
    [`${TYPES.MAVERICK},${TYPES.ROMANTIC}`]: "Beauty and the Beast",

    [`${TYPES.HUSTLE},${TYPES.HUSTLE}`]: "Business partners",
    [`${TYPES.HUSTLE},${TYPES.PROTECTOR}`]: "Win vs change the game",
    [`${TYPES.HUSTLE},${TYPES.JESTER}`]: "Blood, sweat and giggles",
    [`${TYPES.HUSTLE},${TYPES.CHATTERBOX}`]: "Networkers",
    [`${TYPES.HUSTLE},${TYPES.CAPTAIN}`]: "Strategists",
    [`${TYPES.HUSTLE},${TYPES.EMPATH}`]: "Tank and Healer",
    [`${TYPES.HUSTLE},${TYPES.MOOD}`]: "Early bird & Night owl",
    [`${TYPES.HUSTLE},${TYPES.WISDOM}`]: "Fiid fir thought enjoyers",
    [`${TYPES.HUSTLE},${TYPES.BRAINIAC}`]: "Think tank",
    [`${TYPES.HUSTLE},${TYPES.CRITIC}`]: "Shark tank",
    [`${TYPES.HUSTLE},${TYPES.STYL}`]: "High fashion duo",
    [`${TYPES.HUSTLE},${TYPES.ROMANTIC}`]: "Fitness duo",

    [`${TYPES.PROTECTOR},${TYPES.PROTECTOR}`]: "Political activists",
    [`${TYPES.PROTECTOR},${TYPES.JESTER}`]: "'We live in a society'",
    [`${TYPES.PROTECTOR},${TYPES.CHATTERBOX}`]: "'Spread the message'",
    [`${TYPES.PROTECTOR},${TYPES.CAPTAIN}`]: "Organizers",
    [`${TYPES.PROTECTOR},${TYPES.EMPATH}`]: "Safe space builders",
    [`${TYPES.PROTECTOR},${TYPES.MOOD}`]: "Mama bear & cub",
    [`${TYPES.PROTECTOR},${TYPES.WISDOM}`]: "Humanists",
    [`${TYPES.PROTECTOR},${TYPES.BRAINIAC}`]: "Humanities & STEM",
    [`${TYPES.PROTECTOR},${TYPES.CRITIC}`]: "Thanksgiving dinner",
    [`${TYPES.PROTECTOR},${TYPES.STYL}`]: "Symbolism lovers",
    [`${TYPES.PROTECTOR},${TYPES.ROMANTIC}`]: "Would die for love",

    [`${TYPES.JESTER},${TYPES.JESTER}`]: "Lol, lmao even",
    [`${TYPES.JESTER},${TYPES.CHATTERBOX}`]: "Conversation carriers",
    [`${TYPES.JESTER},${TYPES.CAPTAIN}`]: "Friend group pillars",
    [`${TYPES.JESTER},${TYPES.EMPATH}`]: "Crying inside duo",
    [`${TYPES.JESTER},${TYPES.MOOD}`]: "Self deprecating jokers",
    [`${TYPES.JESTER},${TYPES.WISDOM}`]: "Unexpectedly deep",
    [`${TYPES.JESTER},${TYPES.BRAINIAC}`]: "Witty duo",
    [`${TYPES.JESTER},${TYPES.CRITIC}`]: "Offensive jokers",
    [`${TYPES.JESTER},${TYPES.STYL}`]: "'What are those'",
    [`${TYPES.JESTER},${TYPES.ROMANTIC}`]: "Pick up artists",

    [`${TYPES.CHATTERBOX},${TYPES.CHATTERBOX}`]: "Tea factory",
    [`${TYPES.CHATTERBOX},${TYPES.CAPTAIN}`]: "People managers",
    [`${TYPES.CHATTERBOX},${TYPES.EMPATH}`]: "Hand holding conversations",
    [`${TYPES.CHATTERBOX},${TYPES.MOOD}`]: "Talker & listener",
    [`${TYPES.CHATTERBOX},${TYPES.WISDOM}`]: "Small talk & deep talk",
    [`${TYPES.CHATTERBOX},${TYPES.BRAINIAC}`]: "'Let me do the talking'",
    [`${TYPES.CHATTERBOX},${TYPES.CRITIC}`]: "Drama queens",
    [`${TYPES.CHATTERBOX},${TYPES.STYL}`]: "Trendsetters",
    [`${TYPES.CHATTERBOX},${TYPES.ROMANTIC}`]: "Charmers",

    [`${TYPES.CAPTAIN},${TYPES.CAPTAIN}`]: "Batman with prep time",
    [`${TYPES.CAPTAIN},${TYPES.EMPATH}`]: "Dependable duo",
    [`${TYPES.CAPTAIN},${TYPES.MOOD}`]: "'Let's get you in shape'",
    [`${TYPES.CAPTAIN},${TYPES.WISDOM}`]: "Leader & Advisor",
    [`${TYPES.CAPTAIN},${TYPES.BRAINIAC}`]: "General & Scientist",
    [`${TYPES.CAPTAIN},${TYPES.CRITIC}`]: "Brat & tamer",
    [`${TYPES.CAPTAIN},${TYPES.STYL}`]: "Suits & dresses",
    [`${TYPES.CAPTAIN},${TYPES.ROMANTIC}`]: "Date planners",

    [`${TYPES.EMPATH},${TYPES.EMPATH}`]: "'Do YOU want to?' loop",
    [`${TYPES.EMPATH},${TYPES.MOOD}`]: "Inner child healers",
    [`${TYPES.EMPATH},${TYPES.WISDOM}`]: "Dependable friends",
    [`${TYPES.EMPATH},${TYPES.BRAINIAC}`]: "'Heart & Mind'",
    [`${TYPES.EMPATH},${TYPES.CRITIC}`]: "Bouba & Kiki",
    [`${TYPES.EMPATH},${TYPES.STYL}`]: "DIY Crafts",
    [`${TYPES.EMPATH},${TYPES.ROMANTIC}`]: "Deep lovers",

    [`${TYPES.MOOD},${TYPES.MOOD}`]: "Deep Blues",
    [`${TYPES.MOOD},${TYPES.WISDOM}`]: "Video essay enjoyers",
    [`${TYPES.MOOD},${TYPES.BRAINIAC}`]: "Gamers",
    [`${TYPES.MOOD},${TYPES.CRITIC}`]: "Roaster & Target",
    [`${TYPES.MOOD},${TYPES.STYL}`]: "Deep art enjoyers",
    [`${TYPES.MOOD},${TYPES.ROMANTIC}`]: "Soul mate seekers",

    [`${TYPES.WISDOM},${TYPES.WISDOM}`]: "Socrates & Aristotle",
    [`${TYPES.WISDOM},${TYPES.BRAINIAC}`]: "Wisdom vs Intelligence",
    [`${TYPES.WISDOM},${TYPES.CRITIC}`]: "Morality debates",
    [`${TYPES.WISDOM},${TYPES.STYL}`]: "Dissecting art",
    [`${TYPES.WISDOM},${TYPES.ROMANTIC}`]: "Relationship analyzers",

    [`${TYPES.BRAINIAC},${TYPES.BRAINIAC}`]: "Science team",
    [`${TYPES.BRAINIAC},${TYPES.CRITIC}`]: "Endless 'Well Actually's",
    [`${TYPES.BRAINIAC},${TYPES.STYL}`]: "Dress up game",
    [`${TYPES.BRAINIAC},${TYPES.ROMANTIC}`]: "Hot & Cold",

    [`${TYPES.CRITIC},${TYPES.CRITIC}`]: "Mean girls",
    [`${TYPES.CRITIC},${TYPES.STYL}`]: "Fit check",
    [`${TYPES.CRITIC},${TYPES.ROMANTIC}`]: "Delulu & Reality checker",

    [`${TYPES.STYL},${TYPES.STYL}`]: "Etsy shop",
    [`${TYPES.STYL},${TYPES.ROMANTIC}`]: "Sex apeal",

    [`${TYPES.ROMANTIC},${TYPES.ROMANTIC}`]: "Dream Duo",
}

export function getDuoDescription(type1: TYPES, type2: TYPES): string {
    const key = `${type1},${type2}`;
    const alternativeKey = `${type2},${type1}`;
    return TypeDuo[key] || TypeDuo[alternativeKey];
}
