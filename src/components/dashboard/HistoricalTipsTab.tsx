import React from 'react'
import { trpc } from 'src/utils/trpc'
import styles from '@styles/components/dashboard/TipsTab.module.css'
import Dropdown from '@components/ui/Dropdown'
import DateInput from '@components/ui/DatePicker'
import TextField from '@components/ui/TextField'
import Prediction from '@components/ui/Prediction'
import RadioGroup from '@components/ui/RadioGroup'

const DateFilterItems = [
    { name: 'Newest to Oldest', id: '1' },
    { name: 'Oldest to Newest', id: '2' }
]

const ProfitabilityFilterItems = [
    { name: 'Biggest to Lowest', id: '1' },
    { name: 'Lowest to Biggest', id: '2' }
]

const StatusFilterItems = [
    { id: '1', name: 'All' },
    { id: '2', name: 'Successfull' },
    { id: '3', name: 'Lost' },
]

const HistoricalTipsTab: React.FC = () => {
    const { data, isLoading } = trpc.user.getHistoricalTips.useQuery()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!data) {
        return <div>Error...</div>
    }

    return (
        <div className={styles.trackingTipsTab}>
            <div className={styles.filters}>
                <div className={styles.filter}>
                    <span>STATUS</span>
                    <RadioGroup
                        items={StatusFilterItems}
                        onChange={() => { }}
                        groupName='status'
                        defaultSelected='1'
                    />
                </div>
                <div className={styles.filter}>
                    <span>CREATE DATE</span>
                    <Dropdown
                        items={DateFilterItems}
                        onSelect={() => { }}
                    />
                </div>
                <div className={styles.filter}>
                    <span>PROFITABILITY</span>
                    <Dropdown
                        items={ProfitabilityFilterItems}
                        onSelect={() => { }}
                    />
                </div>
                <div className={`${styles.filter} ${styles.search}`}>
                    <TextField
                        icon='/icons/search.svg'
                        placeholder='Search'
                    />
                </div>
            </div>
            {
                data.map((prediction, index) => (
                    <Prediction
                        key={`prediction_${index}`}
                        {...prediction}
                    />
                ))
            }
        </div>
    )
}

export default HistoricalTipsTab