"use client";
import { useFilter } from "@/contexts/FilterProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function TimelineFilter() {
    const { days, setDays, timeLabel, setTimeLabel } = useFilter();

    const filters = [
        { label: 'Month', value: 30 },
        { label: 'Quarter', value: 90 },
        { label: '6M', value: 180 },
        { label: 'Year', value: 365 },
        { label: '2 Years', value: 730 },
        { label: '5 Years', value: 1825 },
    ];

    const buttonStyle = (active: boolean) => `py-1.5 px-3 mr-2 my-2 rounded duration-200 text-md font-semibold 
    ${active ? 'bg-[#006fff] text-white' : 'text-gray-500 hover:bg-[#006fff] hover:text-white'}`;

    const handleManualChange = (newAmount: number) => {
        setDays(newAmount);
        setTimeLabel('Custom'); 
    };

    return (
        <div className="flex flex-row justify-between bg-[#161616] w-full border-t-2 border-gray-500 px-5 items-center">
            <div className="flex flex-row items-center">
                {filters.map((f) => (
                    <button 
                        key={f.label}
                        className={buttonStyle(timeLabel === f.label)}
                        onClick={() => { setDays(f.value); setTimeLabel(f.label); }}
                    >
                        {f.label}
                    </button>
                ))}

                <button 
                    className={buttonStyle(timeLabel === 'Custom')}
                    onClick={() => setTimeLabel('Custom')}
                >
                    Custom
                </button>
            </div>
            
            <div className="flex flex-row min-w-[200px] my-2 font-semibold h-10">
                <button 
                    onClick={() => handleManualChange(Math.max(1, days - 7))} 
                    className="px-3 duration-200 border-2 border-r-0 border-gray-500 rounded-l hover:bg-[#132741] text-gray-400 hover:text-white"
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                
                <p className="px-4 border-2 border-gray-500 flex items-center bg-[#1a1a1a] text-white text-sm whitespace-nowrap">
                    Last {days} Days
                </p>
                
                <button 
                    onClick={() => handleManualChange(days + 7)} 
                    className="px-3 duration-200 border-2 border-l-0 border-gray-500 rounded-r hover:bg-[#132741] text-gray-400 hover:text-white"
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
}