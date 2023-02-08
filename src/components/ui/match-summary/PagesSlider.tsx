import React, { createRef, MouseEvent } from "react"
import styles from "../../../styles/pages/MatchSummary.module.css"

interface PagesSliderProps {
    children: React.ReactNode
}

interface posProps {
    left: number
    x: number
}

const PagesSlider:React.FC<PagesSliderProps> = ({children}) => {
    const sliderRef = createRef<HTMLDivElement>();
    let pos:posProps = { left: 0, x: 0 };

    const mouseDownHandler = function (e: MouseEvent<HTMLDivElement>) {
        pos = {
            // The current scroll
            left: sliderRef.current?.scrollLeft || 0,
            // Get the current mouse position
            x: e.clientX,
        };
        // sliderRef.current?.style.userSelect = 'none';
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
        // e.currentTarget.style.pointerEvents = 'none'
    };

    const mouseMoveHandler = function (e: any) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        // Scroll the element
        if (sliderRef && sliderRef.current)
        sliderRef.current!.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function () {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler); 
    }

    return (
        <div className={styles.pageSelector} onMouseDown={mouseDownHandler} ref={sliderRef}>
            <div className={styles.pagesLine}>
                {children}
            </div>            
        </div>
    )
}

export default PagesSlider