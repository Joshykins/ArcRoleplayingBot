import * as React from 'react';
import './loader.scss'

export const Loader: React.FunctionComponent = () => {
    let loaderOpen = false;

    const [open, setLoader] = React.useState(false);


    return (
        <>
            <div className={`loader${open ? " open" : ""}`}>
                Loading
            </div>
        </>
    )
}