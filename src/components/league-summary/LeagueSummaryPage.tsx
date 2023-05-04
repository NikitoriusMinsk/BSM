import styles from "../../styles/components/league-summary/LeagueSummaryPage.module.css"
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const LeagueSummaryPage: React.FC = () => {    
    const [seeMore, setSeeMore] = useState(false)
	
    return (
        <div className={styles.pageContainer}>
            <div className={styles.stageStat}>
                <div className={styles.stage}>
                    <span>
                        Today’s Matches
                    </span>
                    <span>
                        Standings
                    </span>
                </div>
                <table className={styles.stageStat}>
                    <tbody>
                        <tr className={styles.statLine}>
                            <td style={{width:'1%', minWidth:'86px', textAlign:'center'}}>
                                Finished
                            </td>
                            <td style={{width:'85px'}}>
                                <div className={styles.teamsLogos}>
                                    <div className={styles.logo}>
                                        <Image 
                                            src="/images/team-1-placeholder.svg"
                                            width={22}
                                            height={22}
                                            objectFit="contain"
                                        />
                                    </div>
                                    <div className={styles.logo}>
                                        <Image 
                                            src="/images/team-2-placeholder.svg"
                                            width={22}
                                            height={22}
                                            objectFit="contain"
                                        />
                                    </div>
                                </div>                                
                            </td>  
                            <td style={{width:'fit-content', minWidth:'100px'}}>
                                <div className={styles.teamNames}>
                                    <span>
                                        Team 1
                                    </span>
                                    <span>
                                        Team 2
                                    </span>
                                </div>                                
                            </td>
                            <td style={{textAlign:'right'}}>
                                <div className={styles.teamScores}>
                                    <span>
                                        1
                                    </span>
                                    <span>
                                        1
                                    </span>
                                </div>  
                            </td>
                            <td style={{width:'1%', textAlign:'right'}}>
                                <button className={styles.previewBtn}>
                                    Preview
                                </button>
                            </td>
                        </tr>
                        <tr className={styles.statLine}>
                            <td style={{width:'1%', minWidth:'86px', textAlign:'center'}}>
                                15:25
                            </td>
                            <td style={{width:'85px'}}>
                                <div className={styles.teamsLogos}>
                                    <div className={styles.logo}>
                                        <Image 
                                            src="/images/team-1-placeholder.svg"
                                            width={22}
                                            height={22}
                                            objectFit="contain"
                                        />
                                    </div>
                                    <div className={styles.logo}>
                                        <Image 
                                            src="/images/team-2-placeholder.svg"
                                            width={22}
                                            height={22}
                                            objectFit="contain"
                                        />
                                    </div>
                                </div>                                
                            </td>  
                            <td style={{width:'fit-content', minWidth:'100px'}}>
                                <div className={styles.teamNames}>
                                    <span>
                                        Team 1
                                    </span>
                                    <span>
                                        Team 2
                                    </span>
                                </div>                                
                            </td>
                            <td style={{textAlign:'right'}}>
                                <div className={styles.teamScores}>
                                    <span>
                                        1
                                    </span>
                                    <span>
                                        1
                                    </span>
                                </div>  
                            </td>
                            <td style={{width:'1%', textAlign:'right'}}>
                                <button className={styles.previewBtn}>
                                    Preview
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.stageStat}>
                <div className={styles.stage}>
                    <div className={styles.stageTitle}>
                        <span>
                            Latest Scores
                        </span>
                        <span>
                            Stage 2
                        </span>
                    </div>
                    <span>
                        Standings
                    </span>
                </div>
                <table className={styles.stageStat}>
                    <tbody>
                        <tr className={styles.statLine}>
                            <td style={{width:'1%', minWidth:'86px', textAlign:'center'}}>
                                <div className={styles.matchDate}>
                                    <span>
                                        20:00
                                    </span>
                                    <span>
                                        25 Mar
                                    </span>
                                </div>
                            </td>
                            <td style={{width:'85px'}}>
                                <div className={styles.teamsLogos}>
                                    <div className={styles.logo}>
                                        <Image 
                                            src="/images/team-1-placeholder.svg"
                                            width={22}
                                            height={22}
                                            objectFit="contain"
                                        />
                                    </div>
                                    <div className={styles.logo}>
                                        <Image 
                                            src="/images/team-2-placeholder.svg"
                                            width={22}
                                            height={22}
                                            objectFit="contain"
                                        />
                                    </div>
                                </div>                                
                            </td>  
                            <td style={{width:'fit-content', minWidth:'100px'}}>
                                <div className={styles.teamNames}>
                                    <span>
                                        Team 1
                                    </span>
                                    <span>
                                        Team 2
                                    </span>
                                </div>                                
                            </td>
                            <td style={{textAlign:'right'}}>
                                <div className={styles.teamScores}>
                                    <span>
                                        1
                                    </span>
                                    <span>
                                        1
                                    </span>
                                </div>  
                            </td>
                            <td style={{width:'1%', textAlign:'right'}}>
                                <button className={styles.previewBtn}>
                                    Preview
                                </button>
                            </td>
                        </tr>
                        <tr className={styles.statLine}>
                            <td style={{width:'1%', minWidth:'86px', textAlign:'center'}}>
                                <div className={styles.matchDate}>
                                    <span>
                                        20:00
                                    </span>
                                    <span>
                                        25 Mar
                                    </span>
                                </div>
                            </td>
                            <td style={{width:'85px'}}>
                                <div className={styles.teamsLogos}>
                                    <div className={styles.logo}>
                                        <Image 
                                            src="/images/team-1-placeholder.svg"
                                            width={22}
                                            height={22}
                                            objectFit="contain"
                                        />
                                    </div>
                                    <div className={styles.logo}>
                                        <Image 
                                            src="/images/team-2-placeholder.svg"
                                            width={22}
                                            height={22}
                                            objectFit="contain"
                                        />
                                    </div>
                                </div>                                
                            </td>  
                            <td style={{width:'fit-content', minWidth:'100px'}}>
                                <div className={styles.teamNames}>
                                    <span>
                                        Team 1
                                    </span>
                                    <span>
                                        Team 2
                                    </span>
                                </div>                                
                            </td>
                            <td style={{textAlign:'right'}}>
                                <div className={styles.teamScores}>
                                    <span>
                                        1
                                    </span>
                                    <span>
                                        1
                                    </span>
                                </div>  
                            </td>
                            <td style={{width:'1%', textAlign:'right'}}>
                                <button className={styles.previewBtn}>
                                    Preview
                                </button>
                            </td>
                        </tr>
                        <tr className={styles.statLine}>
                            <td style={{width:'1%', minWidth:'86px', textAlign:'center'}}>
                                <div className={styles.matchDate}>
                                    <span>
                                        20:00
                                    </span>
                                    <span>
                                        25 Mar
                                    </span>
                                </div>
                            </td>
                            <td style={{width:'85px'}}>
                                <div className={styles.teamsLogos}>
                                    <div className={styles.logo}>
                                        <Image 
                                            src="/images/team-1-placeholder.svg"
                                            width={22}
                                            height={22}
                                            objectFit="contain"
                                        />
                                    </div>
                                    <div className={styles.logo}>
                                        <Image 
                                            src="/images/team-2-placeholder.svg"
                                            width={22}
                                            height={22}
                                            objectFit="contain"
                                        />
                                    </div>
                                </div>                                
                            </td>  
                            <td style={{width:'fit-content', minWidth:'100px'}}>
                                <div className={styles.teamNames}>
                                    <span>
                                        Team 1
                                    </span>
                                    <span>
                                        Team 2
                                    </span>
                                </div>                                
                            </td>
                            <td style={{textAlign:'right'}}>
                                <div className={styles.teamScores}>
                                    <span>
                                        1
                                    </span>
                                    <span>
                                        1
                                    </span>
                                </div>  
                            </td>
                            <td style={{width:'1%', textAlign:'right'}}>
                                <button className={styles.previewBtn}>
                                    Preview
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <AnimatePresence>
            {!seeMore ?
                <span className={styles.seeMore} onClick={() => setSeeMore(true)}>
                    See more
                    <Image 
                        src="/icons/chevron-down.svg"
                        width={24}
                        height={24}
                        objectFit="contain"
                    />
                </span>
                :
                <motion.div 
                    className={styles.moreContainer}
                    initial={{ height: '32px', opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: '32px', opacity: 0 }}
                    transition={{duration:0.3, ease:"easeInOut"}}
                >
                    <div className={styles.stageStat}>
                        <div className={styles.stage}>
                            <div className={styles.stageTitle}>
                                <span>
                                    Latest Scores
                                </span>
                                <span>
                                    Stage 3
                                </span>
                            </div>
                            <span>
                                Standings
                            </span>
                        </div>
                        <table className={styles.stageStat}>
                            <tbody>
                                <tr className={styles.statLine}>
                                    <td style={{width:'1%', minWidth:'86px', textAlign:'center'}}>
                                        <div className={styles.matchDate}>
                                            <span>
                                                20:00
                                            </span>
                                            <span>
                                                25 Mar
                                            </span>
                                        </div>
                                    </td>
                                    <td style={{width:'85px'}}>
                                        <div className={styles.teamsLogos}>
                                            <div className={styles.logo}>
                                                <Image 
                                                    src="/images/team-1-placeholder.svg"
                                                    width={22}
                                                    height={22}
                                                    objectFit="contain"
                                                />
                                            </div>
                                            <div className={styles.logo}>
                                                <Image 
                                                    src="/images/team-2-placeholder.svg"
                                                    width={22}
                                                    height={22}
                                                    objectFit="contain"
                                                />
                                            </div>
                                        </div>                                
                                    </td>  
                                    <td style={{width:'fit-content', minWidth:'100px'}}>
                                        <div className={styles.teamNames}>
                                            <span>
                                                Team 1
                                            </span>
                                            <span>
                                                Team 2
                                            </span>
                                        </div>                                
                                    </td>
                                    <td style={{textAlign:'right'}}>
                                        <div className={styles.teamScores}>
                                            <span>
                                                1
                                            </span>
                                            <span>
                                                1
                                            </span>
                                        </div>  
                                    </td>
                                    <td style={{width:'1%', textAlign:'right'}}>
                                        <button className={styles.previewBtn}>
                                            Preview
                                        </button>
                                    </td>
                                </tr>
                                <tr className={styles.statLine}>
                                    <td style={{width:'1%', minWidth:'86px', textAlign:'center'}}>
                                        <div className={styles.matchDate}>
                                            <span>
                                                20:00
                                            </span>
                                            <span>
                                                25 Mar
                                            </span>
                                        </div>
                                    </td>
                                    <td style={{width:'85px'}}>
                                        <div className={styles.teamsLogos}>
                                            <div className={styles.logo}>
                                                <Image 
                                                    src="/images/team-1-placeholder.svg"
                                                    width={22}
                                                    height={22}
                                                    objectFit="contain"
                                                />
                                            </div>
                                            <div className={styles.logo}>
                                                <Image 
                                                    src="/images/team-2-placeholder.svg"
                                                    width={22}
                                                    height={22}
                                                    objectFit="contain"
                                                />
                                            </div>
                                        </div>                                
                                    </td>  
                                    <td style={{width:'fit-content', minWidth:'100px'}}>
                                        <div className={styles.teamNames}>
                                            <span>
                                                Team 1
                                            </span>
                                            <span>
                                                Team 2
                                            </span>
                                        </div>                                
                                    </td>
                                    <td style={{textAlign:'right'}}>
                                        <div className={styles.teamScores}>
                                            <span>
                                                1
                                            </span>
                                            <span>
                                                1
                                            </span>
                                        </div>  
                                    </td>
                                    <td style={{width:'1%', textAlign:'right'}}>
                                        <button className={styles.previewBtn}>
                                            Preview
                                        </button>
                                    </td>
                                </tr>
                                <tr className={styles.statLine}>
                                    <td style={{width:'1%', minWidth:'86px', textAlign:'center'}}>
                                        <div className={styles.matchDate}>
                                            <span>
                                                20:00
                                            </span>
                                            <span>
                                                25 Mar
                                            </span>
                                        </div>
                                    </td>
                                    <td style={{width:'85px'}}>
                                        <div className={styles.teamsLogos}>
                                            <div className={styles.logo}>
                                                <Image 
                                                    src="/images/team-1-placeholder.svg"
                                                    width={22}
                                                    height={22}
                                                    objectFit="contain"
                                                />
                                            </div>
                                            <div className={styles.logo}>
                                                <Image 
                                                    src="/images/team-2-placeholder.svg"
                                                    width={22}
                                                    height={22}
                                                    objectFit="contain"
                                                />
                                            </div>
                                        </div>                                
                                    </td>  
                                    <td style={{width:'fit-content', minWidth:'100px'}}>
                                        <div className={styles.teamNames}>
                                            <span>
                                                Team 1
                                            </span>
                                            <span>
                                                Team 2
                                            </span>
                                        </div>                                
                                    </td>
                                    <td style={{textAlign:'right'}}>
                                        <div className={styles.teamScores}>
                                            <span>
                                                1
                                            </span>
                                            <span>
                                                1
                                            </span>
                                        </div>  
                                    </td>
                                    <td style={{width:'1%', textAlign:'right'}}>
                                        <button className={styles.previewBtn}>
                                            Preview
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            }
            </AnimatePresence>
        </div>
    )
}

export default LeagueSummaryPage