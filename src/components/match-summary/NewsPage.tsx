import styles from "../../styles/components/match-summary/NewsPage.module.css"
import Image from "next/image";
import React, { useEffect, useState } from "react"

const NewsPage: React.FC = () => {

    return (
        <div className={styles.pageContainer}>
            <div className={styles.wideBlock}>
                <div className={styles.wideBlImg}>
                    <Image 
                        src="/testimg/football.jpg"
                        fill
                        alt=""
                        style={{objectFit:'cover'}}
                    />
                </div>                
                <div className={styles.wideInfo}>
                    <div className={styles.wideHeader}>
                        <span className={styles.wideDate}>
                            15 Jul. 2022
                        </span>
                        <span className={styles.wideTitle}>
                            Group H Preview - FIFA World Cup Qatar 2022: Will the star strikers produce on the big stage?
                        </span>
                    </div>
                    <div className={styles.wideStats}>
                        <div className={styles.stat}>
                            <Image 
                                src="/icons/news-stats/like.svg"
                                width={24}
                                height={24}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                            123
                        </div>
                        <div className={styles.stat}>
                            <Image 
                                src="/icons/news-stats/comment.svg"
                                width={24}
                                height={24}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                            123
                        </div>
                        <div className={styles.stat}>
                            <Image 
                                src="/icons/news-stats/eye.svg"
                                width={24}
                                height={24}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                            123
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.newsBlock}>
                <div className={styles.newsPhoto}>
                    <Image 
                        src="/testimg/football.jpg"
                        fill
                        alt=""
                        style={{objectFit:'cover', borderRadius:'8px'}}
                    />
                </div>                
                <div className={styles.newsInfo}>
                    <div className={styles.newsHeader}>
                        <span className={styles.newsDate}>
                            15 Jul. 2022
                        </span>
                        <span className={styles.newsTitle}>
                            Group H Preview - FIFA World Cup Qatar 2022: Will the star strikers produce on the big stage?
                        </span>
                    </div>
                    <div className={styles.newsStats}>
                        <div className={styles.stat}>
                            <Image 
                                src="/icons/news-stats/eye.svg"
                                width={24}
                                height={24}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                            123
                        </div>
                        <div className={styles.stat}>
                            <Image 
                                src="/icons/news-stats/comment.svg"
                                width={24}
                                height={24}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                            123
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.newsBlock}>
                <div className={styles.newsPhoto}>
                    <Image 
                        src="/testimg/football.jpg"
                        fill
                        alt=""
                        style={{objectFit:'cover', borderRadius:'8px'}}
                    />
                </div>                
                <div className={styles.newsInfo}>
                    <div className={styles.newsHeader}>
                        <span className={styles.newsDate}>
                            15 Jul. 2022
                        </span>
                        <span className={styles.newsTitle}>
                            Group H Preview - FIFA World Cup Qatar 2022: Will the star strikers produce on the big stage?
                        </span>
                    </div>
                    <div className={styles.newsStats}>
                        <div className={styles.stat}>
                            <Image 
                                src="/icons/news-stats/eye.svg"
                                width={24}
                                height={24}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                            123
                        </div>
                        <div className={styles.stat}>
                            <Image 
                                src="/icons/news-stats/comment.svg"
                                width={24}
                                height={24}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                            123
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.newsBlock}>
                <div className={styles.newsPhoto}>
                    <Image 
                        src="/testimg/football.jpg"
                        fill
                        alt=""
                        style={{objectFit:'cover', borderRadius:'8px'}}
                    />
                </div>                
                <div className={styles.newsInfo}>
                    <div className={styles.newsHeader}>
                        <span className={styles.newsDate}>
                            15 Jul. 2022
                        </span>
                        <span className={styles.newsTitle}>
                            Group H Preview - FIFA World Cup Qatar 2022: Will the star strikers produce on the big stage?
                        </span>
                    </div>
                    <div className={styles.newsStats}>
                        <div className={styles.stat}>
                            <Image 
                                src="/icons/news-stats/eye.svg"
                                width={24}
                                height={24}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                            123
                        </div>
                        <div className={styles.stat}>
                            <Image 
                                src="/icons/news-stats/comment.svg"
                                width={24}
                                height={24}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                            123
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.newsBlock}>
                <div className={styles.newsPhoto}>
                    <Image 
                        src="/testimg/football.jpg"
                        fill
                        alt=""
                        style={{objectFit:'cover', borderRadius:'8px'}}
                    />
                </div>                
                <div className={styles.newsInfo}>
                    <div className={styles.newsHeader}>
                        <span className={styles.newsDate}>
                            15 Jul. 2022
                        </span>
                        <span className={styles.newsTitle}>
                            Group H Preview - FIFA World Cup Qatar 2022: Will the star strikers produce on the big stage?
                        </span>
                    </div>
                    <div className={styles.newsStats}>
                        <div className={styles.stat}>
                            <Image 
                                src="/icons/news-stats/eye.svg"
                                width={24}
                                height={24}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                            123
                        </div>
                        <div className={styles.stat}>
                            <Image 
                                src="/icons/news-stats/comment.svg"
                                width={24}
                                height={24}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                            123
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.newsBlock}>
                <div className={styles.newsPhoto}>
                    <Image 
                        src="/testimg/football.jpg"
                        fill
                        alt=""
                        style={{objectFit:'cover', borderRadius:'8px'}}
                    />
                </div>                
                <div className={styles.newsInfo}>
                    <div className={styles.newsHeader}>
                        <span className={styles.newsDate}>
                            15 Jul. 2022
                        </span>
                        <span className={styles.newsTitle}>
                            Group H Preview - FIFA World Cup Qatar 2022: Will the star strikers produce on the big stage?
                        </span>
                    </div>
                    <div className={styles.newsStats}>
                        <div className={styles.stat}>
                            <Image 
                                src="/icons/news-stats/eye.svg"
                                width={24}
                                height={24}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                            123
                        </div>
                        <div className={styles.stat}>
                            <Image 
                                src="/icons/news-stats/comment.svg"
                                width={24}
                                height={24}
                                alt=""
                                style={{objectFit:'contain'}}
                            />
                            123
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsPage