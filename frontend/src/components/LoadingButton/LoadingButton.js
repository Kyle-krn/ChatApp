import React from "react";
import loaderSVG from './../../../static/img/loaderDots.svg';

export const LoadingButton = () => {
    return (
        <button className="btn disableButton">
            {/* <loaderSVG /> */}
            <object className="svgLoader" type="image/svg+xml" data={loaderSVG}>svg-animation</object>
        </button>
    )
}