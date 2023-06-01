import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    Table,
    useReactTable,
} from "@tanstack/react-table";
import styles from "@styles/components/ui/AdaptiveTable.module.css";
import Image from "next/image";

interface TableProps {
    data: any[];
    columns: ColumnDef<any, any>[];
    header?: boolean;
    sortable?: boolean;
    pagination?: boolean;
    pageSize?: number;
    colgroup?: ReactNode;
    tableClass?: string;
    cellPadding?: number;
    cellSpacing?: number;
}

const AdaptiveTable: React.FC<TableProps> = (props) => {
    const {
        data,
        pageSize,
        columns,
        header = true,
        sortable = false,
        pagination = true,
        colgroup = <></>,
        tableClass,
        cellPadding,
        cellSpacing
    } = props;
    const _pageSize = pageSize ?? 20;
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
        getSortedRowModel: sortable ? getSortedRowModel() : undefined,
        initialState: {
            pagination: {
                pageSize: _pageSize,
            },
        },
    });

    return (
        <>
            <table
                className={tableClass}
                cellPadding={cellPadding}
                cellSpacing={cellSpacing}
            >
                {colgroup}
                {header && (
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    {...{
                                                        className:
                                                            header.column.getCanSort()
                                                                ? styles.sortable
                                                                : "",
                                                        onClick:
                                                            header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        desc: (
                                                            <Image
                                                                src="/icons/sort-chevron.svg"
                                                                height={6}
                                                                width={10}
                                                                className={
                                                                    styles.sortAsc
                                                                }
                                                                alt=""
                                                            />
                                                        ),
                                                        asc: (
                                                            <Image
                                                                src="/icons/sort-chevron.svg"
                                                                height={6}
                                                                width={10}
                                                                className={
                                                                    styles.sortDesc
                                                                }
                                                                alt=""
                                                            />
                                                        ),
                                                    }[
                                                        header.column.getIsSorted() as string
                                                    ] ?? (header.column.getCanSort() && (
                                                        <Image
                                                            src="/icons/sort-chevron.svg"
                                                            height={6}
                                                            width={10}
                                                            className={
                                                                styles.sortDesc
                                                            }
                                                            alt=""
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                )}
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {pagination && (
                <Pagination
                    table={table}
                    pageCount={Math.ceil(data.length / _pageSize)}
                />
            )}
        </>
    );
};

const Pagination: React.FC<{ table: Table<any>; pageCount: number }> = (
    props
) => {
    const { table, pageCount } = props;
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pages, setPages] = useState<ReactElement[]>();

    function updatePages() {
        let numbers = new Array<ReactElement>();
        for (
            let index = currentPage >= 3 ? currentPage - 2 : 0;
            index <
            (currentPage + 2 >= pageCount ? pageCount : currentPage + 3);
            index++
        ) {
            numbers.push(
                <span
                    key={`pagination_page_${index}`}
                    className={`${styles.pageNumber} ${index === currentPage && styles.active
                        }`}
                    onClick={() => changePage(index)}
                >
                    {index + 1}
                </span>
            );
        }
        setPages(numbers);
    }

    function changePage(index: number) {
        setCurrentPage(index);
        table.setPageIndex(index);
    }

    function nextPage() {
        table.nextPage();
        updatePages();
        setCurrentPage(currentPage + 1);
    }

    function prevPage() {
        table.previousPage();
        updatePages();
        setCurrentPage(currentPage - 1);
    }

    useEffect(() => {
        updatePages();
    }, [currentPage]);

    if (pageCount <= 1) {
        return <></>;
    }

    return (
        <div className={styles.pagination}>
            <button
                className={`${styles.chevron} ${styles.left}`}
                onClick={prevPage}
                disabled={!table.getCanPreviousPage()}
            >
                <Image
                    src="/icons/chevron.svg"
                    height={24}
                    width={24}
                    alt=""
                />
            </button>
            {pages}
            <button
                className={`${styles.chevron} ${styles.right}`}
                onClick={nextPage}
                disabled={!table.getCanNextPage()}
            >
                <Image
                    src="/icons/chevron.svg"
                    height={24}
                    width={24}
                    alt=""
                />
            </button>
        </div>
    );
};

export default AdaptiveTable;