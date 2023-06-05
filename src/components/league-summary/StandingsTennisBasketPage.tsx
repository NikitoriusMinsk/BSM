import styles from "../../styles/components/league-summary/StandingsTennisBasketPage.module.css"
import Image from "next/image";
import React, { useEffect, useState } from "react"
import StandingsFilter from "@components/ui/match-summary/StandingsFilter"
import { motion, AnimatePresence } from "framer-motion"
import useWindowSize from "src/utils/useWindowSize";
import StandigsMenuColumn from "@components/ui/match-summary/StandingsMenuColumn";
import PlayoffBracket from "@components/ui/league-summary/PlayoffBracket";
import { createColumnHelper } from "@tanstack/react-table";
import AdaptiveTable from "@components/ui/AdaptiveTable";

const StandingsTennisBasketPage: React.FC = () => {
    const [selectedTable, setSelectedTable] = useState('1')
    const [selectedTableComponent, setSelectedTableComponent] = useState(<MainTable />)

    const changeTable = (
        item: {
            id: string | number,
            name: string
        }
    ) => {
        switch (item.id) {
            case '1':
                setSelectedTable('1')
                setSelectedTableComponent(<MainTable />)
                break;
            case '2':
                setSelectedTable('2')
                setSelectedTableComponent(<PlayoffsTable />)
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
                            name: "Main"
                        },
                        {
                            id: '2',
                            name: "Playoffs"
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

const MainTable: React.FC = () => {
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
            case '2':
                setSelectedTable('2')
                setSelectedTableComponent(<FormTable />)
                break;
        }
    }

    return (
        <>
            <div className={styles.filtersInside}>
                <StandingsFilter
                    items={[
                        {
                            id: '1',
                            name: "Standings"
                        },
                        {
                            id: '2',
                            name: "Form"
                        }
                    ]}
                    onSelect={changeTable}
                    alternativeStyle
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
        </>
    )
}

const PlayoffsTable: React.FC = () => {

    return (
        <PlayoffBracket />
    )
}

const dataset = [
    {
        "position": 1,
        "team": "Penza",
        "mp": 6,
        "w": 10,
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

const StandingsTable: React.FC = () => {
    const { width } = useWindowSize()
    const [selectedCol, setSelectedCol] = useState<{ value: string, id: string, column: string }>({ id: '4', value: 'Points', column: 'pts' })

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
                    { id: '3', value: 'Loses', column: 'l' },
                    { id: '4', value: 'Points', column: 'pts' },
                    { id: '5', value: 'Form', column: 'form' }
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
        setSelectedCol(col || { id: '4', value: 'Points', column: 'pts' })
    }

    return (
        <>
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

const FormTable: React.FC = () => {
    const { width } = useWindowSize()

    return (
        <>

        </>
    )
}

export default StandingsTennisBasketPage