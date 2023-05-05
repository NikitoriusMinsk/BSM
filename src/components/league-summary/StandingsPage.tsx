import styles from "../../styles/components/league-summary/StandingsPage.module.css"
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react"
import StandingsFilter from "@components/ui/match-summary/StandingsFilter"
import { motion, AnimatePresence } from "framer-motion"
import useWindowSize from "src/utils/useWindowSize";
import StandigsMenuColumn from "@components/ui/match-summary/StandingsMenuColumn";
import Dropdown from "@components/ui/Dropdown";

const StandingsPage: React.FC = () => {
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
            case '5':
                setSelectedTable('5')
                setSelectedTableComponent(<TopScorersTable />)
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
                            name:"Standings"
                        },
                        {
                            id:'2', 
                            name:"Forms"
                        },
                        {
                            id:'3', 
                            name:"Over/Under"
                        },
                        {
                            id:'4', 
                            name:"HT/FT"
                        },
                        {
                            id:'5', 
                            name:"Top Scorers"
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
                    transition={{ duration: 0.2 }}
                >
                    {selectedTableComponent}
                </motion.div>
            </AnimatePresence>
        </div>
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
                                            objectFit="contain"
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
                    <col width="50" />
                    <col width="60" />
                </colgroup>
                <thead>
                    <tr>
                        <th>#</th>
                        <th className={styles.teamHead}>Team</th>
                        <th>MP</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>G</th>
                        <th className={styles.boldCell}>PTS</th>
                        <th></th>
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
                                            objectFit="contain"
                                        />
                                    </div>
                                    Team Name
                                </span>
                            </td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
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

const TopScorersTable: React.FC = () => {
    return (
        <div className={styles.topScorers}>
            <div className={styles.scorersFilter}>
                <Dropdown
			    	items={[]}
			    	onSelect={() => {}}
			    	label="Team"
			    	searchable={true}
			    />
                <Dropdown
			    	items={[]}
			    	onSelect={() => {}}
			    	label="Position"
			    	searchable={true}
			    />
                <Dropdown
			    	items={[]}
			    	onSelect={() => {}}
			    	label="Nationality"
			    	searchable={true}
			    />
            </div>
            <table 
                className={styles.topScorersTable} 
                cellPadding={10} 
                cellSpacing={0}
            >
                <colgroup>
                    <col width="50" />
                    <col width="" />
                    <col width="" />
                    <col width="50" />
                    <col width="50" />
                </colgroup>
                <thead>
                    <tr>
                        <th>#</th>
                        <th className={styles.teamHead}>Player</th>
                        <th>Team</th>
                        <th>G</th>
                        <th>A</th>
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
                                            objectFit="contain"
                                        />
                                    </div>
                                    Team Name
                                </span>
                            </td>
                            <td>Club name</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                    ))}                    
                </tbody>               
            </table>
        </div>
    )
}

export default StandingsPage