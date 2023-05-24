import styles from '@styles/components/ui/Lineup.module.css'
import Image from 'next/image'

interface LineupComponent extends
    React.FC<{ children?: React.ReactNode | React.ReactNode[] }> 
{
    Squad: React.FC<{ title: string, logoUrl:string, children?: React.ReactNode | React.ReactNode[] }>,
    SquadTitle: React.FC<{ title: string }>,
    Player: React.FC<{ number: number, position: string, name: string, countryFlag: string }>
}

const Lineup: LineupComponent = ({ children }) => {
    return (
        <div className={styles.lineupBlock}>
            {children}
        </div>
    )
}

Lineup.Squad = ({ title, logoUrl, children }) => {
    return (
        <div className={styles.squadBlock}>
            <div className={styles.squadHeader}>
                <div className={styles.squadTeam}>
                    <Image
                        src={'/images/team-1-placeholder.svg'}
                        width={32}
                        height={32}
                        alt=""
                        style={{ objectFit: 'contain' }}
                    />
                    <span>
                        Team 1
                    </span>
                </div>
            </div>
            <div className={styles.squad}>
                {children}
            </div>
        </div>
    )
}

Lineup.SquadTitle = ({title}) => {
    return (
        <span className={styles.squadTitle}>
            {title}
        </span>
    )
}

Lineup.Player = ({number, position, name, countryFlag}) => {
    return (
        <div className={styles.player}>
            <div className={styles.shirt}>
                <Image
                    src={position.toLowerCase()=='keeper' ? '/icons/yellow-shirt.png' : '/icons/gray-shirt.png'}
                    width={32}
                    height={32}
                    alt=""
                    style={{ objectFit: 'contain', position: 'absolute', left: 0, top: 0 }}
                />
                <span>
                    1
                </span>
            </div>
            <div className={styles.playerInfo}>
                <span className={styles.playerPos}>
                    Keeper
                </span>
                <span className={styles.playerName}>
                    Ederson
                </span>
            </div>
            <div className={styles.flag}>
                <Image
                    src={'/icons/wide-flags/es.png'}
                    width={30}
                    height={22}
                    alt=""
                    style={{ objectFit: 'contain' }}
                />
            </div>
        </div>
    )
}

export default Lineup