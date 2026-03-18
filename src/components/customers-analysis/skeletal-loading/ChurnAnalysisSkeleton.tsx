import React from 'react';

export default function ChurnAnalysisSkeleton() {
    return (
        <div className="bg-linear-to-r from-[#151a21] to-[#161616] ml-1 p-6 h-96 border-l-3 border-[#4a7fce] animate-pulse">

        <div className="h-4 w-32 bg-[#1a1a1a] rounded-sm mb-8"></div>


        <div className="flex items-end justify-around h-64 w-full px-4 gap-4">

            {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col flex-1 items-center gap-2">
                

                <div className="w-full max-w-[40px] flex flex-col-reverse gap-1 h-48 bg-[#121212] rounded-t-sm overflow-hidden">

                <div className="h-[30%] w-full bg-[#1a1a1a]"></div>

                <div className="h-[40%] w-full bg-[#222222]"></div>

                <div className="h-[20%] w-full bg-[#1a1a1a]"></div>
                </div>

                <div className="h-3 w-10 bg-[#1a1a1a] rounded-sm"></div>
            </div>
            ))}
        </div>
        </div>
    );
};
