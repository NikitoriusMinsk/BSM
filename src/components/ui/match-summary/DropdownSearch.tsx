import React, { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from '../../../styles/components/ui/match-summary/DropdownSearch.module.css'
import Image from "next/image";

interface DropdownProps {
    items: { name: string, id: string, image: string }[];
    onSelect: (item: { name: string, id: string, image: string }) => void;
}

const DropdownSearch: React.FC<DropdownProps> = (props) => {
    const {items, onSelect} = props
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(items[0])
    const dropdownRef = useRef<HTMLDivElement>(null)

    const DropdownVariants = {
        open: {
            height: 'auto',
        },
        closed: {
            height: 0,
        },
    }
    
    const closeIfNotDropdown = (e: MouseEvent) => {
        if ((e.target != dropdownRef.current) && (!dropdownRef.current?.contains(e.target as Node))) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        if (window)
            window.addEventListener('click', closeIfNotDropdown)
        return () => {
            window.removeEventListener('click', closeIfNotDropdown)
        }
    }, [])

    const ChevronVariants = {
        open: {
            rotate: 180,
        },
        closed: {
            rotate: 0,
        }
    }

    function handleSelect(item: { name: string, id: string, image: string }) {
        onSelect(item);
        setSelected(item);
        setIsOpen(false);
    }

    return (
        <div 
            className={styles.dropContainer} 
            ref={dropdownRef}
        >
            <div 
                className={styles.dropTitle}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Image
                    src={selected?.image || ""}
                    width={60}
                    height={20}
                    style={{objectFit:'contain',objectPosition:"left center"}}
                    alt=""
                />
                <motion.div
                    className={styles.chevron}
                    variants={ChevronVariants}
                    initial={false}
                    animate={isOpen ? 'open' : 'closed'}
                    transition={{duration:0.2, ease:"easeInOut"}}
                >
                    <Image
                        src="/icons/chevron-down.svg"
                        width={16}
                        height={16}
                        style={{objectFit:'contain',objectPosition:"center center"}}
                        alt=""
                    />
                </motion.div>
            </div>
            <motion.div 
                className={styles.dropArea}
                variants={DropdownVariants}
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
                transition={{duration:0.2, ease:"easeInOut"}}
            >
                <div className={styles.dropItems}>
                    <input className={styles.dropSearch} placeholder="Search" />
                    {items.map((item) => (
                        <div 
                            className={styles.dropItem} 
                            key={item.id}
                            onClick={() => handleSelect(item)}
                        >
                            <Image
                                src={item.image}
                                width={60}
                                height={24}
                                style={{objectFit:'contain',objectPosition:"left center"}}
                                alt=""
                            />
                            <span>
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

export default DropdownSearch