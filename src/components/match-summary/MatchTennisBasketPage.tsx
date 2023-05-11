import styles from "../../styles/components/match-summary/MatchTennisBasketPage.module.css"
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react"
import MatchFilter from "@components/ui/match-summary/MatchFilter";
import { useDraggable } from "react-use-draggable-scroll";
import { motion, AnimatePresence } from "framer-motion";

const MatchTennisBasketPage: React.FC<{type: string}> = ({type}) => {
    const sliderRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(sliderRef);

    const [selectedTable, setSelectedTable] = useState('1')
    const [selectedTableComponent, setSelectedTableComponent] = useState(<SummaryTable type={type} />)

    const changeTable = (
        item: {
            id: string | number, 
            name: string
        }
    ) => {
        switch (item.id) {
            case '1':
                setSelectedTable('1')
                setSelectedTableComponent(<SummaryTable type={type} />)
                break;
            case '2':
                setSelectedTable('2')
                setSelectedTableComponent(<StatsTable />)
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
                    items={type=='tennis' ? [
                        {
                            id:'1', 
                            name:"Summary"
                        },
                        {
                            id:'2', 
                            name:"Statistics"
                        }
                    ]
                    :
                    [
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
                    ]
                    } 
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

const SummaryTable: React.FC<{type: string}> = ({type}) => {
    if (type=='tennis')
    return (
        <div className={styles.summaryContainer}>
            <table className={styles.tableSummary} cellSpacing={0}>
                <colgroup>
                    <col width="" />
                    <col width="45" />
                    <col width="45" />
                    <col width="45" />
                    <col width="45" />
                </colgroup>
                <thead>
                    <tr className={styles.header}>
                        <th>
                            Score
                        </th>
                        <th>
                        </th>
                        <th>
                        </th>
                        <th>
                        </th>
                        <th>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.player}>
                                <Image 
                                    src={'/icons/wide-flags/es.png'}
                                    width={30}
                                    height={22}
                                    alt=""
                                    style={{objectFit:'contain'}}
                                />
                                <span>
                                    Player name
                                </span>
                            </div>
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.player}>
                                <Image 
                                    src={'/icons/wide-flags/es.png'}
                                    width={30}
                                    height={22}
                                    alt=""
                                    style={{objectFit:'contain'}}
                                />
                                <span>
                                    Player name
                                </span>
                            </div>
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1
                        </td>
                    </tr>
                    <tr className={styles.timeRow}>
                        <td>
                            MATCH TIME:
                        </td>
                        <td>
                            1:00
                        </td>
                        <td>
                            1:00
                        </td>
                        <td>
                            1:00
                        </td>
                        <td>
                            1:00
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className={styles.bookmakersTable} cellSpacing={0}>
                <colgroup>
                    <col width="" />
                    <col width="125" />
                    <col width="125" />
                    <col width="125" />
                </colgroup>
                <thead>
                    <tr className={styles.header}>
                        <th>
                            Pre-match Odds
                        </th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={styles.bookmaker}>
                        <td>
                            <div className={styles.logo}>
                                <Image 
                                    src="/images/bookmaker-placeholder-3.png"
                                    width={130}
                                    height={40}
                                    style={{objectFit:'contain',objectPosition:"center center"}}
                                    alt=""
                                />
                            </div>                            
                        </td>
                        <td>
                            <div className={styles.bet}>
                                <span>
                                    1
                                </span>
                                <div className={styles.centerArrow}>
                                    <Image 
                                        src="/icons/arrow-narrow-up.svg"
                                        width={24}
                                        height={24}
                                        style={{objectFit:'contain',objectPosition:"center center"}}
                                        alt=""
                                    />
                                </div>                            
                                <span>
                                    3.22
                                </span>
                            </div>                            
                        </td>
                        <td>
                            <div className={styles.bet}>
                                <span>
                                    X
                                </span>
                                <div className={styles.centerArrow}>

                                </div>                            
                                <span>
                                    3.22
                                </span>
                            </div>
                        </td>
                        <td>
                            <div className={styles.bet}>
                                <span>
                                    2
                                </span>
                                <div className={styles.centerArrow}>
                                    <Image 
                                        src="/icons/arrow-narrow-down.svg"
                                        width={24}
                                        height={24}
                                        style={{objectFit:'contain',objectPosition:"center center"}}
                                        alt=""
                                    />
                                </div>                            
                                <span>
                                    3.22
                                </span>
                            </div>
                        </td>
                    </tr>
                    <tr className={styles.bookmaker}>
                        <td>
                            <div className={styles.logo}>
                                <Image 
                                    src="/images/bookmaker-placeholder-3.png"
                                    width={130}
                                    height={40}
                                    style={{objectFit:'contain',objectPosition:"center center"}}
                                    alt=""
                                />
                            </div>                            
                        </td>
                        <td>
                            <div className={styles.bet}>
                                <span>
                                    1
                                </span>
                                <div className={styles.centerArrow}>
                                    <Image 
                                        src="/icons/arrow-narrow-up.svg"
                                        width={24}
                                        height={24}
                                        style={{objectFit:'contain',objectPosition:"center center"}}
                                        alt=""
                                    />
                                </div>                            
                                <span>
                                    3.22
                                </span>
                            </div>                            
                        </td>
                        <td>
                            <div className={styles.bet}>
                                <span>
                                    X
                                </span>
                                <div className={styles.centerArrow}>

                                </div>                            
                                <span>
                                    3.22
                                </span>
                            </div>
                        </td>
                        <td>
                            <div className={styles.bet}>
                                <span>
                                    2
                                </span>
                                <div className={styles.centerArrow}>
                                    <Image 
                                        src="/icons/arrow-narrow-down.svg"
                                        width={24}
                                        height={24}
                                        style={{objectFit:'contain',objectPosition:"center center"}}
                                        alt=""
                                    />
                                </div>                            
                                <span>
                                    3.22
                                </span>
                            </div>
                        </td>
                    </tr>
                    <tr className={styles.bookmaker}>
                        <td>
                            <div className={styles.logo}>
                                <Image 
                                    src="/images/bookmaker-placeholder-3.png"
                                    width={130}
                                    height={40}
                                    style={{objectFit:'contain',objectPosition:"center center"}}
                                    alt=""
                                />
                            </div>                            
                        </td>
                        <td>
                            <div className={styles.bet}>
                                <span>
                                    1
                                </span>
                                <div className={styles.centerArrow}>
                                    <Image 
                                        src="/icons/arrow-narrow-up.svg"
                                        width={24}
                                        height={24}
                                        style={{objectFit:'contain',objectPosition:"center center"}}
                                        alt=""
                                    />
                                </div>                            
                                <span>
                                    3.22
                                </span>
                            </div>                            
                        </td>
                        <td>
                            <div className={styles.bet}>
                                <span>
                                    X
                                </span>
                                <div className={styles.centerArrow}>

                                </div>                            
                                <span>
                                    3.22
                                </span>
                            </div>
                        </td>
                        <td>
                            <div className={styles.bet}>
                                <span>
                                    2
                                </span>
                                <div className={styles.centerArrow}>
                                    <Image 
                                        src="/icons/arrow-narrow-down.svg"
                                        width={24}
                                        height={24}
                                        style={{objectFit:'contain',objectPosition:"center center"}}
                                        alt=""
                                    />
                                </div>                            
                                <span>
                                    3.22
                                </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
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
        </div>
    )
    if (type=='basketball')
    return (
        <div className={styles.summaryContainer}>
            <table className={styles.tableSummary} cellSpacing={0}>
                <colgroup>
                    <col width="" />
                    <col width="30" />
                    <col width="30" />
                    <col width="30" />
                    <col width="30" />
                    <col width="30" />
                </colgroup>
                <thead>
                    <tr className={styles.header}>
                        <th>
                            Score
                        </th>
                        <th>
                        </th>
                        <th>
                        </th>
                        <th>
                        </th>
                        <th>
                        </th>
                        <th>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.player}>
                                <span>
                                    Team name
                                </span>
                            </div>
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.player}>
                                <span>
                                    Team name
                                </span>
                            </div>
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            1
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.playerStats}>
                <span className={styles.playerStatTitle}>Player statistics</span>
                <table className={styles.tableSummary} cellSpacing={0}>
                    <colgroup>
                        <col width="" />
                        <col width="50" />
                        <col width="50" />
                        <col width="50" />
                        <col width="50" />
                        <col width="50" />
                        <col width="50" />
                        <col width="50" />
                        <col width="50" />
                        <col width="50" />
                        <col width="50" />
                        <col width="50" />
                        <col width="50" />
                        <col width="50" />
                        <col width="50" />
                    </colgroup>
                    <thead>
                        <tr className={styles.header}>
                            <th>
                                Player
                            </th>
                            <th>
                                Team
                            </th>
                            <th>
                                PTS
                            </th>
                            <th>
                                REB
                            </th>
                            <th>
                                AST
                            </th>
                            <th>
                                MIN
                            </th>
                            <th>
                                FGM
                            </th>
                            <th>
                                FGA
                            </th>
                            <th>
                                2PM
                            </th>
                            <th>
                                2PA
                            </th>
                            <th>
                                3PM
                            </th>
                            <th>
                                3PA
                            </th>
                            <th>
                                FTM
                            </th>
                            <th>
                                FTA
                            </th>
                            <th>
                                +/-
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className={styles.player}>
                                    <Image 
                                        src={'/icons/wide-flags/es.png'}
                                        width={30}
                                        height={22}
                                        alt=""
                                        style={{objectFit:'contain'}}
                                    />
                                    <span>
                                        Player name
                                    </span>
                                </div>
                            </td>
                            <td>
                                Team
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={styles.player}>
                                    <Image 
                                        src={'/icons/wide-flags/es.png'}
                                        width={30}
                                        height={22}
                                        alt=""
                                        style={{objectFit:'contain'}}
                                    />
                                    <span>
                                        Player name
                                    </span>
                                </div>
                            </td>
                            <td>
                                Team
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={styles.player}>
                                    <Image 
                                        src={'/icons/wide-flags/es.png'}
                                        width={30}
                                        height={22}
                                        alt=""
                                        style={{objectFit:'contain'}}
                                    />
                                    <span>
                                        Player name
                                    </span>
                                </div>
                            </td>
                            <td>
                                Team
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={styles.player}>
                                    <Image 
                                        src={'/icons/wide-flags/es.png'}
                                        width={30}
                                        height={22}
                                        alt=""
                                        style={{objectFit:'contain'}}
                                    />
                                    <span>
                                        Player name
                                    </span>
                                </div>
                            </td>
                            <td>
                                Team
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <table className={styles.bookmakersTable} cellSpacing={0}>
                <colgroup>
                    <col width="" />
                    <col width="125" />
                    <col width="125" />
                    <col width="125" />
                </colgroup>
                <thead>
                    <tr className={styles.header}>
                        <th>
                            Pre-match Odds
                        </th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={styles.bookmaker}>
                        <td>
                            <div className={styles.logo}>
                                <Image 
                                    src="/images/bookmaker-placeholder-3.png"
                                    width={130}
                                    height={40}
                                    style={{objectFit:'contain',objectPosition:"center center"}}
                                    alt=""
                                />
                            </div>                            
                        </td>
                        <td>
                            <div className={styles.bet}>
                                <span>
                                    1
                                </span>
                                <div className={styles.centerArrow}>
                                    <Image 
                                        src="/icons/arrow-narrow-up.svg"
                                        width={24}
                                        height={24}
                                        style={{objectFit:'contain',objectPosition:"center center"}}
                                        alt=""
                                    />
                                </div>                            
                                <span>
                                    3.22
                                </span>
                            </div>                            
                        </td>
                        <td>
                            <div className={styles.bet}>
                                <span>
                                    X
                                </span>
                                <div className={styles.centerArrow}>

                                </div>                            
                                <span>
                                    3.22
                                </span>
                            </div>
                        </td>
                        <td>
                            <div className={styles.bet}>
                                <span>
                                    2
                                </span>
                                <div className={styles.centerArrow}>
                                    <Image 
                                        src="/icons/arrow-narrow-down.svg"
                                        width={24}
                                        height={24}
                                        style={{objectFit:'contain',objectPosition:"center center"}}
                                        alt=""
                                    />
                                </div>                            
                                <span>
                                    3.22
                                </span>
                            </div>
                        </td>
                    </tr>
                    <tr className={styles.bookmaker}>
                        <td>
                            <div className={styles.logo}>
                                <Image 
                                    src="/images/bookmaker-placeholder-3.png"
                                    width={130}
                                    height={40}
                                    style={{objectFit:'contain',objectPosition:"center center"}}
                                    alt=""
                                />
                            </div>                            
                        </td>
                        <td>
                            <div className={styles.bet}>
                                <span>
                                    1
                                </span>
                                <div className={styles.centerArrow}>
                                    <Image 
                                        src="/icons/arrow-narrow-up.svg"
                                        width={24}
                                        height={24}
                                        style={{objectFit:'contain',objectPosition:"center center"}}
                                        alt=""
                                    />
                                </div>                            
                                <span>
                                    3.22
                                </span>
                            </div>                            
                        </td>
                        <td>
                            <div className={styles.bet}>
                                <span>
                                    X
                                </span>
                                <div className={styles.centerArrow}>

                                </div>                            
                                <span>
                                    3.22
                                </span>
                            </div>
                        </td>
                        <td>
                            <div className={styles.bet}>
                                <span>
                                    2
                                </span>
                                <div className={styles.centerArrow}>
                                    <Image 
                                        src="/icons/arrow-narrow-down.svg"
                                        width={24}
                                        height={24}
                                        style={{objectFit:'contain',objectPosition:"center center"}}
                                        alt=""
                                    />
                                </div>                            
                                <span>
                                    3.22
                                </span>
                            </div>
                        </td>
                    </tr>
                    <tr className={styles.bookmaker}>
                        <td>
                            <div className={styles.logo}>
                                <Image 
                                    src="/images/bookmaker-placeholder-3.png"
                                    width={130}
                                    height={40}
                                    style={{objectFit:'contain',objectPosition:"center center"}}
                                    alt=""
                                />
                            </div>                            
                        </td>
                        <td>
                            <div className={styles.bet}>
                                <span>
                                    1
                                </span>
                                <div className={styles.centerArrow}>
                                    <Image 
                                        src="/icons/arrow-narrow-up.svg"
                                        width={24}
                                        height={24}
                                        style={{objectFit:'contain',objectPosition:"center center"}}
                                        alt=""
                                    />
                                </div>                            
                                <span>
                                    3.22
                                </span>
                            </div>                            
                        </td>
                        <td>
                            <div className={styles.bet}>
                                <span>
                                    X
                                </span>
                                <div className={styles.centerArrow}>

                                </div>                            
                                <span>
                                    3.22
                                </span>
                            </div>
                        </td>
                        <td>
                            <div className={styles.bet}>
                                <span>
                                    2
                                </span>
                                <div className={styles.centerArrow}>
                                    <Image 
                                        src="/icons/arrow-narrow-down.svg"
                                        width={24}
                                        height={24}
                                        style={{objectFit:'contain',objectPosition:"center center"}}
                                        alt=""
                                    />
                                </div>                            
                                <span>
                                    3.22
                                </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
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
        </div>
    )
    return (
        <></>
    )
}

