import React from "react";

export const Title = ({children}) => {
    return (
        <React.Fragment>
            <h1 className="text-2xl pb-4">
                {children}
            </h1>
        </React.Fragment>
    );
};




