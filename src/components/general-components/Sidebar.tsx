"use client";
import React, { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { faCircleInfo, faClockRotateLeft, faUser, faChartPie, faDollarSign, faUserClock, faBoxesStacked, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from './Header';

const Sidebar = memo(function Sidebar()  {
    const pathname = usePathname();

    const passiveLinkStyle = `flex flex-row items-center gap-3 p-3 text-sm
    text-gray-500 font-semibold duration-200 rounded-lg hover:bg-[#006fff] 
    hover:text-white`;

    const activeLinkStyle = `flex flex-row items-center gap-3 p-3 text-white 
    text-sm font-semibold bg-[#006fff] rounded-lg`;

    return (
        <nav className='bg-[#1f1f1f] text-white'>
            <Header />
            <div className="p-4 flex flex-col gap-4">
                
                <Link className={`${pathname === '/reports' ? activeLinkStyle : passiveLinkStyle}`} 
                    href="/reports">
                    <FontAwesomeIcon icon={faUser} className='mr-[15px]' />
                    <span className=''>My Reports</span>
                </Link>
                <Link className={`${pathname === '/overview' ? activeLinkStyle : passiveLinkStyle}`} 
                    href="/overview">
                    <FontAwesomeIcon icon={faChartPie} className='mr-[15px]' />
                    <span>Overview</span>
                </Link>
                <Link className={`${pathname === '/customers-analysis' ? activeLinkStyle : passiveLinkStyle}`} 
                    href="/customers-analysis">
                    <FontAwesomeIcon icon={faUserClock} className='mr-[15px]' />
                    <span>Customers Analysis</span>
                </Link>
                <Link className={`${pathname === '/returns-analysis' ? activeLinkStyle : passiveLinkStyle}`} 
                    href="/returns-analysis">
                    <FontAwesomeIcon icon={faDollarSign} className='mr-[15px]' />
                    <span>Returns Analysis</span>
                </Link>
                <Link className={`${pathname === '/products-analysis' ? activeLinkStyle : passiveLinkStyle}`} 
                    href="/products-analysis">
                    <FontAwesomeIcon icon={faBoxesStacked} className='mr-[15px]' />
                    <span>Products Analysis</span>
                </Link>
                <Link className={`${pathname === '/time-analysis' ? activeLinkStyle : passiveLinkStyle}`} 
                    href="/time-analysis">
                    <FontAwesomeIcon icon={faClockRotateLeft} className='mr-[15px]' />
                    <span>Time Analysis</span>
                </Link>
                <Link className={`${pathname === '/employee-analysis' ? activeLinkStyle : passiveLinkStyle}`} 
                    href="/employee-analysis">
                    <FontAwesomeIcon icon={faAddressCard} className='mr-[15px]' />
                    <span>Employee Analysis</span>
                </Link>
                <Link className={`${pathname === '/support' ? activeLinkStyle : passiveLinkStyle}`} 
                    href="/support">
                    <FontAwesomeIcon icon={faCircleInfo} 
                    className='mr-[15px]' />
                    <span>Support</span>
                </Link>
            </div>
        </nav>
    );
});

export default Sidebar;
