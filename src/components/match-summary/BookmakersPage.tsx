import styles from "../../styles/components/match-summary/BookmakersPage.module.css"
import Image from "next/image";
import React, { useEffect, useState } from "react"

const BookmakersPage: React.FC = () => {

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <span>
                    Bookmakers
                </span>
                <div className={styles.colsHeader}>
                    <span>
                        1
                    </span>
                    <span>
                        2
                    </span>
                    <span>
                        3
                    </span>
                </div>
            </div>
            <div className={styles.bookmakersList}>
                <div className={styles.bookmaker}>
                    <div className={styles.logo}>
                        <Image 
                            src="/images/bookmaker-placeholder-3.png"
                            width={130}
                            height={40}
                            style={{objectFit:'contain',objectPosition:"center center"}}
                            alt=""
                        />
                    </div>
                    <div className={styles.bets}>
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
                    </div>
                </div>
                <div className={styles.bookmaker}>
                    <div className={styles.logo}>
                        <Image 
                            src="/images/bookmaker-placeholder-3.png"
                            width={130}
                            height={40}
                            style={{objectFit:'contain',objectPosition:"center center"}}
                            alt=""
                        />
                    </div>
                    <div className={styles.bets}>
                        <div className={`${styles.bet} ${styles.grayBet}`}>
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
                    </div>
                </div>
                <div className={styles.bookmaker}>
                    <div className={styles.logo}>
                        <Image 
                            src="/images/bookmaker-placeholder-3.png"
                            width={130}
                            height={40}
                            style={{objectFit:'contain',objectPosition:"center center"}}
                            alt=""
                        />
                    </div>
                    <div className={styles.bets}>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookmakersPage