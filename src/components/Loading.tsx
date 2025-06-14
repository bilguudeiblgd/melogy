// components/Loading.tsx
import React from 'react';
import TextEdgy from "@/components/TextEdgy";

const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <span className="loading loading-ring loading-lg text-primary"></span>
                <TextEdgy className="mt-4 text-lg text-accent font-medium">Loading...</TextEdgy>
            </div>
        </div>
    );
};

export default Loading;
