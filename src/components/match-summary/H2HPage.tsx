import styles from "../../styles/components/match-summary/H2HPage.module.css"
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react"
import H2HFilter from "@components/ui/match-summary/H2HFilter"
import { motion } from "framer-motion"

const H2HPage: React.FC = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.filter}>
                <H2HFilter 
                    items={[
                        {
                            id:'1', 
                            name:"Overall"
                        },
                        {
                            id:'2', 
                            name:"Team 1 - Home"
                        },
                        {
                            id:'3', 
                            name:"Team 2 - Away"
                        }
                    ]} 
                    onSelect={(id) => {}}
                />
            </div>
            <div className={styles.matches}>
                <MatchesBlock />
                <MatchesBlock />
                <MatchesBlock />
            </div>            
        </div>
    )
}

const MatchesBlock: React.FC = () => {
    const [seeMore, setSeeMore] = useState(false)
    
    // test
    let itemCount = 6

    const listVariants = {
        open: {
            height: "100%"
        },
        close: {
            height: itemCount > 2 ? 234 : (itemCount == 2 ? 156 : 78)
        }
    }

    return (
        <div className={styles.matchesBlock}>
            <span className={styles.blockTitle}>
                Last Matches - Augsburs
            </span>
            <motion.div 
                className={styles.matchesList}
                variants={listVariants}
                animate={seeMore ? "open" : "close"}
                initial={'close'}
                transition={{duration:0.2, ease:"easeInOut"}}
            >
                {[1,1].map(item => (
                    <>
                    <div className={styles.match}>
                        <div className={styles.matchData}>
                            <div className={styles.dateChamp}>
                                <span className={styles.date}>
                                    13.09.22
                                </span>
                                <div className={styles.champ}>
                                    <div className={styles.champLogo}>
                                        <Image 
                                            src="/testimg/world.png"
                                            width={24}
                                            height={24}
                                            objectFit="contain"
                                        />
                                    </div>
                                    <span className={styles.champName}>
                                        Champ
                                    </span>
                                </div>
                            </div>
                            <div className={styles.teams}>
                                <div className={styles.teamLogo}>
                                    <Image 
                                        src="/testimg/club1.png"
                                        width={20}
                                        height={20}
                                        objectFit="contain"
                                    />
                                </div>
                                <div className={styles.teamLogo}>
                                    <Image 
                                        src="/testimg/club2.png"
                                        width={20}
                                        height={20}
                                        objectFit="contain"
                                    />
                                </div>
                                <div className={styles.teamsNames}>
                                    <span className={styles.winner}>
                                        Team 1
                                    </span>
                                    <span>
                                        Team 2
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.matchResult}>
                            <div className={styles.score}>
                                <span className={styles.winner}>
                                    4
                                </span>
                                <span>
                                    0
                                </span>
                            </div>
                            <div className={styles.line} />
                            <div className={styles.resultWin} />
                        </div>
                    </div>
                    <div className={styles.match}>
                        <div className={styles.matchData}>
                            <div className={styles.dateChamp}>
                                <span className={styles.date}>
                                    13.09.22
                                </span>
                                <div className={styles.champ}>
                                    <div className={styles.champLogo}>
                                        <Image 
                                            src="/testimg/world.png"
                                            width={24}
                                            height={24}
                                            objectFit="contain"
                                        />
                                    </div>
                                    <span className={styles.champName}>
                                        Champ
                                    </span>
                                </div>
                            </div>
                            <div className={styles.teams}>
                                <div className={styles.teamLogo}>
                                    <Image 
                                        src="/testimg/club1.png"
                                        width={20}
                                        height={20}
                                        objectFit="contain"
                                    />
                                </div>
                                <div className={styles.teamLogo}>
                                    <Image 
                                        src="/testimg/club2.png"
                                        width={20}
                                        height={20}
                                        objectFit="contain"
                                    />
                                </div>
                                <div className={styles.teamsNames}>
                                    <span>
                                        Team 1
                                    </span>
                                    <span className={styles.winner}>
                                        Team 2
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.matchResult}>
                            <div className={styles.score}>
                                <span>
                                    2
                                </span>
                                <span className={styles.winner}>
                                    3
                                </span>
                            </div>
                            <div className={styles.line} />
                            <div className={styles.resultLose} />
                        </div>
                    </div>
                    <div className={styles.match}>
                        <div className={styles.matchData}>
                            <div className={styles.dateChamp}>
                                <span className={styles.date}>
                                    13.09.22
                                </span>
                                <div className={styles.champ}>
                                    <div className={styles.champLogo}>
                                        <Image 
                                            src="/testimg/world.png"
                                            width={24}
                                            height={24}
                                            objectFit="contain"
                                        />
                                    </div>
                                    <span className={styles.champName}>
                                        Champ
                                    </span>
                                </div>
                            </div>
                            <div className={styles.teams}>
                                <div className={styles.teamLogo}>
                                    <Image 
                                        src="/testimg/club1.png"
                                        width={20}
                                        height={20}
                                        objectFit="contain"
                                    />
                                </div>
                                <div className={styles.teamLogo}>
                                    <Image 
                                        src="/testimg/club2.png"
                                        width={20}
                                        height={20}
                                        objectFit="contain"
                                    />
                                </div>
                                <div className={styles.teamsNames}>
                                    <span>
                                        Team 1
                                    </span>
                                    <span>
                                        Team 2
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.matchResult}>
                            <div className={styles.score}>
                                <span>
                                    1
                                </span>
                                <span>
                                    1
                                </span>
                            </div>
                            <div className={styles.line} />
                            <div className={styles.resultDraw} />
                        </div>
                    </div>
                    </>
                ))}
            </motion.div>
            {!seeMore && itemCount>3 &&
                <span className={styles.seeMore} onClick={() => setSeeMore(true)}>
                    See more
                    <Image 
                        src="/icons/chevron-down.svg"
                        width={24}
                        height={24}
                        objectFit="contain"
                    />
                </span>
            }
        </div>
    )
}

export default H2HPage