// components/Text.tsx

import { ReactNode } from 'react';

interface TextProps {
    children: ReactNode;
    className?: string;
}

const Text = ({ children, className = '' }: TextProps) => {
    return <p className={`${className} font-primary`}>{children}</p>;
};

export default Text;
