import React, { useState } from "react"
import styles from '../../../styles/components/ui/match-summary/PredictionsFilter.module.css'

interface FilterProps {
    items: { name: string, id: string }[];
    onSelect: (item: { name: string, id: string }) => void;
    alternativeStyle?: boolean;
}

const PredictionsFilter: React.FC<FilterProps> = (props) => {
    const { items, onSelect, alternativeStyle = false } = props
    const [selected, setSelected] = useState(items[0])

    function handleSelect(item: { name: string, id: string }) {
        onSelect(item);
        setSelected(item);
    }

    return (
        <>
            {items.map(item => (
                <div
                    className={`${styles.filterItem} ${alternativeStyle && styles.alternativeStyle} ${selected?.id == item.id && styles.filterActive}`}
                    key={item.id}
                    onClick={() => handleSelect(item)}
                >
                    {item.name}
                </div>
            ))}
        </>
    )
}

export default PredictionsFilter