import React, {useEffect} from 'react';
import InApp from "detect-inapp";

const InAppBrowserWarning = () => {
    const openInBrowser = () => {
        const url = window.location.href;
        window.open(url, '_system'); // Opens the link in the device's default browser
    };
    useEffect(() => {
        const inapp = new InApp(navigator.userAgent || navigator.vendor)
        console.log(navigator.userAgent)
        console.log("inapp in app: ", inapp.isInApp)
    }, []);
    return (
        <div style={{padding: '10px', backgroundColor: '#f0f0f0', textAlign: 'center'}}>
            <p>You{"'"}re viewing this in the in-app browser.</p>
            <p>Please use actual browser.</p>
        </div>
    );
};

export default InAppBrowserWarning;