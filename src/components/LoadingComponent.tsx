// components/Loading.tsx
import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="mt-4 text-lg font-medium">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;
