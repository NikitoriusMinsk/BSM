import React, { useState } from "react"
import styles from '../../../styles/components/ui/match-summary/OddForm.module.css'
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/legacy/image";
import { Dispatch, SetStateAction } from "react"

interface OddFormProps {
    setOpen: Dispatch<SetStateAction<undefined>>
}

const OddForm: React.FC<OddFormProps> = (props) => {
    const {setOpen} = props
    const [amount, setAmount] = useState(0)

    const changeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(e.target.value))
    }

    return (
        <motion.div 
            className={styles.container}
            initial={{opacity:0, bottom:-100}}
            animate={{opacity:1, bottom:0}}
            exit={{opacity:0, bottom:-100}}
            transition={{duration:0.3, ease:"easeInOut"}}
        >
            <div className={styles.header}>
                <span className={styles.title}>
                    <Image 
                        src="/icons/ticket.svg"
                        width={24}
                        height={24}
                        objectFit="contain"
                        objectPosition="center center"
                    />
                    BET SLIP
                </span>
                <div className={styles.chevron}>
                    <Image 
                        src="/icons/chevron-down.svg"
                        width={24}
                        height={24}
                        objectFit="contain"
                        objectPosition="center center"
                    />
                </div>
            </div>
            <div className={styles.oddSticker}>
                <div className={styles.stickerHeader}>
                    <span>
                        Team 1 - Team 2
                    </span>
                    <div className={styles.crossBtn}>
                        <Image 
                            src="/icons/cancel.svg"
                            width={24}
                            height={24}
                            objectFit="contain"
                            objectPosition="center center"
                        />
                    </div>
                </div>
                <div className={styles.stickerContent}>
                    <div className={styles.stickerText}>
                        <span className={styles.stickerOddType}>
                            Match result (regular time)
                        </span>
                        <span className={styles.stickerOddChoice}>
                            Eintrachr Frankfurt
                        </span>
                    </div>
                    <div className={styles.stickerData}>
                        <Image 
                            src="/images/bookmaker-placeholder-1.png"
                            width={60}
                            height={24}
                            objectFit="contain"
                            objectPosition="right center"
                        />
                        <span className={styles.stickerPoints}>
                            23.1
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.switchOdd}>
                <div className={styles.switchBookmaker}>
                    <div className={styles.bookmakerImgs}>
                        <Image 
                            src="/icons/arrow-narrow-up.svg"
                            width={24}
                            height={24}
                            objectFit="contain"
                            objectPosition="center center"
                        />
                        <Image 
                            src="/images/bookmaker-placeholder-3.png"
                            width={60}
                            height={24}
                            objectFit="contain"
                            objectPosition="center center"
                        />
                    </div>
                    <div className={styles.switchBtn}>
                        <Image 
                            src="/icons/Switch.svg"
                            width={16}
                            height={16}
                            objectFit="contain"
                            objectPosition="center center"
                        />
                        Switch
                    </div>
                </div>
            </div>
            <input 
                className={styles.commentArea} 
                placeholder="Add comment"
            />
            <div className={styles.betAmountBlock}>
                <div className={styles.betAmount}>
                    <span className={styles.betText}>
                        Bet amount:
                    </span>
                    <div className={styles.amountField}>
                        <input 
                            type="number" 
                            min={1}
                            value={amount}
                            placeholder="0"
                            onChange={changeAmount}
                        />
                    </div>                
                    <span className={styles.betCoins}>
                        Coins
                    </span>
                </div>
                <div className={styles.amountBlocks}>
                    <span className={styles.amountBlock} onClick={()=>setAmount(25)}>
                        25
                    </span>
                    <span className={styles.amountBlock} onClick={()=>setAmount(50)}>
                        50
                    </span>
                    <span className={styles.amountBlock} onClick={()=>setAmount(100)}>
                        100
                    </span>
                    <span className={styles.amountBlock} onClick={()=>setAmount(999999)}>
                        MAX
                    </span>
                </div>
            </div>
            <div className={styles.tipStatus}>
                <span className={styles.tipTitle}>
                    Tips type:
                </span>
                <div className={styles.tipsBlock}>
                    <label className={styles.radioTip}>
                        <input type="radio" name="radioTip" />
                        <span className={styles.check} />
                        <span className={styles.tipType}>
                            Private
                        </span>
                        <span className={styles.tipText}>
                            Viewable by subscribers
                        </span>
                    </label>
                    <label className={styles.radioTip}>
                        <input type="radio" name="radioTip" defaultChecked={true} />                        
                        <span className={styles.check} />
                        <span className={styles.tipType}>
                            Free
                        </span>
                        <span className={styles.tipText}>
                            Viewable by everyone
                        </span>
                    </label>
                </div>
            </div>
            <button className={styles.addBtn} onClick={() => setOpen(undefined)}>
                Add Tip
            </button>
        </motion.div>
    )
}

export default OddForm