import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from '../../../styles/components/ui/match-summary/StandigsMenuColumn.module.css'
import Image from "next/image"
import Draggable from 'react-draggable'
import WheelPicker, { PickerData } from 'react-simple-wheel-picker'
import SubmitButton from "../SubmitButton"

interface MenuProps {
    items: { value: string, id: string, column: string }[];
    selectedItem?: { value: string, id: string, column: string };
    onSelect: (item?: { value: string, id: string, column: string }) => void;
}

const StandigsMenuColumn: React.FC<MenuProps> = (props) => {
    const { items, selectedItem, onSelect } = props
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(selectedItem || items[0])
    const [selectedDynamic, setSelectedDynamic] = useState(selectedItem || items[0])
    const [dragState, setDragState] = useState({ y: 0 })

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    function handleSelect() {
        setSelected(selectedDynamic)
        onSelect(selectedDynamic);
        setIsOpen(false);
    }

    const handleOnChange = (target: PickerData) => {
        const sctd = items.find(i => i.id == target.id)
        setSelectedDynamic(sctd)
    }

    return (
        <div className={styles.menuContainer}>
            <div
                className={styles.menuTitle}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selected?.value}</span>
                <div className={styles.chevron}>
                    <Image
                        src="/icons/chevron-down.svg"
                        width={20}
                        height={20}
                        style={{ objectFit: 'contain', objectPosition: "center center" }}
                        alt=""
                    />
                </div>
            </div>
            <AnimatePresence>
                {isOpen &&
                    <>
                        <motion.div
                            className={styles.back}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            onClick={() => setIsOpen(!isOpen)}
                        />
                        <Draggable
                            handle={'.' + styles.stickArea}
                            axis="y"
                            bounds={{ top: 0 }}
                            onDrag={(e, ui) => {
                                setDragState({ y: dragState.y + ui.deltaY })
                            }}
                            onStop={() => {
                                if (dragState.y > 10) {
                                    setDragState({ y: 0 })
                                    setIsOpen(false)
                                }
                            }}
                        >
                            <motion.div
                                className={styles.menuArea}
                                initial={{ opacity: 0, bottom: -100 }}
                                animate={{ opacity: 1, bottom: 0 }}
                                exit={{ opacity: 0, bottom: "-80%" }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                                <div className={styles.stickArea} >
                                    <div className={styles.stick} />
                                </div>
                                <div className={styles.items}>
                                    <div className={styles.centerLine} />
                                    <WheelPicker
                                        data={items}
                                        onChange={handleOnChange}
                                        itemHeight={40}
                                        height={200}
                                        selectedID={selected!.id}
                                        color="#1A1C21B2"
                                        activeColor="#1A1C21"
                                        backgroundColor="none"
                                        shadowColor="none"
                                    />
                                </div>
                                <button
                                    className={styles.applyButton}
                                    onClick={handleSelect}
                                >
                                    Apply
                                </button>
                            </motion.div>
                        </Draggable>
                    </>
                }
            </AnimatePresence>
        </div>
    )
}

export default StandigsMenuColumn