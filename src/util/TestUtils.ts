import {
    Phase0QualitiesPart0,
    Phase0QualitiesPart1,
    Phase1Questions,
    TestInfoInterface,
    TYPES
} from "@/components/Test/Properties";

export const TYPES_INDEX_MAP: { [key in TYPES]: number } = {
    [TYPES.HUSTLE]: 0,
    [TYPES.GUARDIAN]: 1,
    [TYPES.EMPATH]: 2,
    [TYPES.CAPTAIN]: 3,
    [TYPES.JESTER]: 4,
    [TYPES.CHATTERBOX]: 5,
    [TYPES.BRAINIAC]: 6,
    [TYPES.CRITIC]: 7,
    [TYPES.ROMANTIC]: 8,
    [TYPES.TRENDSETTER]: 9,
    [TYPES.MAVERICK]: 10,
    [TYPES.WILDCARD]: 11,
    [TYPES.MOOD]: 12,
    [TYPES.SAGE]: 13,
};

//  great great functional programming here. Just changing data structures for efficient searching and that also gives easy code apparently
export const Phase0QualitiesPart0_TEXT2TYPES: { [key: string]: TYPES[] } = Phase0QualitiesPart0.reduce((map, quality) => {
    return {...map, [quality.text]: quality.types }
}, {});

export const Phase0QualitiesPart1_TEXT2TYPES: { [key: string]: TYPES[] } = Phase0QualitiesPart1.reduce((map, quality) => {
    return {...map, [quality.text]: quality.types }
}, {});

export const Phase1Qualities_QUESTION2TYPES : { [key: string]: TYPES[] } = Phase1Questions.reduce((map, quality) => {
    return {...map, [quality.text]: quality.types }
}, {});


const testInfoToMongo = (testInfo: TestInfoInterface) => {
    let info: {[key: string]: number} = {}
    // initialize
    for (const type in TYPES) {
        info[type] = 0
    }

    for(const quality in testInfo.phase0.group0) {
        Phase0QualitiesPart0_TEXT2TYPES[quality].forEach((type, index) => {
            info[type] += 2
        })
    }

    for(const quality in testInfo.phase0.group1) {
        Phase0QualitiesPart1_TEXT2TYPES[quality].forEach((type, index) => {
            info[type] += 2
        })
    }

    for(const question in  testInfo.phase1) {
        Phase1Qualities_QUESTION2TYPES[question].forEach((type, index) => {
            info[type] += 3
        });
    }

    let infoSorted = []
    for(const key in info) {
        if(info[key] > 0) {
            infoSorted.push({personality_key: key, score: info[key]})
        }
    }
    infoSorted.sort((a,b) => a.score - b.score)

    return info
}