const StatsTable: React.FC = () => {
    return (
        <div className={styles.statBarsBlock}>
            <span className={styles.statBarBlockTitle}>
                Block title
            </span>
            <div className={styles.barBlock}>
                <div className={styles.barInfo}>
                    <span>
                        3.11
                    </span>
                    <span className={styles.centerBarTitle}>
                        Expected Goals
                    </span>
                    <span>
                        0.51
                    </span>
                </div>
                <Bar 
                    leftPercent={65}
                    rightPercent={35}
                />                
            </div>
            <div className={styles.barBlock}>
                <div className={styles.barInfo}>
                    <span>
                        3.11
                    </span>
                    <span className={styles.centerBarTitle}>
                        Expected Goals
                    </span>
                    <span>
                        0.51
                    </span>
                </div>
                <Bar 
                    leftPercent={65}
                    rightPercent={35}
                />                
            </div>
            <div className={styles.barBlock}>
                <div className={styles.barInfo}>
                    <span>
                        3.11
                    </span>
                    <span className={styles.centerBarTitle}>
                        Expected Goals
                    </span>
                    <span>
                        0.51
                    </span>
                </div>
                <Bar 
                    leftPercent={65}
                    rightPercent={35}
                />                
            </div>
            <div className={styles.barBlock}>
                <div className={styles.barInfo}>
                    <span>
                        3.11
                    </span>
                    <span className={styles.centerBarTitle}>
                        Expected Goals
                    </span>
                    <span>
                        0.51
                    </span>
                </div>
                <Bar 
                    leftPercent={65}
                    rightPercent={35}
                />                
            </div>
            <div className={styles.barBlock}>
                <div className={styles.barInfo}>
                    <span>
                        3.11
                    </span>
                    <span className={styles.centerBarTitle}>
                        Expected Goals
                    </span>
                    <span>
                        0.51
                    </span>
                </div>
                <Bar 
                    leftPercent={65}
                    rightPercent={35}
                />                
            </div>
            <span className={styles.statBarBlockTitle}>
                Block title
            </span>
            <div className={styles.barBlock}>
                <div className={styles.barInfo}>
                    <span>
                        3.11
                    </span>
                    <span className={styles.centerBarTitle}>
                        Expected Goals
                    </span>
                    <span>
                        0.51
                    </span>
                </div>
                <Bar 
                    leftPercent={65}
                    rightPercent={35}
                />                
            </div>
            <div className={styles.barBlock}>
                <div className={styles.barInfo}>
                    <span>
                        3.11
                    </span>
                    <span className={styles.centerBarTitle}>
                        Expected Goals
                    </span>
                    <span>
                        0.51
                    </span>
                </div>
                <Bar 
                    leftPercent={65}
                    rightPercent={35}
                />                
            </div>
            <div className={styles.barBlock}>
                <div className={styles.barInfo}>
                    <span>
                        3.11
                    </span>
                    <span className={styles.centerBarTitle}>
                        Expected Goals
                    </span>
                    <span>
                        0.51
                    </span>
                </div>
                <Bar 
                    leftPercent={65}
                    rightPercent={35}
                />                
            </div>
            <div className={styles.barBlock}>
                <div className={styles.barInfo}>
                    <span>
                        3.11
                    </span>
                    <span className={styles.centerBarTitle}>
                        Expected Goals
                    </span>
                    <span>
                        0.51
                    </span>
                </div>
                <Bar 
                    leftPercent={65}
                    rightPercent={35}
                />                
            </div>
            <div className={styles.barBlock}>
                <div className={styles.barInfo}>
                    <span>
                        3.11
                    </span>
                    <span className={styles.centerBarTitle}>
                        Expected Goals
                    </span>
                    <span>
                        0.51
                    </span>
                </div>
                <Bar 
                    leftPercent={65}
                    rightPercent={35}
                />                
            </div>
        </div>
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
        <div className={styles.lineupBlock}>
            <div className={styles.squadBlock}>
                <div className={styles.squadHeader}>
                    <div className={styles.squadTeam}>
                        <Image 
                            src={'/images/team-1-placeholder.svg'}
                            width={32}
                            height={32}
                            alt=""
                            style={{objectFit:'contain'}}
                        />
                        <span>
                            Team 1
                        </span>
                    </div>
                </div>
                <div className={styles.squad}>
                    <span className={styles.squadTitle}>
                        Starting lineup
                    </span>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/yellow-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                1
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Keeper
                            </span>
                            <span className={styles.playerName}>
                                Ederson
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/es.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/gray-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                2
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Defender
                            </span>
                            <span className={styles.playerName}>
                                John Stones
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/ar.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/gray-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                3
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Defender
                            </span>
                            <span className={styles.playerName}>
                                Ruben Dias
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/al.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/gray-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                4
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Defender
                            </span>
                            <span className={styles.playerName}>
                                Kyle Walker
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/af.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/gray-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                2
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Defender
                            </span>
                            <span className={styles.playerName}>
                                John Stones
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/ar.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                    <span className={styles.squadTitle}>
                        Subtistutes
                    </span>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/gray-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                3
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Defender
                            </span>
                            <span className={styles.playerName}>
                                Ruben Dias
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/al.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/gray-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                4
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Defender
                            </span>
                            <span className={styles.playerName}>
                                Kyle Walker
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/af.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/gray-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                2
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Defender
                            </span>
                            <span className={styles.playerName}>
                                John Stones
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/ar.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/gray-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                3
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Defender
                            </span>
                            <span className={styles.playerName}>
                                Ruben Dias
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/al.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/gray-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                4
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Defender
                            </span>
                            <span className={styles.playerName}>
                                Kyle Walker
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/af.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.squadBlock}>
                <div className={styles.squadHeader}>
                    <div className={styles.squadTeam}>
                        <Image 
                            src={'/images/team-1-placeholder.svg'}
                            width={32}
                            height={32}
                            alt=""
                            style={{objectFit:'contain'}}
                        />
                        <span>
                            Team 1
                        </span>
                    </div>
                </div>
                <div className={styles.squad}>
                    <span className={styles.squadTitle}>
                        Starting lineup
                    </span>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/yellow-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                1
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Keeper
                            </span>
                            <span className={styles.playerName}>
                                Ederson
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/es.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/gray-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                2
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Defender
                            </span>
                            <span className={styles.playerName}>
                                John Stones
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/ar.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/gray-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                3
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Defender
                            </span>
                            <span className={styles.playerName}>
                                Ruben Dias
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/al.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/gray-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                4
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Defender
                            </span>
                            <span className={styles.playerName}>
                                Kyle Walker
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/af.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/gray-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                2
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Defender
                            </span>
                            <span className={styles.playerName}>
                                John Stones
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/ar.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                    <span className={styles.squadTitle}>
                        Subtistutes
                    </span>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/gray-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                3
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Defender
                            </span>
                            <span className={styles.playerName}>
                                Ruben Dias
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/al.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/gray-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                4
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Defender
                            </span>
                            <span className={styles.playerName}>
                                Kyle Walker
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/af.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/gray-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                2
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Defender
                            </span>
                            <span className={styles.playerName}>
                                John Stones
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/ar.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/gray-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                3
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Defender
                            </span>
                            <span className={styles.playerName}>
                                Ruben Dias
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/al.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                    <div className={styles.player}>
                        <div className={styles.shirt}>
                            <Image 
                                src={'/icons/gray-shirt.png'}
                                width={32}
                                height={32}
                                alt=""
                                style={{objectFit:'contain', position:'absolute', left:0, top:0}}
                            />
                            <span>
                                4
                            </span>                            
                        </div>
                        <div className={styles.playerInfo}>
                            <span className={styles.playerPos}>
                                Defender
                            </span>
                            <span className={styles.playerName}>
                                Kyle Walker
                            </span>
                        </div>
                        <div className={styles.flag}>
                            <Image 
                                src={'/icons/wide-flags/af.png'}
                                width={30}
                                height={22}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchTennisBasketPage