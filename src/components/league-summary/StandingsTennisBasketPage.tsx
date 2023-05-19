import styles from "../../styles/components/league-summary/StandingsTennisBasketPage.module.css"
import Image from "next/image";
import React, { useEffect, useState } from "react"
import StandingsFilter from "@components/ui/match-summary/StandingsFilter"
import { motion, AnimatePresence } from "framer-motion"
import useWindowSize from "src/utils/useWindowSize";
import StandigsMenuColumn from "@components/ui/match-summary/StandingsMenuColumn";
import PlayoffBracket from "@components/ui/league-summary/PlayoffBracket";

const StandingsTennisBasketPage: React.FC = () => {
    const [selectedTable, setSelectedTable] = useState('1')
    const [selectedTableComponent, setSelectedTableComponent] = useState(<MainTable />)

    const changeTable = (
        item: {
            id: string | number, 
            name: string
        }
    ) => {
        switch (item.id) {
            case '1':
                setSelectedTable('1')
                setSelectedTableComponent(<MainTable />)
                break;
            case '2':
                setSelectedTable('2')
                setSelectedTableComponent(<PlayoffsTable />)
                break;
        }
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.filter}>
                <StandingsFilter 
                    items={[
                        {
                            id:'1', 
                            name:"Main"
                        },
                        {
                            id:'2', 
                            name:"Playoffs"
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

const MainTable: React.FC = () => {
    const [selectedTable, setSelectedTable] = useState('1')
    const [selectedTableComponent, setSelectedTableComponent] = useState(<StandingsTable />)

    const changeTable = (
        item: {
            id: string | number, 
            name: string
        }
    ) => {
        switch (item.id) {
            case '1':
                setSelectedTable('1')
                setSelectedTableComponent(<StandingsTable />)
                break;
            case '2':
                setSelectedTable('2')
                setSelectedTableComponent(<FormTable />)
                break;
        }
    }

    return (
        <>
        <div className={styles.filtersInside}>
            <StandingsFilter 
                items={[
                    {
                        id:'1', 
                        name:"Standings"
                    },
                    {
                        id:'2', 
                        name:"Form"
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
        </>
    )    
}

const PlayoffsTable: React.FC = () => {

    return (
        <PlayoffBracket />
    )    
}

const StandingsTable: React.FC = () => {
    const { width } = useWindowSize()
    const [selectedCol, setSelectedCol] = useState<{ value: string, id: string }>()

    return (
        <>
        {width <= 600 ? 
            <table 
                className={styles.standingsTable} 
                cellPadding={10} 
                cellSpacing={0}
            >
                <colgroup>
                    <col width="25" />
                    <col width="50%" />
                    <col width="50%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>#</th>
                        <th className={styles.teamHead}>Team</th>
                        <th>
                            <StandigsMenuColumn
                                items={[{id:'1', value:'MP'}, {id:'2', value:'Wins'}, {id:'3', value:'Draws'}, {id:'4', value:'Loses'}]}
                                onSelect={setSelectedCol}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {[1,1,1,1,1,1,1,1,1].map((item,index) => (
                        <tr key={index}>
                            <td>1</td>
                            <td className={styles.teamCell}>
                                <span>
                                    <div className={styles.teamLogo}>
                                        <Image 
                                            src="/testimg/club1.png"
                                            width={20}
                                            height={20}
                                            style={{objectFit:'contain'}}
                                            alt=""
                                        />
                                    </div>
                                    Team Name
                                </span>
                            </td>
                            <td>selected</td>
                        </tr>
                    ))}                    
                </tbody>               
            </table>
            :
            <table 
                className={styles.standingsTable} 
                cellPadding={10} 
                cellSpacing={0}
            >
                <colgroup>
                    <col width="50" />
                    <col width="" />
                    <col width="50" />
                    <col width="50" />
                    <col width="50" />
                    <col width="50" />
                    <col width="50" />
                    <col width="60" />
                </colgroup>
                <thead>
                    <tr>
                        <th>#</th>
                        <th className={styles.teamHead}>Team</th>
                        <th>MP</th>
                        <th>W</th>
                        <th>L</th>
                        <th>TP</th>
                        <th className={styles.boldCell}>PTS</th>
                        <th>Form</th>
                    </tr>
                </thead>
                <tbody>
                    {[1,1,1,1,1,1,1,1,1].map((item,index) => (
                        <tr key={index}>
                            <td>1</td>
                            <td className={styles.teamCell}>
                                <span>
                                    <div className={styles.teamLogo}>
                                        <Image 
                                            src="/testimg/club1.png"
                                            width={20}
                                            height={20}
                                            style={{objectFit:'contain'}}
                                            alt=""
                                        />
                                    </div>
                                    Team Name
                                </span>
                            </td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>22:11</td>
                            <td>1</td>
                            <td>
                                <div className={styles.questionBox}>
                                    ?
                                </div>
                            </td>
                        </tr>
                    ))}                    
                </tbody>               
            </table>
        }
        </>
    )
}

const FormTable: React.FC = () => {
    const { width } = useWindowSize()
    
    return (
        <>
        
        </>
    )
}

export default StandingsTennisBasketPage