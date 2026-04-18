
import React from 'react';

export default function Header() {

    return (
        <div className={`flex flex-row items-stretch border-b border-[#2d2d2d] 
            w-full h-[57px]`}> 
            <div className="flex items-center px-3">
                <div className={`p-1.5 bg-white rounded-lg w-8 h-8 flex 
                    items-center justify-center`}>
                    <img 
                        src="/assits/icons/tabler-icon-building.png" 
                        alt="Building" 
                        className="w-5 h-5 object-contain" 
                    />
                </div>
            </div>

            <div className={`flex flex-row items-center flex-1 px-2 
                hover:bg-[#161616] transition-colors group`}>
                <span className={`font-semibold text-sm text-gray-100 
                    truncate max-w-[120px] font-grotesk`}>
                    Nexora Analytics
                </span>
                
            </div>
        </div> 
    )
}
