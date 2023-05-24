import styles from '@styles/components/ui/StatBars.module.css'

interface StatBarsComponent extends 
React.FC<{ children?: React.ReactNode | React.ReactNode[] }> 
{
    Title: React.FC<{title: string}>,
    Bar: React.FC<{leftPercent: number, rightPercent: number, label: string}>,
    BarLine: React.FC<{leftPercent: number, rightPercent: number}>
} 

const StatBars: StatBarsComponent = ({children}) => {
    return (
        <div className={styles.statBarsBlock}>
            {children}
        </div>
    )
}

StatBars.Title = ({title}) => {
    return (
        <span className={styles.statBarBlockTitle}>
            {title}
        </span>
    )
}

StatBars.Bar = ({leftPercent, rightPercent, label}) => {
    return (
        <div className={styles.barBlock}>
            <div className={styles.barInfo}>
                <span>
                    {leftPercent}
                </span>
                <span className={styles.centerBarTitle}>
                    {label}
                </span>
                <span>
                    {rightPercent}
                </span>
            </div>
            <StatBars.BarLine 
                leftPercent={leftPercent}
                rightPercent={rightPercent}
            />                
        </div>
    )
}

StatBars.BarLine = ({leftPercent, rightPercent}) => {
    return (        
        <div className={styles.bar}>
            <div 
                className={`${styles.barStripe} ${(leftPercent-rightPercent) > 0 ? styles.win : ''}`} 
                style={{width:leftPercent+"%"}} 
            />
            <div 
                className={`${styles.barStripe} ${(rightPercent-leftPercent) > 0 ? styles.win : ''}`} 
                style={{width:rightPercent+"%"}} 
            />
        </div>
    )
}

export default StatBars