import styles from "../../styles/components/match-summary/BookmakersPage.module.css"
import Image from "next/image";
import React, { useEffect, useState } from "react"
import { createColumnHelper } from "@tanstack/react-table"
import AdaptiveTable from "@components/ui/AdaptiveTable"

const dataset = [
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

const columnHelper =
    createColumnHelper<typeof dataset[0]>();

const columns = [
    columnHelper.accessor("bookmaker", {
        header: () => 'Bookmakers',
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
    columnHelper.accessor("odds.1", {
        header: () => '1',
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
        enableSorting: true
    }),
    columnHelper.accessor("odds.x", {
        header: () => 'X',
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
        enableSorting: true
    }),
    columnHelper.accessor("odds.2", {
        header: () => '2',
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
        enableSorting: true
    })
];

const BookmakersPage: React.FC = () => {

    return (
        <div className={styles.pageContainer}>
            <AdaptiveTable
                data={dataset}
                columns={columns}
                tableClass={styles.bookmakersTable}
                sortable
                colgroup={
                    <colgroup>
                        <col width="" />
                        <col width="50" />
                        <col width="50" />
                        <col width="50" />
                    </colgroup>
                }
                cellSpacing={0}
            />
        </div>
    )
}

export default BookmakersPage