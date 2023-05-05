import styles from "../../styles/components/league-summary/ArchivePage.module.css"
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react"

const ArchivePage: React.FC = () => {

    return (
        <div className={styles.pageContainer}>
            <div className={styles.archive}>
                <table 
                    className={styles.archiveTable} 
                    cellPadding={10} 
                    cellSpacing={0}
                >
                    <colgroup>
                        <col width="50%" />
                        <col width="50%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Season</th>
                            <th>Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1,1,1,1,1,1,1,1,1].map((item,index) => (
                            <tr key={index}>
                                <td>Season 2020/2021</td>
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
                            </tr>
                        ))}                    
                    </tbody>               
                </table>
            </div>
        </div>
    )
}

export default ArchivePage