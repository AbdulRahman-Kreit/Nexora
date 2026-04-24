"use client";
import { createContext, useContext, useState } from "react";

type FilterContextType = {
    days: number;
    setDays: (days: number) => void;
    timeLabel: string;
    setTimeLabel: (label: string) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
    const [days, setDays] = useState(1825);
    const [timeLabel, setTimeLabel] = useState('5 Years');

    return (
        <FilterContext.Provider value={{ days, setDays, timeLabel, setTimeLabel }}>
        {children}
        </FilterContext.Provider>
    );
}

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) throw new Error("useFilter must be used within FilterProvider");
    return context;
};