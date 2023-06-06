import styles from "../../styles/components/match-summary/MatchTennisBasketPage.module.css"
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react"
import MatchFilter from "@components/ui/match-summary/MatchFilter";
import { useDraggable } from "react-use-draggable-scroll";
import { motion, AnimatePresence } from "framer-motion";
import useWindowSize from "src/utils/useWindowSize";
import StandigsMenuColumn from "@components/ui/match-summary/StandingsMenuColumn";
import StatBars from "@components/ui/StatBars";
import Lineup from "@components/ui/Lineup";
import { createColumnHelper } from "@tanstack/react-table"
import AdaptiveTable from "@components/ui/AdaptiveTable"

const MatchTennisBasketPage: React.FC<{ type: string }> = ({ type }) => {
    const sliderRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(sliderRef);

    const [selectedTable, setSelectedTable] = useState('1')
    const [selectedTableComponent, setSelectedTableComponent] = useState(<SummaryTable type={type} />)

    const changeTable = (
        item: {
            id: string | number,
            name: string
        }
    ) => {
        switch (item.id) {
            case '1':
                setSelectedTable('1')
                setSelectedTableComponent(<SummaryTable type={type} />)
                break;
            case '2':
                setSelectedTable('2')
                setSelectedTableComponent(<StatsTable />)
                break;
            case '3':
                setSelectedTable('3')
                setSelectedTableComponent(<LineupTable />)
                break;
        }
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.filter} {...events} ref={sliderRef}>
                <MatchFilter
                    items={type == 'tennis' ? [
                        {
                            id: '1',
                            name: "Summary"
                        },
                        {
                            id: '2',
                            name: "Statistics"
                        }
                    ]
                        :
                        [
                            {
                                id: '1',
                                name: "Summary"
                            },
                            {
                                id: '2',
                                name: "Statistics"
                            },
                            {
                                id: '3',
                                name: "Lineup"
                            }
                        ]
                    }
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


const datasetBook = [
    {
        bookmaker: {},
        odds: {
            "1": 3.22,
            'x': 5,
            "2": 1.78
        }
    },
    {
        bookmaker: {},
        odds: {
            "1": 3.20,
            "x": 5.10,
            "2": 1.67
        }
    },
    {
        bookmaker: {},
        odds: {
            "1": 3.10,
            "x": 4,
            "2": 1.22
        }
    },
]

const columnHelperBook =
    createColumnHelper<typeof datasetBook[0]>();

const columnsBook = [
    columnHelperBook.accessor("bookmaker", {
        header: () => (
            <span style={{ whiteSpace: 'nowrap' }}>
                Pre-match Odds
            </span>
        ),
        cell: info => (
            <div className={styles.logo}>
                <Image
                    src="/images/bookmaker-placeholder-3.png"
                    width={130}
                    height={40}
                    style={{ objectFit: 'contain', objectPosition: "center center" }}
                    alt=""
                />
            </div>
        ),
        enableSorting: false
    }),
    columnHelperBook.accessor("odds.1", {
        header: () => '',
        cell: info => (
            <div className={styles.bet}>
                <span>
                    1
                </span>
                <div className={styles.centerArrow}>
                    <Image
                        src="/icons/arrow-narrow-up.svg"
                        width={24}
                        height={24}
                        style={{ objectFit: 'contain', objectPosition: "center center" }}
                        alt=""
                    />
                </div>
                <span>
                    {info.getValue()}
                </span>
            </div>
        ),
        enableSorting: false
    }),
    columnHelperBook.accessor("odds.x", {
        header: () => '',
        cell: info => (
            <div className={styles.bet}>
                <span>
                    X
                </span>
                <div className={styles.centerArrow}>

                </div>
                <span>
                    {info.getValue()}
                </span>
            </div>
        ),
        enableSorting: false
    }),
    columnHelperBook.accessor("odds.2", {
        header: () => '',
        cell: info => (
            <div className={styles.bet}>
                <span>
                    2
                </span>
                <div className={styles.centerArrow}>
                    <Image
                        src="/icons/arrow-narrow-down.svg"
                        width={24}
                        height={24}
                        style={{ objectFit: 'contain', objectPosition: "center center" }}
                        alt=""
                    />
                </div>
                <span>
                    {info.getValue()}
                </span>
            </div>
        ),
        enableSorting: false
    })
];

const datasetSumBasket = [
    {
        "team": "Beerzel",
        "sum": 44,
        "p1": 7,
        "p2": 3,
        "p3": 12,
        "p4": 22
    },
    {
        "team": "El Salvador",
        "sum": 81,
        "p1": 15,
        "p2": 13,
        "p3": 15,
        "p4": 3
    }
]

const columnHelperSumBasket =
    createColumnHelper<typeof datasetSumBasket[0]>();

const columnsSumBasket = [
    columnHelperSumBasket.accessor("team", {
        header: () => 'Score',
        cell: info => {
            if (info.row.index == 0) {
                return (
                    <div
                        className={
                            `${styles.player}` +
                            ` ${(datasetSumBasket[info.row.index]!.sum - datasetSumBasket[info.row.index + 1]!.sum) > 0 && styles.win}`
                        }
                    >
                        <span>
                            {info.getValue()}
                        </span>
                    </div>
                )
            }
            else {
                return (
                    <div
                        className={
                            `${styles.player}` +
                            ` ${(datasetSumBasket[info.row.index]!.sum - datasetSumBasket[info.row.index - 1]!.sum) > 0 && styles.win}`
                        }
                    >
                        <span>
                            {info.getValue()}
                        </span>
                    </div>
                )
            }
        },
        enableSorting: false
    }),
    columnHelperSumBasket.accessor("sum", {
        header: () => '',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelperSumBasket.accessor("p1", {
        header: () => '',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelperSumBasket.accessor("p2", {
        header: () => '',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelperSumBasket.accessor("p3", {
        header: () => '',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelperSumBasket.accessor("p4", {
        header: () => '',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
];

const datasetStat = [
    {
        "player": "Player1",
        "team": "TOR",
        "pts": 20,
        "reb": 1,
        "ast": 1,
        "min": 1,
        "fgm": 1,
        "fga": 1,
        "2pm": 1,
        "2pa": 1,
        "3pm": 1,
        "3pa": 1,
        "ftm": 1,
        "fta": 1,
        "+/-": 1
    },
    {
        "player": "Player2",
        "team": "DAL",
        "pts": 24,
        "reb": 1,
        "ast": 1,
        "min": 1,
        "fgm": 1,
        "fga": 1,
        "2pm": 1,
        "2pa": 1,
        "3pm": 1,
        "3pa": 1,
        "ftm": 1,
        "fta": 1,
        "+/-": 1
    },
    {
        "player": "Player3",
        "team": "TOR",
        "pts": 10,
        "reb": 1,
        "ast": 1,
        "min": 1,
        "fgm": 1,
        "fga": 1,
        "2pm": 1,
        "2pa": 1,
        "3pm": 1,
        "3pa": 1,
        "ftm": 1,
        "fta": 1,
        "+/-": 1
    },
]

const columnHelperStat =
    createColumnHelper<typeof datasetStat[0]>();

const columnsStat = [
    columnHelperStat.accessor("player", {
        header: () => 'Player',
        cell: info => (
            <div className={styles.player}>
                <Image
                    src={'/icons/wide-flags/es.png'}
                    width={30}
                    height={22}
                    alt=""
                    style={{ objectFit: 'contain' }}
                />
                <span>
                    {info.getValue()}
                </span>
            </div>
        ),
        enableSorting: false
    }),
    columnHelperStat.accessor("team", {
        header: () => 'Team',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelperStat.accessor("pts", {
        header: () => 'PTS',
        cell: info => info.renderValue(),
        enableSorting: true,
    }),
    columnHelperStat.accessor("reb", {
        header: () => 'REB',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelperStat.accessor("ast", {
        header: () => 'AST',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelperStat.accessor("min", {
        header: () => 'MIN',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelperStat.accessor("fgm", {
        header: () => 'FGM',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelperStat.accessor("fga", {
        header: () => 'FGA',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelperStat.accessor("2pm", {
        header: () => '2PM',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelperStat.accessor("2pa", {
        header: () => '2PA',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelperStat.accessor("3pm", {
        header: () => '3PM',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelperStat.accessor("3pa", {
        header: () => '3PA',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelperStat.accessor("ftm", {
        header: () => 'FTM',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelperStat.accessor("fta", {
        header: () => 'FTA',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
    columnHelperStat.accessor("+/-", {
        header: () => '+/-',
        cell: info => info.renderValue(),
        enableSorting: false
    }),
];

const SummaryTable: React.FC<{ type: string }> = ({ type }) => {
    const { width } = useWindowSize()
    const [selectedCol, setSelectedCol] = useState<{ value: string, id: string, column: string }>({ id: '1', value: 'PTS', column: 'pts' })

    const selectCol = (col?: { id: string, value: string, column: string }) => {
        setSelectedCol(col || { id: '1', value: 'PTS', column: 'pts' })
    }

    const columnsStatMob = [
        columnHelperStat.accessor("player", {
            header: () => 'Player',
            cell: info => (
                <div className={styles.player}>
                    <Image
                        src={'/icons/wide-flags/es.png'}
                        width={30}
                        height={22}
                        alt=""
                        style={{ objectFit: 'contain' }}
                    />
                    <span>
                        {info.getValue()}
                    </span>
                </div>
            ),
            enableSorting: false
        }),
        columnHelperStat.accessor("team", {
            header: () => 'Team',
            cell: info => info.renderValue(),
            enableSorting: false
        }),
        columnHelperStat.accessor(selectedCol.column as keyof typeof datasetStat[0], {
            header: () => (
                <StandigsMenuColumn
                    items={[
                        { id: '1', value: 'PTS', column: 'pts' },
                        { id: '2', value: 'REB', column: 'reb' },
                        { id: '3', value: 'AST', column: 'ast' },
                        { id: '4', value: 'MIN', column: 'min' },
                        { id: '5', value: 'FGM', column: 'fgm' },
                        { id: '6', value: 'FGA', column: 'fga' },
                        { id: '7', value: '2PM', column: '2pm' },
                        { id: '8', value: '2PA', column: '2pa' },
                        { id: '9', value: '3PM', column: '3pm' },
                        { id: '10', value: '3PA', column: '3pa' },
                        { id: '11', value: 'FTM', column: 'ftm' },
                        { id: '12', value: 'FTA', column: 'fta' },
                        { id: '13', value: '+/-', column: '+/-' }
                    ]}
                    onSelect={selectCol}
                    selectedItem={selectedCol}
                />
            ),
            cell: info => info.renderValue(),
            enableSorting: false
        })
    ];

    if (type == 'tennis')
        return (
            <div className={styles.summaryContainer}>
                <table className={styles.tableSummary} cellSpacing={0}>
                    <colgroup>
                        <col width="" />
                        <col width="45" />
                        <col width="45" />
                        <col width="45" />
                        <col width="45" />
                    </colgroup>
                    <thead>
                        <tr className={styles.header}>
                            <th>
                                Score
                            </th>
                            <th>
                            </th>
                            <th>
                            </th>
                            <th>
                            </th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className={`${styles.player} ${true && styles.win}`}>
                                    <Image
                                        src={'/icons/wide-flags/es.png'}
                                        width={30}
                                        height={22}
                                        alt=""
                                        style={{ objectFit: 'contain' }}
                                    />
                                    <span>
                                        Player name
                                    </span>
                                </div>
                            </td>
                            <td>
                                2
                            </td>
                            <td>
                                <div className={styles.tennisScore}>
                                    {/* big num */}
                                    <span>7</span>
                                    {/* small num */}
                                    <span>6</span>
                                </div>
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={`${styles.player} ${false && styles.win}`}>
                                    <Image
                                        src={'/icons/wide-flags/es.png'}
                                        width={30}
                                        height={22}
                                        alt=""
                                        style={{ objectFit: 'contain' }}
                                    />
                                    <span>
                                        Player name
                                    </span>
                                </div>
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                1
                            </td>
                        </tr>
                        <tr className={styles.timeRow}>
                            <td>
                                MATCH TIME:
                            </td>
                            <td>
                                1:00
                            </td>
                            <td>
                                1:00
                            </td>
                            <td>
                                1:00
                            </td>
                            <td>
                                1:00
                            </td>
                        </tr>
                    </tbody>
                </table>
                <AdaptiveTable
                    data={datasetBook}
                    columns={columnsBook}
                    tableClass={styles.bookmakersTable}
                    colgroup={
                        <colgroup>
                            <col width="" />
                            <col width="80" />
                            <col width="80" />
                            <col width="80" />
                        </colgroup>
                    }
                    cellSpacing={0}
                />
                <div className={styles.infoLink}>
                    <span className={styles.infoTitle}>
                        Match Information
                    </span>
                    <span className={styles.infoUrl}>
                        <Image
                            src="/icons/pick.svg"
                            width={20}
                            height={20}
                            alt=""
                        />
                        WWK Arena (Augsburg)
                    </span>
                </div>
            </div>
        )
    if (type == 'basketball')
        return (
            <div className={styles.summaryContainer}>
                <AdaptiveTable
                    data={datasetSumBasket}
                    columns={columnsSumBasket}
                    tableClass={styles.tableSummary}
                    colgroup={
                        <colgroup>
                            <col width="" />
                            <col width="30" />
                            <col width="30" />
                            <col width="30" />
                            <col width="30" />
                            <col width="30" />
                        </colgroup>
                    }
                    cellSpacing={0}
                />
                <div className={styles.playerStats}>
                    <span className={styles.playerStatTitle}>Player statistics</span>
                    {width <= 600 ?
                        <AdaptiveTable
                            data={datasetStat}
                            columns={columnsStatMob}
                            tableClass={styles.tableSummary}
                            colgroup={
                                <colgroup>
                                    <col width="" />
                                </colgroup>
                            }
                            cellSpacing={0}
                        />
                        :
                        <AdaptiveTable
                            data={datasetStat}
                            columns={columnsStat}
                            tableClass={styles.tableSummary}
                            sortable
                            colgroup={
                                <colgroup>
                                    <col width="" />
                                    <col width="60" />
                                    <col width="60" />
                                    <col width="60" />
                                    <col width="60" />
                                    <col width="60" />
                                    <col width="60" />
                                    <col width="60" />
                                    <col width="60" />
                                    <col width="60" />
                                    <col width="60" />
                                    <col width="60" />
                                    <col width="60" />
                                    <col width="60" />
                                    <col width="60" />
                                </colgroup>
                            }
                            cellSpacing={0}
                        />
                    }
                </div>
                <AdaptiveTable
                    data={datasetBook}
                    columns={columnsBook}
                    tableClass={styles.bookmakersTable}
                    colgroup={
                        <colgroup>
                            <col width="" />
                            <col width="80" />
                            <col width="80" />
                            <col width="80" />
                        </colgroup>
                    }
                    cellSpacing={0}
                />
                <div className={styles.infoLink}>
                    <span className={styles.infoTitle}>
                        Match Information
                    </span>
                    <span className={styles.infoUrl}>
                        <Image
                            src="/icons/pick.svg"
                            width={20}
                            height={20}
                            alt=""
                        />
                        WWK Arena (Augsburg)
                    </span>
                </div>
            </div>
        )
    return (
        <></>
    )
}

const StatsTable: React.FC = () => {
    return (
        <StatBars>
            <StatBars.Title title={'Test'} />
            <StatBars.Bar leftPercent={60} rightPercent={40} label={'Test'} />
            <StatBars.Bar leftPercent={60} rightPercent={40} label={'Test'} />
            <StatBars.Bar leftPercent={60} rightPercent={40} label={'Test'} />
            <StatBars.Bar leftPercent={60} rightPercent={40} label={'Test'} />
            <StatBars.Title title={'Test'} />
            <StatBars.Bar leftPercent={60} rightPercent={40} label={'Test'} />
            <StatBars.Bar leftPercent={60} rightPercent={40} label={'Test'} />
            <StatBars.Bar leftPercent={60} rightPercent={40} label={'Test'} />
            <StatBars.Bar leftPercent={60} rightPercent={40} label={'Test'} />
        </ StatBars>
    )
}

const LineupTable: React.FC = () => {
    return (
        <Lineup>
            <Lineup.Squad title="Team 1" logoUrl="1">
                <Lineup.SquadTitle title="test" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Keeper" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.SquadTitle title="test" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Keeper" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
            </Lineup.Squad>
            <Lineup.Squad title="Team 2" logoUrl="2">
                <Lineup.SquadTitle title="test" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Keeper" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.SquadTitle title="test" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Keeper" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
                <Lineup.Player number={1} name="test" countryFlag='1' position="Field" />
            </Lineup.Squad>
        </Lineup>
    )
}

export default MatchTennisBasketPage