import { NextPage } from 'next'
import React, { ChangeEvent, ChangeEventHandler, useMemo, useState, VoidFunctionComponent } from 'react'
import styles from '@styles/pages/AddTip.module.css'
import Image from 'next/image'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { Matches, Sports } from 'src/types/queryTypes'
import { trpc } from 'src/utils/trpc'
import debounce from 'src/utils/debounce'
import * as portals from 'react-reverse-portal'
import { PortalContext } from 'src/utils/portalContext'
import { AnimatePresence, motion } from 'framer-motion'
import DateInput from '@components/ui/DatePicker'

// TODO
// fix prop drilling

const AddTip: NextPage = () => {
    const { data: sports, isLoading: sportsLoading } = trpc.useQuery(['filters.getSports'])
    const portalNode = useMemo(() => {
        if (typeof window === "undefined") {
            return null;
        }
        return portals.createHtmlPortalNode({
            attributes: {
                style: "position: absolute; top: 0; left: 0;"
            }
        });
    }, []);

    if (sportsLoading) {
        return <div>Loading...</div>
    }

    if (!sports) {
        return <div>Error...</div>
    }

    return (
        <>
            <PortalContext.Provider value={{ portalNode: portalNode }}>
                {portalNode && <portals.OutPortal node={portalNode} />}
                <div className={styles.mainBlock}>
                    <div className={styles.background}>
                        <Image
                            src='/images/add-tip-background.png'
                            layout='fill'
                            objectFit='cover'
                        />
                    </div>
                    <div className={styles.content}>
                        <h2>OPTIMO</h2>
                        <div className={styles.progress}>
                            <div className={styles.progressBarContainer}>
                                <CircularProgressbarWithChildren
                                    value={1}
                                    maxValue={3}
                                    styles={{
                                        path: {
                                            strokeWidth: '10px',
                                            stroke: '#7F3FFC'
                                        },
                                        trail: {
                                            strokeWidth: '9px',
                                            stroke: '#FFFFFF'
                                        },
                                    }}
                                    className={styles.progressBar}
                                >
                                    <span className={styles.progressText}><b>1</b>/3</span>
                                </CircularProgressbarWithChildren>
                            </div>
                            <div className={styles.stepText}>
                                <span>Find Event</span>
                                <span>Use the search bar</span>
                            </div>
                            <SearchBar sports={sports} />
                        </div>
                    </div>
                    <span className={styles.disclaimer}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Etiam nisi quam, pretium imperdiet erat nec, malesuada
                        scelerisque arcu. Proin quis varius orci. Donec ut
                        suscipit orci.
                    </span>
                </div>
            </PortalContext.Provider>
        </>
    )
}

const SearchBar: React.FC<{ sports: Sports }> = (props) => {
    const { sports } = props
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedSports, setSelectedSports] = useState<string[]>([])
    const { data: searchResults, refetch } = trpc.useQuery(['matches.search', { searchString: searchValue }])

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        if (value === '') return
        setSearchValue(value)
        refetch()
    }

    return (
        <div className={styles.searchBarContainer}>
            <div className={styles.filterContainer}>
                <Filter
                    sports={sports}
                    onChange={(ids) => setSelectedSports(ids)}
                    defaultSelected={selectedSports}
                />
            </div>
            <input
                className={styles.searchBar}
                placeholder='Search for match'
                onChange={debounce(handleSearch, 1000)}
            />
            {searchResults &&
                <div className={styles.results}>
                    {searchResults.map(({ sport, date, teams, league }, index) => (
                        <div
                            key={`result_${index}`}
                            className={styles.result}
                        >
                            <div className={styles.league}>
                                <Image
                                    src={sport.image}
                                    height={24}
                                    width={24}
                                />
                                <div className={styles.info}>
                                    <span>{sport.name}</span>
                                    <span>{league}</span>
                                </div>
                            </div>
                            <div className={styles.time}>
                                {date}
                            </div>
                            <div className={styles.teams}>
                                <div className={styles.images}>
                                    {teams.map(({ image }) => (
                                        <div className={styles.image}>
                                            <Image
                                                src={image}
                                                height={36}
                                                width={36}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.names}>
                                    {teams.map(({ name }) => (
                                        <span className={styles.name}>
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
            <button className={styles.searchButton}>
                <Image
                    src='/icons/search-white.svg'
                    height={24}
                    width={24}
                />
            </button>
        </div>
    )
}

const Filter: React.FC<{ sports: Sports, onChange: (ids: string[]) => void, defaultSelected: string[] }> = (props) => {
    const { sports, onChange, defaultSelected } = props
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <PortalContext.Consumer>
                {({ portalNode }) => portalNode &&
                    <portals.InPortal node={portalNode}>
                        <AnimatePresence initial={false}>
                            {isOpen &&
                                <FilterModal
                                    sports={sports}
                                    onClose={() => setIsOpen(false)}
                                    onChange={(ids) => onChange(ids)}
                                    defaultSelected={defaultSelected}
                                />
                            }
                        </AnimatePresence>
                    </portals.InPortal>
                }
            </PortalContext.Consumer>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`${styles.filter} ${isOpen && styles.open}`}
            >
                <Image
                    src={isOpen ? '/icons/filter-white.svg' : '/icons/filter.svg'}
                    height={24}
                    width={24}
                />
                Filter
            </div>
        </>
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

const FilterModal: React.FC<{ sports: Sports, onClose: () => void, onChange: (ids: string[]) => void, defaultSelected: string[] }> = (props) => {
    const { sports, onClose, onChange, defaultSelected } = props
    const [selectedItems, setSelectedItems] = useState<string[]>(defaultSelected)

    function handleSelect(id: string) {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id))
            onChange(selectedItems.filter(item => item !== id))
        } else {
            setSelectedItems([...selectedItems, id])
            onChange([...selectedItems, id])
        }
    }

    function handleClear() {
        setSelectedItems([])
        onChange([])
    }

    return (
        <motion.div
            className={styles.filterModal}
            variants={ModalVariants}
            initial='closed'
            animate='open'
            exit='closed'
        >
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h4>Filter</h4>
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
                <div className={styles.block}>
                    <h5>CHOOSE SPORT</h5>
                    <div className={styles.sports}>
                        {sports.map(({ name, id }) => (
                            <div
                                className={styles.sport}
                                onClick={() => handleSelect(id)}
                                key={`sport_${id}`}
                            >
                                <span>
                                    {name}
                                </span>
                                <input
                                    type={'checkbox'}
                                    checked={selectedItems.includes(id)}
                                    readOnly
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.block}>
                    <h5>CHOOSE DATE</h5>
                    <DateInput onChange={() => { }} />
                </div>
                <div className={styles.buttons}>
                    <button
                        className={styles.clear}
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                    <button
                        className={styles.apply}
                        onClick={onClose}
                    >
                        Apply
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default AddTip