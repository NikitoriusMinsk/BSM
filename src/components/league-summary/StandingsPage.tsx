import styles from "../../styles/components/league-summary/StandingsPage.module.css"
import Image from "next/image";
import React, { useEffect, useState } from "react"
import StandingsFilter from "@components/ui/match-summary/StandingsFilter"
import { motion, AnimatePresence } from "framer-motion"
import useWindowSize from "src/utils/useWindowSize";
import StandigsMenuColumn from "@components/ui/match-summary/StandingsMenuColumn";
import Dropdown from "@components/ui/Dropdown";
import FilterModal from "@components/ui/FilterModal";
import dynamic from "next/dynamic";
import usePortal from "src/utils/usePortal";
import { PortalContext } from "src/utils/portalContext";

const OutPortal = dynamic(async () => (await import("react-reverse-portal")).OutPortal, {
    ssr: false,
});

const StandingsPage: React.FC = () => {
    const [selectedTable, setSelectedTable] = useState('1')
    const [selectedTableComponent, setSelectedTableComponent] = useState(<StandingsTable />)

    const changeTable = (
        item: {
            id: string | number,
            name: string
        }
    ) => {
        switch (item.id) {
            case '1':
                setSelectedTable('1')
                setSelectedTableComponent(<StandingsTable />)
                break;
            case '5':
                setSelectedTable('5')
                setSelectedTableComponent(<TopScorersTable />)
                break;
        }
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.filter}>
                <StandingsFilter
                    items={[
                        {
                            id: '1',
                            name: "Standings"
                        },
                        {
                            id: '2',
                            name: "Forms"
                        },
                        {
                            id: '3',
                            name: "Over/Under"
                        },
                        {
                            id: '4',
                            name: "HT/FT"
                        },
                        {
                            id: '5',
                            name: "Top Scorers"
                        }
                    ]}
                    onSelect={changeTable}
                />
            </div>
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    key={selectedTable ? selectedTable : "empty"}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                    {selectedTableComponent}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

const StandingsTable: React.FC = () => {
    const { width } = useWindowSize()
    const [selectedCol, setSelectedCol] = useState<{ value: string, id: string }>()

    return (
        <>
            <div className={styles.filtersInside}>
                <StandingsFilter
                    items={[
                        {
                            id: '1',
                            name: "Over"
                        },
                        {
                            id: '2',
                            name: "Home"
                        },
                        {
                            id: '3',
                            name: "Away"
                        }
                    ]}
                    onSelect={() => { }}
                />
            </div>
            {width <= 600 ?
                <table
                    className={styles.standingsTable}
                    cellPadding={10}
                    cellSpacing={0}
                >
                    <colgroup>
                        <col width="25" />
                        <col width="50%" />
                        <col width="50%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className={styles.teamHead}>Team</th>
                            <th>
                                <StandigsMenuColumn
                                    items={[{ id: '1', value: 'MP' }, { id: '2', value: 'Wins' }, { id: '3', value: 'Draws' }, { id: '4', value: 'Loses' }]}
                                    onSelect={setSelectedCol}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
                            <tr key={index}>
                                <td>1</td>
                                <td className={styles.teamCell}>
                                    <span>
                                        <div className={styles.teamLogo}>
                                            <Image
                                                src="/testimg/club1.png"
                                                width={20}
                                                height={20}
                                                style={{ objectFit: 'contain' }}
                                                alt=""
                                            />
                                        </div>
                                        Team Name
                                    </span>
                                </td>
                                <td>selected</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                :
                <table
                    className={styles.standingsTable}
                    cellPadding={10}
                    cellSpacing={0}
                >
                    <colgroup>
                        <col width="50" />
                        <col width="" />
                        <col width="50" />
                        <col width="50" />
                        <col width="50" />
                        <col width="50" />
                        <col width="50" />
                        <col width="50" />
                        <col width="60" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th><div>#</div></th>
                            <th className={styles.teamHead}>Team</th>
                            <th>MP</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>G</th>
                            <th className={styles.boldCell}>PTS</th>
                            <th>Form</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
                            <tr key={index}>
                                <td>1</td>
                                <td className={styles.teamCell}>
                                    <span>
                                        <div className={styles.teamLogo}>
                                            <Image
                                                src="/testimg/club1.png"
                                                width={20}
                                                height={20}
                                                style={{ objectFit: 'contain' }}
                                                alt=""
                                            />
                                        </div>
                                        Team Name
                                    </span>
                                </td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td className={styles.boldCell}>1</td>
                                <td>
                                    <div className={styles.form}>
                                        <div className={styles.questionBox}>
                                            ?
                                        </div>
                                        <div className={styles.winBox}>
                                            W
                                        </div>
                                        <div className={styles.loseBox}>
                                            L
                                        </div>
                                        <div className={styles.drawBox}>
                                            D
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
    )
}

const TopScorersTable: React.FC = () => {
    const { width } = useWindowSize()
    const portalNode = usePortal();
    const [selectedCol, setSelectedCol] = useState<{ value: string, id: string }>()

    return (
        <PortalContext.Provider value={{ portalNode }}>
            {portalNode && <OutPortal node={portalNode} />}
            <div className={styles.topScorers}>
                {width > 600 ?
                    <>
                        <div className={styles.scorersFilter}>
                            <Dropdown
                                items={[{ id: '0', name: 'All' }, { id: '1', name: '1' }, { id: '2', name: '2' }]}
                                onSelect={() => { }}
                                label="Team:"
                            />
                            <Dropdown
                                items={[{ id: '0', name: 'All' }, { id: '1', name: '1' }, { id: '2', name: '2' }]}
                                onSelect={() => { }}
                                label="Position:"
                            />
                            <Dropdown
                                items={[{ id: '0', name: 'All' }, { id: '1', name: '1' }, { id: '2', name: '2' }]}
                                onSelect={() => { }}
                                label="Nationality:"
                            />
                        </div>
                        <table
                            className={styles.topScorersTable}
                            cellPadding={10}
                            cellSpacing={0}
                        >
                            <colgroup>
                                <col width="50" />
                                <col width="" />
                                <col width="" />
                                <col width="50" />
                                <col width="50" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th className={styles.teamHead}>Player</th>
                                    <th>Team</th>
                                    <th>G</th>
                                    <th>A</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
                                    <tr key={index}>
                                        <td>1</td>
                                        <td className={styles.teamCell}>
                                            <span>
                                                <div className={styles.teamLogo}>
                                                    <Image
                                                        src="/testimg/club1.png"
                                                        width={20}
                                                        height={20}
                                                        style={{ objectFit: 'contain' }}
                                                        alt=""
                                                    />
                                                </div>
                                                Team Name
                                            </span>
                                        </td>
                                        <td>Club name</td>
                                        <td>1</td>
                                        <td>1</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                    :
                    <>
                        <div className={styles.filtersMobile}>
                            <div className={styles.filterBtnMobile}>
                                <FilterModal
                                    onApply={() => { }}
                                    portalNode={portalNode}
                                    filters={[
                                        {
                                            key: "team",
                                            type: "singleChoiceSeparatePage",
                                            label: "Team",
                                            customClass: styles.sportFilter,
                                            items: [
                                                { id: 0, label: "All" },
                                                { id: 1, label: "Man City" },
                                                { id: 2, label: "Real" },
                                                { id: 3, label: "PSG" },
                                            ],
                                        },
                                        {
                                            key: "nationality",
                                            type: "multipleChoiceSeparatePage",
                                            label: "Nationality",
                                            customClass: styles.sportFilter,
                                            items: [
                                                { id: 0, label: "All" },
                                                { id: 1, label: "Georgia" },
                                                { id: 2, label: "Armenia" },
                                                { id: 3, label: "Turkey" },
                                            ],
                                        },
                                        {
                                            key: "position",
                                            type: "multipleChoiceSeparatePage",
                                            label: "Position",
                                            customClass: styles.sportFilter,
                                            items: [
                                                { id: 0, label: "All" },
                                                { id: 1, label: "Forward" },
                                                { id: 2, label: "Midfielder" },
                                                { id: 3, label: "Defender" },
                                            ],
                                        },
                                    ]}
                                />
                            </div>
                            <button className={styles.resetBtnM}>Reset</button>
                        </div>
                        <table
                            className={styles.topScorersTable}
                            cellPadding={10}
                            cellSpacing={0}
                        >
                            <colgroup>
                                <col width="25" />
                                <col width="50%" />
                                <col width="50%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th className={styles.teamHead}>Player</th>
                                    <th>
                                        <StandigsMenuColumn
                                            items={[{ id: '1', value: 'Team' }, { id: '2', value: 'Goals' }, { id: '3', value: 'Assists' }]}
                                            onSelect={setSelectedCol}
                                        />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
                                    <tr key={index}>
                                        <td>1</td>
                                        <td className={styles.teamCell}>
                                            <span>
                                                <div className={styles.teamLogo}>
                                                    <Image
                                                        src="/testimg/club1.png"
                                                        width={20}
                                                        height={20}
                                                        style={{ objectFit: 'contain' }}
                                                        alt=""
                                                    />
                                                </div>
                                                Player name
                                            </span>
                                        </td>
                                        <td>Club name</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                }

            </div>
        </PortalContext.Provider>
    )
}

export default StandingsPage