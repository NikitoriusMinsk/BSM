import React, { useRef, MouseEvent } from "react"
import styles from "../../../styles/pages/MatchSummary.module.css"
import { useDraggable } from "react-use-draggable-scroll";

interface PagesSliderProps {
    children: React.ReactNode
}

const PagesSlider:React.FC<PagesSliderProps> = ({children}) => {
    const sliderRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(sliderRef);

    return (
        <div className={styles.pageSelector} {...events} ref={sliderRef}>
            <div className={styles.pagesLine}>
                {children}
            </div>            
        </div>
    )
}

export default PagesSlider