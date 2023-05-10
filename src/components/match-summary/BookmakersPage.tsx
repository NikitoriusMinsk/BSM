import styles from "../../styles/components/match-summary/BookmakersPage.module.css"
import Image from "next/image";
import React, { useEffect, useState } from "react"

const BookmakersPage: React.FC = () => {

    return (
        <div className={styles.pageContainer}>
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
                            Bookmakers
                        </th>
                        <th>
                            1
                        </th>
                        <th>
                            2
                        </th>
                        <th>
                            3
                        </th>
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
        </div>
    )
}

export default BookmakersPage