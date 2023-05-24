import styles from "../../styles/components/match-summary/MatchSummaryPage.module.css"
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react"
import MatchFilter from "@components/ui/match-summary/MatchFilter";
import { useDraggable } from "react-use-draggable-scroll";
import { motion, AnimatePresence } from "framer-motion";
import StatBars from "@components/ui/StatBars";
import Lineup from "@components/ui/Lineup";

const MatchSummaryPage: React.FC = () => {
    const sliderRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(sliderRef);

    const [selectedTable, setSelectedTable] = useState('1')
    const [selectedTableComponent, setSelectedTableComponent] = useState(<SummaryTable />)

    const changeTable = (
        item: {
            id: string | number, 
            name: string
        }
    ) => {
        switch (item.id) {
            case '1':
                setSelectedTable('1')
                setSelectedTableComponent(<SummaryTable />)
                break;
            case '2':
                setSelectedTable('2')
                setSelectedTableComponent(<StatisticsTable />)
                break;
            case '3':
                setSelectedTable('3')
                setSelectedTableComponent(<LineupTable />)
                break;
        }
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.filter} {...events} ref={sliderRef}>
                <MatchFilter 
                    items={[
                        {
                            id:'1', 
                            name:"Summary"
                        },
                        {
                            id:'2', 
                            name:"Statistics"
                        },
                        {
                            id:'3', 
                            name:"Lineup"
                        }
                    ]} 
                    onSelect={changeTable}
                />
            </div>
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    key={selectedTable ? selectedTable : "empty"}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2, ease:'easeInOut' }}
                >
                    {selectedTableComponent}
                </motion.div>
            </AnimatePresence>            
        </div>
    )
}

const SummaryTable: React.FC = () => {
    return (
        <>
            <div className={styles.stageStat}>
                <div className={styles.stage}>
                    <span>
                        1ST HALF
                    </span>
                    <span>
                        0 - 0
                    </span>
                </div>
                <div className={styles.stageStat}>
                    <div className={styles.statLine}>
                        <span>
                            13'
                        </span>
                        <div>
                            ICON
                        </div>                    
                        <span>
                            Some Action
                        </span>
                    </div>
                    <div className={styles.statLine} style={{flexDirection:'row-reverse'}}>
                        <span>
                            26'
                        </span>
                        <div>
                            ICON
                        </div>                    
                        <span>
                            Some Action
                        </span>
                    </div>
                </div>                
                <div className={styles.stage}>
                    <span>
                        2ND HALF
                    </span>
                    <span>
                        0 - 0
                    </span>
                </div>
                <div className={styles.stageStat}>
                    <div className={styles.statLine}>
                        <span>
                            56'
                        </span>
                        <div>
                            ICON
                        </div>                    
                        <span>
                            Some Action
                        </span>
                    </div>
                    <div className={styles.statLine}>
                        <span>
                            56'
                        </span>
                        <div>
                            ICON
                        </div>                    
                        <span>
                            Some Action
                        </span>                   
                        <span style={{fontWeight:400}}>
                            Some Action
                        </span>
                    </div>
                    <div className={styles.statLine}>
                        <span>
                            56'
                        </span>
                        <div className={styles.iconWithText}>
                            <div>ICON</div>
                            1 - 0
                        </div>                    
                        <span>
                            Some Action
                        </span>
                    </div>
                    <div className={styles.statLine} style={{flexDirection:'row-reverse'}}>
                        <span>
                            78'
                        </span>
                        <div>
                            ICON
                        </div>                    
                        <span>
                            Some Action
                        </span>
                    </div>
                    <div className={styles.statLine} style={{flexDirection:'row-reverse'}}>
                        <span>
                            85'
                        </span>
                        <div className={styles.iconWithText} style={{flexDirection:'row-reverse'}}>
                            <div>ICON</div>
                            1 - 0
                        </div>                    
                        <span>
                            Some Action
                        </span>
                    </div>
                </div>                
            </div>
            <div className={styles.infoLink}>
                <span className={styles.infoTitle}>
                    Match Information
                </span>
                <span className={styles.infoUrl}>
                    <Image
                        src="/icons/pick.svg"
                        width={20}
                        height={20}
                        alt=""
                    />
                    WWK Arena (Augsburg)
                </span>
            </div>
        </>
    )
}

const StatisticsTable: React.FC = () => {
    return (
        <StatBars>
            <StatBars.Bar leftPercent={60} rightPercent={40} label={'Test'} />
            <StatBars.Bar leftPercent={60} rightPercent={40} label={'Test'} />
            <StatBars.Bar leftPercent={60} rightPercent={40} label={'Test'} />
            <StatBars.Bar leftPercent={60} rightPercent={40} label={'Test'} />
            <StatBars.Bar leftPercent={60} rightPercent={40} label={'Test'} />
            <StatBars.Bar leftPercent={60} rightPercent={40} label={'Test'} />
        </ StatBars>
    )
}

const Bar: React.FC<{leftPercent: number, rightPercent: number}> = ({leftPercent, rightPercent}) => {
    return (        
        <div className={styles.bar}>
            <div 
                className={`${styles.barStripe} ${(leftPercent-rightPercent) > 0 ? styles.win : ''}`} 
                style={{width:leftPercent+"%"}} 
            />
            <div 
                className={`${styles.barStripe} ${(rightPercent-leftPercent) > 0 ? styles.win : ''}`} 
                style={{width:rightPercent+"%"}} 
            />
        </div>
    )
}

const LineupTable: React.FC = () => {
    return (
        <Lineup>
            <Lineup.Squad title="Team 1" logoUrl="1">
                <Lineup.Player number={1} name="test" countryFlag='1' position="Keeper" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
            </Lineup.Squad>
            <Lineup.Squad title="Team 2" logoUrl="2">
                <Lineup.Player number={1} name="test" countryFlag='1' position="Keeper" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
            </Lineup.Squad>
        </Lineup>
    )
}

export default MatchSummaryPage