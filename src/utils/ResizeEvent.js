import React, { useState } from 'react';
import { СardScreenParams } from './constants';

function ResizeEvent() {
    const [windowWidth, setWindowWidth] = useState(window.screen.availWidth);

    let drawingСards;
    let moreCountCards;
    let { cardsOnScreenSize1280, cardsAddScreenSize1280,
        cardsOnScreenSize768, cardsAddScreenSize768,
        cardsOnScreenSize480 } = СardScreenParams;

    if (windowWidth >= 768) {
        drawingСards = cardsOnScreenSize1280;
        moreCountCards = cardsAddScreenSize1280;
    } else if (windowWidth <= 768 && windowWidth > 480) {
        drawingСards = cardsOnScreenSize768;
        moreCountCards = cardsAddScreenSize768;
    } else {
        drawingСards = cardsOnScreenSize480;
        moreCountCards = cardsAddScreenSize768;
    }

    (function () {
        window.addEventListener("resize", resizeThrottler, false);

        var resizeTimeout;
        function resizeThrottler() {
            if (!resizeTimeout) {
                resizeTimeout = setTimeout(function () {
                    resizeTimeout = null;
                    actualResizeHandler();
                }, 66);
            }
        }

        function actualResizeHandler() {
            setWindowWidth(window.screen.availWidth);
        }
    }());

    return { drawingСards, moreCountCards }

}

export default ResizeEvent;