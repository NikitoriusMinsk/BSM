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
import { createColumnHelper } from "@tanstack/react-table";
import AdaptiveTable from "@components/ui/AdaptiveTable";

const OutPortal = dynamic(async () => (await import("react-reverse-portal")).OutPortal, {
    ssr: false,
});

const dataset = [
    {
        "position": 1,
        "team": "Penza",
        "mp": 6,
        "w": 10,
        "d": 2,
        "l": 5,
        "tp": "123:22",
        "pts": 20,
        "form": ["L", "W", "D", "L", "D"]
    },
    {
        "position": 2,
        "team": "Izmail",
        "mp": "0",
        "w": 6,
        "d": 2,
        "l": 9,
        "tp": "123:22",
        "pts": 19,
        "form": ["L", "W", "D", "L", "D"]
    },
    {
        "position": 3,
        "team": "Lima",
        "mp": 5,
        "w": 5,
        "d": 2,
        "l": 9,
        "tp": "123:22",
        "pts": 18,
        "form": ["L", "W", "D", "L", "D"]
    },
    {
        "position": 4,
        "team": "Eugene",
        "mp": 5,
        "w": 7,
        "d": 2,
        "l": 9,
        "tp": "123:22",
        "pts": 17,
        "form": ["L", "W", "D", "L", "D"]
    },
    {
        "position": 5,
        "team": "Valparaíso de Goiás",
        "mp": 6,
        "w": 3,
        "d": 2,
        "l": 7,
        "tp": "123:22",
        "pts": 16,
        "form": ["L", "W", "D", "L", "D"]
    },
    {
        "position": 6,
        "team": "Bundaberg",
        "mp": 4,
        "w": 2,
        "d": 2,
        "l": 4,
        "tp": "123:22",
        "pts": 15,
        "form": ["L", "W", "D", "L", "D"]
    },
    {
        "position": 7,
        "team": "Istanbul",
        "mp": 4,
        "w": 6,
        "d": 2,
        "l": 8,
        "tp": "123:22",
        "pts": 14,
        "form": ["L", "W", "D", "L", "D"]
    },
    {
        "position": 8,
        "team": "Houthalen-Helchteren",
        "mp": 5,
        "w": 4,
        "d": 2,
        "l": 4,
        "tp": "123:22",
        "pts": 13,
        "form": ["L", "W", "D", "L", "D"]
    },
    {
        "position": 9,
        "team": "Warri",
        "mp": 5,
        "w": 8,
        "d": 2,
        "l": 4,
        "tp": "123:22",
        "pts": 12,
        "form": ["L", "W", "D", "L", "D"]
    },
    {
        "position": 10,
        "team": "Marchienne-au-Pont",
        "mp": 7,
        "w": 5,
        "d": 2,
        "l": 4,
        "tp": "123:22",
        "pts": 11,
        "form": ["L", "W", "D", "L", "D"]
    }
]

const columnHelper =
    createColumnHelper<typeof dataset[0]>();

