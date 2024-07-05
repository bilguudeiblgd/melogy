import { useRouter } from 'next/router'
import {FC, useEffect, useState} from 'react';

interface formItemProps {
    question: number,
    // this value will only have 3 state. undefined, no, yes. This better be implemented with enums
    value: string
}

let initialForm : formItemProps[] = []
const numberOfQuestions = 2
for(let i = 0; i < numberOfQuestions; i++) {
    initialForm.push({question: i, value:"undefined"})
}

const DomePage : FC = () => {
    const [formData, setFormData] = useState<formItemProps[]>(initialForm);
    const router = useRouter();
    const receiver = router.query.user;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let tmpForArray = formData
        // #TODO improvement here!
        tmpForArray[parseInt(name)].value = value
        setFormData(tmpForArray);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("submitted: ", formData)
    };
    return (
        <div>
            <p>Test for {receiver && receiver}</p>
            <form onSubmit={handleSubmit}>
                <h2>Phase 1 Questions</h2>
                <div>
                    <label>They would furiously debate about the most random topic</label>
                    <input type="radio" name="0" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="0" value="no" onChange={handleChange}/> No
                </div>
                <div>
                    <label>They would drag you out to party</label>
                        <input type="radio" name="1" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="1" value="no" onChange={handleChange}/> No
                </div>
                <button type="submit">Next</button>
            </form>
        </div>

    )
}
export default DomePage;