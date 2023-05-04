import type { NextPage } from "next"
import Head from "next/head"
import styles from "../../styles/pages/LeagueSummary.module.css"
import Image from "next/legacy/image";
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LeagueSummaryPage from "@components/league-summary/LeagueSummaryPage"
import LineupsPage from "@components/match-summary/LineupsPage"
import OddsPage from "@components/match-summary/OddsPage"
import H2HPage from "@components/match-summary/H2HPage"
import StandingsPage from "@components/match-summary/StandingsPage"
import PredictionsPage from "@components/match-summary/PredictionsPage"
import BookmakersPage from "@components/match-summary/BookmakersPage"
import PagesSlider from "@components/ui/match-summary/PagesSlider";

const pages = [
    {
        id:1,
        name:"Summary"
    },
    {
        id:2,
        name:"Results"
    },
    {
        id:3,
        name:"Fixstures"
    },
    {
        id:4,
        name:"Standings"
    },
    {
        id:5,
        name:"Archive"
    }
]

const LeagueSummary: NextPage = () => {
    const router = useRouter()
    const [selectedPage, setSelectedPage] = useState(0)
    const [selectedPageComponent, setSelectedPageComponent] = useState(<LeagueSummaryPage />)

    useEffect(()=>{
        switch (selectedPage) {
            case 0:
                setSelectedPageComponent(<LeagueSummaryPage />)
                break;
            case 1:
                setSelectedPageComponent(<LineupsPage />)
                break;
            case 2:
                setSelectedPageComponent(<OddsPage />)
                break;
            case 3:
                setSelectedPageComponent(<H2HPage />)
                break;
            case 4:
                setSelectedPageComponent(<StandingsPage />)
                break;
            case 5:
                setSelectedPageComponent(<PredictionsPage />)
                break;
            case 9:
                setSelectedPageComponent(<BookmakersPage />)
                break;
        }
    },[selectedPage])

    return (
        <>
            <Head>
                <title>Optimo Match Summary</title>
                <meta name="description" content="Optimo betting social media. Match summary" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.leaguePreview}>
                    <Image 
                        //test img link
                        src="/testimg/football.jpg"
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className={styles.leagueInfo}>
                        <div className={styles.leagueHeader}>
                            <div 
                                className={styles.buttonBack}
                                onClick={() => router.back()}
                            >
                                <Image 
                                    src="/icons/arrow-narrow-left.svg"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </div>
                        <div className={styles.leagueData}>
                            <div className={styles.leagueLogo}>
                                <Image 
                                    src="/images/league-placeholder.png"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className={styles.leagueFields}>
                                <div className={styles.leagueTitle}>
                                    <span className={styles.leagueTitleName}>
                                        Premier League
                                    </span>
                                    <span className={styles.leagueTitleDate}>
                                        2022/2023
                                    </span>
                                </div>
                                <div className={styles.countryName}>
                                    <div className={styles.countryFlag}>
                                        <Image 
                                            src="/icons/flags/en.svg"
                                            width={24}
                                            height={24}
                                        />
                                    </div>
                                    <span className={styles.countryNameField}>
                                        United Kingdom
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.matchStatPages}>
                    <PagesSlider>
                        {pages.map((page, index) => (
                            <span 
                                className={`${styles.page} ${index == selectedPage && styles.pageActive}`}
                                onClick={()=>setSelectedPage(index)}
                                key={page?.id}
                                aria-label={page?.name}
                            >
                                {page?.name}
                                {index == selectedPage && 
                                    <motion.div className={styles.pageUnderline} layoutId="pageUnderline" />
                                }
                            </span>
                        ))}
                    </PagesSlider>
                    <AnimatePresence exitBeforeEnter>
                        <motion.div
                            key={selectedPage ? selectedPage : "empty"}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {selectedPageComponent}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
            <div className={styles.sideBar}>

            </div>
        </>
    );
};

export default LeagueSummary;