const columns = [
    columnHelper.accessor("position", {
        header: () => '#',
        cell: info => info.renderValue(),
        enableSorting: true,
    }),
    columnHelper.accessor("team", {
        header: () => (
            <div className={styles.teamHead}>
                Team
            </div>
        ),
        cell: info => (
            <div className={styles.teamCell}>
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
                    {info.getValue()}
                </span>
            </div>
        ),
        enableSorting: false
    }),
    columnHelper.accessor("mp", {
        header: () => 'MP',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelper.accessor("w", {
        header: () => 'W',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelper.accessor("d", {
        header: () => 'D',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelper.accessor("l", {
        header: () => 'L',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelper.accessor("tp", {
        header: () => 'TP',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelper.accessor("pts", {
        header: () => (
            <div className={styles.boldCell}>
                PTS
            </div>
        ),
        cell: (info) => (
            <div className={styles.boldCell}>
                {info.renderValue()}
            </div>
        ),
        enableSorting: false
    }),
    columnHelper.accessor("form", {
        header: () => 'Form',
        cell: info => (
            <div className={styles.form}>
                {info.getValue().map((res, index) => {
                    switch (res) {
                        case 'W':
                            return <div className={styles.winBox} key={info.row.getValue('position') + "-" + index}>
                                W
                            </div>
                            break;
                        case 'D':
                            return <div className={styles.drawBox} key={info.row.getValue('position') + "-" + index}>
                                D
                            </div>
                            break;
                        case 'L':
                            return <div className={styles.loseBox} key={info.row.getValue('position') + "-" + index}>
                                L
                            </div>
                            break;
                        default:
                            break;
                    }
                })}
            </div>
        ),
        enableSorting: false
    })
];

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
    const [selectedCol, setSelectedCol] = useState<{ value: string, id: string, column: string }>({ id: '5', value: 'Points', column: 'pts' })

    const columnsMobile = [
        columnHelper.accessor("position", {
            header: () => '#',
            cell: info => info.renderValue(),
            enableSorting: true,
        }),
        columnHelper.accessor("team", {
            header: () => (
                <div className={styles.teamHead}>
                    Team
                </div>
            ),
            cell: info => (
                <div className={styles.teamCell}>
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
                        {info.getValue()}
                    </span>
                </div>
            ),
            enableSorting: false
        }),
        columnHelper.accessor(selectedCol.column as keyof typeof dataset[0], {
            header: () => <StandigsMenuColumn
                items={[
                    { id: '1', value: 'MP', column: 'mp' },
                    { id: '2', value: 'Wins', column: 'w' },
                    { id: '3', value: 'Draws', column: 'd' },
                    { id: '4', value: 'Loses', column: 'l' },
                    { id: '5', value: 'Points', column: 'pts' },
                    { id: '6', value: 'Form', column: 'form' }
                ]}
                onSelect={selectCol}
                selectedItem={selectedCol}
            />,
            cell: info => {
                if (selectedCol.column == 'form')
                    return (<div className={styles.form}>
                        {[info.getValue()].flat().map((res, index) => {
                            switch (res) {
                                case 'W':
                                    return <div className={styles.winBox} key={info.row.getValue('position') + "-" + index}>
                                        W
                                    </div>
                                    break;
                                case 'D':
                                    return <div className={styles.drawBox} key={info.row.getValue('position') + "-" + index}>
                                        D
                                    </div>
                                    break;
                                case 'L':
                                    return <div className={styles.loseBox} key={info.row.getValue('position') + "-" + index}>
                                        L
                                    </div>
                                    break;
                                default:
                                    break;
                            }
                        })}
                    </div>)
                else
                    return info.renderValue()
            },
            enableSorting: false,
        }),
    ]

    const selectCol = (col?: { value: string, id: string, column: string }) => {
        setSelectedCol(col || { id: '5', value: 'Points', column: 'pts' })
    }

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
                    alternativeStyle
                />
            </div>
            {width <= 600 ?
                <AdaptiveTable
                    data={dataset}
                    columns={columnsMobile}
                    tableClass={styles.standingsTable}
                    sortable
                    colgroup={
                        <colgroup>
                            <col width="25" />
                            <col width="50%" />
                            <col width="50%" />
                        </colgroup>
                    }
                    cellPadding={10}
                    cellSpacing={0}
                />
                :
                <AdaptiveTable
                    data={dataset}
                    columns={columns}
                    tableClass={styles.standingsTable}
                    sortable
                    colgroup={
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
                    }
                    cellPadding={10}
                    cellSpacing={0}
                />
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
                                        {/* <StandigsMenuColumn
                                            items={[{ id: '1', value: 'Team' }, { id: '2', value: 'Goals' }, { id: '3', value: 'Assists' }]}
                                            onSelect={setSelectedCol}
                                        /> */}
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