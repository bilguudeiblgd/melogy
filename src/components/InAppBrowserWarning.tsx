import React from 'react';
import { useRouter } from 'next/router';

const InAppBrowserWarning = () => {
    const router = useRouter();
    const openInBrowser = () => {
        const url = window.location.href;
        window.open(url, '_system'); // Opens the link in the device's default browser
    };

    return (
        <div className={"flex flex-col items-center justify-center"} style={{padding: '10px', backgroundColor: '#f0f0f0', textAlign: 'center'}}>
            <p>You{"'"}re viewing this in the in-app browser.</p>
            <p>Please use actual browser.</p>
            <a target="_blank" href={router.asPath} className="btn btn-secondary mt-4">Open in browser</a>
        </div>
    );
};

export default InAppBrowserWarning;