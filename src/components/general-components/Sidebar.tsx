"use client";
import React, { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { faCircleInfo, faClockRotateLeft, faUser, faChartPie, faDollarSign, faUserClock, faBoxesStacked, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from './Header';

const Sidebar = memo(function Sidebar() {
    const pathname = usePathname();

    const passiveLinkStyle = `flex flex-row items-center gap-3 p-3 text-sm
    text-(--alt-text-color) font-semibold duration-200 rounded-lg hover:bg-[#006fff] 
    hover:text-white group`;

    const activeLinkStyle = `flex flex-row items-center gap-3 p-3 text-white 
    text-sm font-semibold bg-[#006fff] rounded-lg shadow-md`;

    return (
        <nav className="h-screen flex flex-col bg-(--side-bar-bg-color) border-r border-(--field-bg-color) transition-colors duration-300">
            <Header />
            
            <div className="p-4 flex flex-col gap-3 flex-1 overflow-y-auto">
                {[
                    { href: '/reports', icon: faUser, label: 'Reports Maker' },
                    { href: '/overview', icon: faChartPie, label: 'Overview' },
                    { href: '/customers-analysis', icon: faUserClock, label: 'Customers Analysis' },
                    { href: '/returns-analysis', icon: faDollarSign, label: 'Returns Analysis' },
                    { href: '/products-analysis', icon: faBoxesStacked, label: 'Products Analysis' },
                    { href: '/time-analysis', icon: faClockRotateLeft, label: 'Time Analysis' },
                    { href: '/employee-analysis', icon: faAddressCard, label: 'Employee Analysis' },
                    { href: '/support', icon: faCircleInfo, label: 'Support' },
                ].map((link) => (
                    <Link 
                        key={link.href}
                        className={`${pathname === link.href ? activeLinkStyle : passiveLinkStyle}`} 
                        href={link.href}
                    >
                        <div className="w-5 flex justify-center">
                            <FontAwesomeIcon icon={link.icon} />
                        </div>
                        <span className="font-grotesk">{link.label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
});

export default Sidebar;