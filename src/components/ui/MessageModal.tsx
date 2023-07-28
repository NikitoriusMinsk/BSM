import styles from "@styles/components/ui/MessageModal.module.css";
import React from "react";
import Image from "next/image";
import { motion, AnimationProps } from "framer-motion";

const MessageModal: React.FC<{
    children?: React.ReactNode,
    title?: string,
    close: () => void,
    wrapperStyle?: React.CSSProperties,
    containerStyle?: React.CSSProperties,
    wrapperAnimationProps?: AnimationProps,
    containerAnimationProps?: AnimationProps,
    closeOnClickOutside?: boolean
}> =
    ({
        children,
        title,
        close,
        wrapperStyle,
        containerStyle,
        wrapperAnimationProps,
        containerAnimationProps = { //default appearance
            variants: {
                open: {
                    opacity: 1,
                    y: 0
                },
                closed: {
                    opacity: 0,
                    y: -20
                },
            },
            initial: 'closed',
            animate: 'open',
            exit: 'closed',
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            }
        },
        closeOnClickOutside
    }) => {

        return (
            <motion.div
                className={styles.wrapper}
                style={wrapperStyle}
                {...wrapperAnimationProps}
                onClick={closeOnClickOutside ? close : undefined}
            >
                <motion.div
                    className={styles.container}
                    style={containerStyle}
                    {...containerAnimationProps}
                >
                    <div className={styles.header}>
                        <span className={styles.title}>
                            {title}
                        </span>
                        <div className={styles.close} onClick={close}>
                            <Image
                                src="/icons/close.svg"
                                height={24}
                                width={24}
                                alt=""
                            />
                        </div>
                    </div>
                    {children}
                </motion.div>
            </motion.div>
        )
    }

export default MessageModal