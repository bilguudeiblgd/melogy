// components/Text.tsx

import { ReactNode } from 'react';

interface TextProps {
    children: ReactNode;
    className?: string;
}

const TextEdgy = ({ children, className = '' }: TextProps) => {
    return <p className={`${className} font-edgy`}>{children}</p>;
};

export default TextEdgy;
