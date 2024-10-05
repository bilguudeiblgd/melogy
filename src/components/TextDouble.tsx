// components/Text.tsx

import {ReactNode} from 'react';

interface TextProps {
    children: ReactNode;
    className?: string;
    anotherText: string;
}

const TextEdgy = ({children, className = '', anotherText}: TextProps) => {
    return <p className={`${className} font-edgy`}>{children}-{anotherText}</p>;
};

export default TextEdgy;
