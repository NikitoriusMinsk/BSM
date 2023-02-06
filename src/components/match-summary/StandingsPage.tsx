import styles from "../../styles/components/match-summary/StandingsPage.module.css"
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react"
import StandingsFilter from "@components/ui/match-summary/StandingsFilter"
import { motion } from "framer-motion"

const StandingsPage: React.FC = () => {
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
                            name:"Form"
                        },
                        {
                            id:'3', 
                            name:"Over/Under"
                        },
                        {
                            id:'4', 
                            name:"HT/FT"
                        }
                    ]} 
                    onSelect={(id) => {}}
                />
            </div>
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
        </div>
    )
}

export default StandingsPage