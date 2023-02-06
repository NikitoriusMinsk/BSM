import React from 'react'
import styles from '@styles/components/layout/shared/MenuLink.module.css'
import Link from 'next/link';

interface LinkProps {
    href: string;
    label: string;
    active?: boolean;
    live?: boolean
}

const MenuLink: React.FC<LinkProps> = (props) => {
    const { href, label, active, live } = props;

    return (
        (<Link
            href={href}
            key={label}
            className={`${styles.link} ${active && styles.active} ${live && styles.live}`}>

            {label}

        </Link>)
    );
}

export default MenuLink;