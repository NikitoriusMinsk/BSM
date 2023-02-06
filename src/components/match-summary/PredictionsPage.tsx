import styles from "../../styles/components/match-summary/PredictionsPage.module.css"
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react"
import PredictionsFilter from "@components/ui/match-summary/PredictionsFilter"
import { motion } from "framer-motion"
import { trpc } from 'src/utils/trpc'
import Prediction from '@components/ui/Prediction'

const PredictionsPage: React.FC = () => {
    const { data, isLoading } = trpc.matches.getMatchTips.useQuery()

    return (
        <div className={styles.pageContainer}>
            <div className={styles.filter}>
                <PredictionsFilter 
                    items={[
                        {
                            id:'1', 
                            name:"All"
                        },
                        {
                            id:'2', 
                            name:"Free"
                        },
                        {
                            id:'3', 
                            name:"Paid"
                        }
                    ]} 
                    onSelect={(id) => {}}
                />
            </div>
            <div className={styles.predictions}>
                {
                    data?.map((prediction, index) => (
                        <Prediction
                            key={`prediction_${index}`}
                            {...prediction}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default PredictionsPage