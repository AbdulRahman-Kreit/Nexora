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

    const buttonStyle = (active: boolean) => `py-1.5 px-3 mr-2 my-2 rounded duration-300 text-md font-semibold transition-all
    ${active 
        ? 'bg-(--filter-buttons-bg-color) text-(--main-text-color) shadow-md transform scale-105' 
        : 'text-(--alt-text-color) hover:bg-(--filter-buttons-bg-color) hover:text-(--main-text-color)'}`;

    const handleManualChange = (newAmount: number) => {
        setDays(newAmount);
        setTimeLabel('Custom'); 
    };

    return (
        <div className={`flex flex-row justify-between bg-main-gradient w-full border-t 
        border-(--field-bg-color) px-5 items-center transition-all duration-500 ease-in-out`}>
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
            
            <div className="flex flex-row min-w-[210px] my-2 font-semibold h-10 shadow-sm">
                
                <button 
                    onClick={() => handleManualChange(Math.max(1, days - 7))} 
                    className={`px-4 duration-200 border border-r-0 border-(--field-bg-color) rounded-l 
                    bg-(--main-bg-color) text-(--alt-text-color) 
                    hover:bg-(--filter-buttons-bg-color) hover:text-white transition-colors`}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                
                <p className={`px-4 border-y border-(--field-bg-color) flex items-center 
                bg-(--field-bg-color) text-(--main-text-color) text-sm 
                whitespace-nowrap min-w-27.5 justify-center transition-colors`}>
                    Last {days} Days
                </p>
                
                <button 
                    onClick={() => handleManualChange(days + 7)} 
                    className={`px-4 duration-200 border border-l-0 border-(--field-bg-color) rounded-r 
                    bg-(--main-bg-color) text-(--alt-text-color) 
                    hover:bg-(--filter-buttons-bg-color) hover:text-white transition-colors`}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
}