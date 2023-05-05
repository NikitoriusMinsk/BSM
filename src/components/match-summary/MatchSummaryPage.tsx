import styles from "../../styles/components/match-summary/MatchSummaryPage.module.css"
import Image from "next/image";
import React, { useEffect, useState } from "react"

const MatchSummaryPage: React.FC = () => {
    return (
        <div className={styles.pageContainer}>
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
        </div>
    )
}

export default MatchSummaryPage