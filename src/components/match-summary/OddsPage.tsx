import styles from "../../styles/components/match-summary/OddsPage.module.css"
import Image from "next/legacy/image";
import React, { useRef, useEffect, useState } from "react"
import DropdownSearch from "@components/ui/match-summary/DropdownSearch"
import OddsFilter from "@components/ui/match-summary/OddsFilter"
import OddForm from "@components/ui/match-summary/OddForm"
import { motion, AnimatePresence } from "framer-motion"
import { useDraggable } from "react-use-draggable-scroll";

const OddsPage: React.FC = () => {
    const [oddInProcess, setOddInProcess] = useState()
    const sliderRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(sliderRef);

    const createOdd = (key:any) => {
        if (oddInProcess)
        setOddInProcess(undefined)
        else
        setOddInProcess(key)
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.oddsFilter} {...events} ref={sliderRef}>
                <DropdownSearch 
                    items={[
                        {
                            id:'1', 
                            name:"bookmaker 1", 
                            image:"/images/bookmaker-placeholder-3.png"
                        },
                        {
                            id:'2', 
                            name:"bookmaker 2", 
                            image:"/images/bookmaker-placeholder-1.png"
                        }
                    ]} 
                    onSelect={(id) => {}}
                />
                <OddsFilter 
                    items={[
                        {
                            id:'1', 
                            name:"All"
                        },
                        {
                            id:'2', 
                            name:"Main"
                        },
                        {
                            id:'3', 
                            name:"Total"
                        },
                        {
                            id:'4', 
                            name:"Handicap"
                        },
                        {
                            id:'5', 
                            name:"Half"
                        },
                        {
                            id:'6', 
                            name:"Goals"
                        },
                        {
                            id:'7', 
                            name:"O/E"
                        },
                        {
                            id:'8', 
                            name:"BTS"
                        }
                    ]} 
                    onSelect={(id) => {}} 
                />
            </div>
            <div className={styles.oddsContent}>
                <AnimatePresence>
                    {oddInProcess && 
                        <OddForm setOpen={setOddInProcess} />
                    }
                </AnimatePresence>
                <div className={styles.oddsBlock}>
                    <span className={styles.oddsBlockTitle} style={{fontSize: '18px', lineHeight: '22px'}}>
                        Main
                    </span>
                    <div key={"1"} className={`${styles.odd} ${"1"==oddInProcess && styles.oddActive}`} onClick={() => createOdd("1")}>
                        <span>Some position</span>
                        <span>2.1</span>
                    </div>
                </div>
                <div className={styles.oddsBlock} aria-colcount={3}>
                    <span className={styles.oddsBlockTitle} style={{color: "rgba(26, 28, 33, 0.7)"}}>
                        Match result (regular time)
                    </span>
                    <div className={styles.odd}>
                        <span>Some position</span>
                        <span>2.1</span>
                    </div>
                    <div className={styles.odd}>
                        <span>Some position</span>
                        <span>2.1</span>
                    </div>
                    <div className={styles.odd}>
                        <span>Some position</span>
                        <span>2.1</span>
                    </div>
                </div>
                <div className={styles.oddsBlock} aria-colcount={2}>
                    <span className={styles.oddsBlockTitle} style={{color: "rgba(26, 28, 33, 0.7)"}}>
                        Pass method
                    </span>
                    <div className={styles.odd}>
                        <span>Some position</span>
                        <span>2.1</span>
                    </div>
                    <div className={styles.odd}>
                        <span>Some position</span>
                        <span>2.1</span>
                    </div>
                    <div className={styles.odd}>
                        <span>Some position</span>
                        <span>2.1</span>
                    </div>
                    <div className={styles.odd}>
                        <span>Some position</span>
                        <span>2.1</span>
                    </div>
                </div>
                <div className={styles.oddsBlock} aria-mobile="true" aria-colcount={3}>
                    <span className={styles.oddsBlockTitle}>
                        Total
                    </span>
                    <div className={styles.oddsColTitle}></div>
                    <div className={styles.oddsColTitle}>
                        More
                    </div>
                    <div className={styles.oddsColTitle}>
                        Less
                    </div>
                    <div className={styles.oddCondition}>
                        <span>2.1</span>
                    </div>
                    <div className={styles.oddValue}>
                        <span>2.1</span>
                    </div>
                    <div className={styles.oddValue}>
                        <span>2.1</span>
                    </div>
                    <div className={styles.oddCondition}>
                        <span>2.1</span>
                    </div>
                    <div className={styles.oddValue}>
                        <span>2.1</span>
                    </div>
                    <div className={styles.oddValue}>
                        <span>2.1</span>
                    </div>
                    <div className={styles.oddCondition}>
                        <span>2.1</span>
                    </div>
                    <div className={styles.oddValue}>
                        <span>2.1</span>
                    </div>
                    <div className={styles.oddValue}>
                        <span>2.1</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OddsPage