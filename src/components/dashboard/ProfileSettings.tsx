import React, { useState } from 'react'
import styles from '@styles/components/dashboard/ProfileSettings.module.css'
import Image from 'next/image'
import { trpc } from 'src/utils/trpc'
import { AnimatePresence, motion } from 'framer-motion'
import PasswordField from '@components/ui/PasswordField'

const ProfileSettings: React.FC = () => {
    const { data, isLoading } = trpc.useQuery(['user.getInfo'])
    const [isModalOpen, setIsModalOpen] = useState(false)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!data) {
        return <div>Error...</div>
    }

    return (
        <>
            <AnimatePresence initial={false}>
                {isModalOpen && <PasswordModal onClose={() => setIsModalOpen(false)} />}
            </AnimatePresence>
            <div className={styles.profileSettings}>
                <div
                    id={styles.accountSettings}
                    className={styles.block}
                >
                    <h2>Account Settings</h2>
                    <div className={styles.content}>
                        <div className={styles.imageInput}>
                            <div className={styles.avatar}>
                                <Image
                                    src='/images/profile-placeholder.png'
                                    height={140}
                                    width={140}
                                />
                            </div>
                            <label className={styles.upload}>
                                <div>
                                    <Image
                                        src='/icons/upload.svg'
                                        height={24}
                                        width={24}
                                    />
                                </div>
                                <span>Upload picture</span>
                                <input type={'file'} />
                            </label>
                        </div>
                        <div className={styles.info}>
                            <ProfileField label='Username' defaultValue={data.nickname} />
                            <ProfileField label='Name' defaultValue={data.name.split(' ')[0]} />
                            <ProfileField label='Surname' defaultValue={data.name.split(' ')[1]} />
                            <ProfileField label='Email' defaultValue={data.email} />
                            <div
                                className={styles.changePassword}
                                onClick={() => setIsModalOpen(true)}
                            >
                                <span>Change Password</span>
                                <Image
                                    src='/icons/pencil.svg'
                                    height={18}
                                    width={18}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id={styles.sportDetails}
                    className={styles.block}
                >
                    <h2>Sport Details</h2>
                    <div className={styles.content}></div>
                </div>
            </div>
        </>
    )
}

const ProfileField: React.FC<{ label: string, defaultValue?: string }> = (props) => {
    const { label, defaultValue } = props
    const [editable, setEditable] = useState(false);

    return (
        <div className={styles.profileField}>
            <span className={styles.label}>
                {label}
            </span>
            <input
                type={'text'}
                readOnly={!editable}
                placeholder={label}
                defaultValue={defaultValue}
            />
            {!editable
                ? <div
                    className={styles.icon}
                    onClick={() => setEditable(true)}
                >
                    <Image
                        src='/icons/pencil.svg'
                        height={18}
                        width={18}
                    />
                </div>
                : <button
                    className={styles.icon}
                    onClick={() => setEditable(false)}
                >
                    Save
                </button>
            }
        </div>
    )
}

const ModalVariants = {
    open: {
        opacity: [0, 1],
        transition: {
            duration: 0.3,
            ease: 'easeInOut'
        }
    },
    closed: {
        opacity: [1, 0],
        transition: {
            duration: 0.3,
            ease: 'easeInOut'
        }
    }
}

const PasswordModal: React.FC<{ onClose: () => void }> = (props) => {
    const { onClose } = props

    return (
        <motion.div
            className={styles.modalContainer}
            variants={ModalVariants}
            initial='closed'
            animate='open'
            exit='closed'
        >
            <div className={styles.modal}>
                <div className={styles.header}>
                    <span>Change Password</span>
                    <div
                        className={styles.close}
                        onClick={onClose}
                    >
                        <Image
                            src='/icons/close.svg'
                            height={24}
                            width={24}
                        />
                    </div>
                </div>
                <div className={styles.content}>
                    <PasswordField placeholder='Old Password' />
                    <PasswordField placeholder='New Password' />
                    <PasswordField placeholder='Repeat Password' />
                </div>
                <button>Save new password</button>
            </div>
        </motion.div>
    )
}

export default ProfileSettings