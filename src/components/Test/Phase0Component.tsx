import React, {useEffect, useState} from 'react';
import Phase0Button from "@/components/Test/Phase0Button";
import {Phase0QualitiesPart0, Phase0QuestionType} from "@/components/Test/Properties";
import {TestInfoInterface} from "@/components/Test/Properties";
import Phase0Part0Component from "@/components/Test/Phase0Part0Component";
import Phase0Part1Component from "@/components/Test/Phase0Part1Component";
import { DropResult, DragDropContext, Droppable, Draggable, DroppableProvided, DroppableStateSnapshot, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import TextEdgy from '@/components/TextEdgy';


type Props = {
    handleContinueButton: (arg: TestInfoInterface) => void;
    testInfo: TestInfoInterface;
    testReceiver: string
}

const Phase0Component: React.FC<Props> = ({handleContinueButton, testInfo, testReceiver}) => {
    const [partOneFinished, setPartOneFinished] = useState(false)

    const handlePart0Continue = (arg: TestInfoInterface) => {
        setPartOneFinished(true)
    }

    return (<>
        { !partOneFinished ?
            <Phase0Part0Component handleContinueButton={handlePart0Continue} testInfo={testInfo} testReceiver={testReceiver} />
            :
            <Phase0Part1Component handleContinueButton={handleContinueButton} testInfo={testInfo} testReceiver={testReceiver} />
        }
    </>)
};


// Shared drag-and-drop ranking UI
interface Phase0RankingListProps {
    initialQualities: Phase0QuestionType[];
    onContinue: (top3: string[]) => void;
    label: string;
}

const Phase0RankingList: React.FC<Phase0RankingListProps> = ({ initialQualities, onContinue, label }) => {
    const [qualities, setQualities] = useState<Phase0QuestionType[]>(initialQualities);
    const [nextPartEligible, setNextPartEligible] = useState(true);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const newQualities = Array.from(qualities);
        const [removed] = newQualities.splice(result.source.index, 1);
        newQualities.splice(result.destination.index, 0, removed);
        setQualities(newQualities);
        setNextPartEligible(true);
    };

    return (
        <>
            <div className={"mb-4"}>
                <TextEdgy className={"text-white"}>{label}</TextEdgy>
                <TextEdgy className="text-accent text-sm mt-2">Drag and drop to rank your top 3</TextEdgy>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="qualities-droppable">
                    {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`mx-auto min-h-[200px] max-w-sm w-full rounded-xl p-4 border-2 transition-colors duration-200
                                ${snapshot.isDraggingOver ? 'border-accent bg-secondary/30' : 'border-secondary bg-primary'}`}
                        >
                            {qualities.map((item, i) => (
                                <Draggable key={item.text} draggableId={item.text} index={i}>
                                    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`flex items-center mb-2 p-2 rounded-lg border-2 shadow cursor-grab transition-colors duration-200
                                                ${i < 3 ? 'bg-accent/80 border-accent text-primary font-bold ring-2 ring-accent' : 'bg-accent/25 border-accent'}
                                                ${snapshot.isDragging ? 'bg-accent/20 border-accent' : 'border-dashed'}
                                            `}
                                            style={{...provided.draggableProps.style, userSelect: 'none'}}
                                        >
                                            <span className={`mr-3 text-xl font-bold ${i < 3 ? 'text-primary' : 'text-accent'}`}>☰</span>
                                            <span className={`font-edgy text-lg ${i < 3 ? 'text-primary' : 'text-primary/80'}`}>{item.text}</span>
                                            {i < 3 && <span className="ml-2 px-2 py-1 rounded bg-primary text-accent text-xs font-bold">TOP {i+1}</span>}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {nextPartEligible &&
                <button className={"btn btn-secondary mt-4"} onClick={() => {
                    onContinue(qualities.slice(0, 3).map(q => q.text));
                }}>
                    <TextEdgy className={"text-white"}>Continue</TextEdgy>
                </button>
            }
        </>
    );
};

// Part0 component using the shared ranking UI


export default Phase0Component;

export { Phase0RankingList };
