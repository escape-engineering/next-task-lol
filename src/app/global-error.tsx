"use client";

import React from "react";

const GlobalError = ({ error }: { error: Error & { digest?: string } }) => {
    return (
        <html>
            <body>
                {/* <p>{JSON.stringify(error)}</p> */}
                <div>global-error</div>
            </body>
        </html>
    );
};

export default GlobalError;
