import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets'
import styles from "@styles/components/ui/league-summary/PlayoffBracket.module.css"
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';

const rounds: IRoundProps[] = [
	{
		title: '1/8 Finals',
		seeds: [
			{
				id: 1,
				teams: [
					{ name: 'Team A', img: '/testimg/club1.png', score: 4 },
					{ name: 'Team B', img: '/testimg/club2.png', score: 2 }
				],
			},
			{
				id: 2,
				teams: [
					{ name: 'Team C', img: '/testimg/club1.png', score: 3 },
					{ name: 'Team D', img: '/testimg/club2.png', score: 1 }
				],
			},
			{
				id: 3,
				teams: [
					{ name: 'Team A', img: '/testimg/club1.png', score: 4 },
					{ name: 'Team B', img: '/testimg/club2.png', score: 2 }
				],
			},
			{
				id: 4,
				teams: [
					{ name: 'Team C', img: '/testimg/club1.png', score: 3 },
					{ name: 'Team D', img: '/testimg/club2.png', score: 1 }
				],
			},
			{
				id: 5,
				teams: [
					{ name: 'Team A', img: '/testimg/club1.png', score: 4 },
					{ name: 'Team B', img: '/testimg/club2.png', score: 2 }
				],
			},
			{
				id: 6,
				teams: [
					{ name: 'Team C', img: '/testimg/club1.png', score: 3 },
					{ name: 'Team D', img: '/testimg/club2.png', score: 1 }
				],
			},
			{
				id: 7,
				teams: [
					{ name: 'Team A', img: '/testimg/club1.png', score: 4 },
					{ name: 'Team B', img: '/testimg/club2.png', score: 2 }
				],
			},
			{
				id: 8,
				teams: [
					{ name: 'Team C', img: '/testimg/club1.png', score: 3 },
					{ name: 'Team D', img: '/testimg/club2.png', score: 1 }
				],
			},
		],
	},
	{
		title: '1/4 Finals',
		seeds: [
			{
				id: 9,
				teams: [
					{ name: 'Team A', img: '/testimg/club1.png', score: 1 },
					{ name: 'Team C', img: '/testimg/club1.png', score: 0 }
				],
			},
			{
				id: 10,
				teams: [
					{ name: 'Team A', img: '/testimg/club1.png', score: 1 },
					{ name: 'Team C', img: '/testimg/club1.png', score: 0 }
				],
			},
			{
				id: 11,
				teams: [
					{ name: 'Team A', img: '/testimg/club1.png', score: 1 },
					{ name: 'Team C', img: '/testimg/club1.png', score: 0 }
				],
			},
			{
				id: 12,
				teams: [
					{ name: 'Team A', img: '/testimg/club1.png', score: 1 },
					{ name: 'Team C', img: '/testimg/club1.png', score: 0 }
				],
			},
		],
	},
	{
		title: '1/2 Finals',
		seeds: [
			{
				id: 13,
				teams: [
					{ name: 'Team A', img: '/testimg/club1.png', score: 1 },
					{ name: 'Team A', img: '/testimg/club1.png', score: 0 }
				],
			},
			{
				id: 14,
				teams: [
					{ name: 'Team A', img: '/testimg/club1.png', score: 1 },
					{ name: 'Team A', img: '/testimg/club1.png', score: 0 }
				],
			},
		],
	},
	{
		title: 'Final',
		seeds: [
			{
				id: 15,
				teams: [
					{ name: 'VERY BIG TEAM NAME FOR SCROLL TESTING', img: '/testimg/club1.png', score: 2 },
					{ name: 'Team A', img: '/testimg/club1.png', score: 0 }
				],
			}
		],
	},
];

const PlayoffBracket: React.FC = () => {
	const bracketRef = useRef<HTMLDivElement>(null)

	const isScrollRef = useRef(false);
	const setMove = (state: boolean) => isScrollRef.current = state

	const scrollRight = () => {
		if (isScrollRef.current) {
			bracketRef.current!.scrollLeft += 10
			requestAnimationFrame(scrollRight)
		}
	}

	const scrollLeft = () => {
		if (isScrollRef.current) {
			bracketRef.current!.scrollLeft -= 10
			requestAnimationFrame(scrollLeft)
		}
	}

	return (
		<div className={styles.bracketContainer}>
			<div className={styles.controls}>
				<div
					className={styles.leftControl}
					onMouseDown={() => { setMove(true); scrollLeft();}}
        			onMouseUp={() => setMove(false)}
				>
					<Image
						src="/icons/chevron-bracket.svg"
						width={24}
						height={24}
						alt=''
					/>
				</div>
				<div
					className={styles.rightControl}
					onMouseDown={() => { setMove(true); scrollRight();}}
        			onMouseUp={() => setMove(false)}
				>
					<Image
						src="/icons/chevron-bracket.svg"
						width={24}
						height={24}
						alt=''
					/>
				</div>
			</div>
			<div className={styles.bracketWrap} ref={bracketRef}>
				<Bracket
					rounds={rounds}
					bracketClassName={styles.playoff}
					renderSeedComponent={TeamWithScoreSeed}
					roundClassName={styles.stage}
					mobileBreakpoint={0}
				/>
			</div>
		</div>
	)
}

const TeamWithScoreSeed = ({ seed, breakpoint, roundIndex, seedIndex }: IRenderSeedProps) => {
	// breakpoint passed to Bracket component
	// to check if mobile view is triggered or not

	// mobileBreakpoint is required to be passed down to a seed
	return (
		<Seed mobileBreakpoint={0} className={styles.matchWrap}>
			<SeedItem className={styles.match}>
				<div className={styles.teamImgs}>
					<div className={styles.teamImg}>
						<Image
							src={seed.teams[0]?.img}
							width={22}
							height={22}
							alt=""
						/>
					</div>
					<div className={styles.teamImg}>
						<Image
							src={seed.teams[1]?.img}
							width={22}
							height={22}
							alt=""
						/>
					</div>
				</div>
				<div className={styles.teams}>
					<SeedTeam className={styles.home}>
						<span>
							{seed.teams[0]?.name}
						</span>
						<span>
							{seed.teams[0]?.score}
						</span>
					</SeedTeam>
					<SeedTeam>
						<span>
							{seed.teams[1]?.name}
						</span>
						<span>
							{seed.teams[1]?.score}
						</span>
					</SeedTeam>
				</div>
			</SeedItem>
		</Seed>
	);
}

export default PlayoffBracket