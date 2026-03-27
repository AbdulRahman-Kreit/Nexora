import React from 'react'

export default function Filter() {
    const categoriesInputs = [
        { id: 'all-categories', label: 'All Categories' },
        { id: 'amino', label: 'Amino Acids' },
        { id: 'carbs', label: 'Carbs' },
        { id: 'protein', label: 'Protein' },
        { id: 'clothing', label: 'Clothing' },
        { id: 'vitamins', label: 'Vitamins' },
    ];
    const regionsInputs = [
        { id: 'all-regions', label: 'All Regions' },
        { id: 'brazil', label: 'Brazil' },
        { id: 'canada', label: 'Canada' },
        { id: 'central', label: 'Central' },
        { id: 'france', label: 'France' },
        { id: 'northeast', label: 'Northeast' },
        { id: 'northwest', label: 'Northwest' },
        { id: 'southeast', label: 'Southeast' },
        { id: 'southwest', label: 'Southwest' },
    ];

    const cardStyle = `flex flex-col w-[250px] bg-[#006fff] mb-5 mx-0 
    rounded-2xl text-center relative`;
    const headingStyle = `w-full text-[#006fff] font-semibold py-2 text-lg
    my-0 mx-auto rounded-t-2xl`;

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className={cardStyle}>
                <h3 className={`${headingStyle} bg-white`}>
                    Categories
                </h3>
                {categoriesInputs.map((item, index) => {
                    return (
                        <label key={index} className="flex flex-row items-center mx-5 cursor-pointer group">
                            <input 
                                type="radio" 
                                name="category"
                                id={item.id}
                                className="peer hidden"
                                defaultChecked={item.id === 'all'} 
                            />
                            <div className="w-5 h-5 rounded-full border-2 border-[#0085ff] bg-white 
                                transition-all duration-200
                                peer-checked:shadow-[0_0_10px_rgba(0,133,255,0.5)]
                                peer-checked:bg-[#69b4ff]">
                            </div>
                            
                            <span className="m-2 text-lg font-semibold text-white">
                                {item.label}
                            </span>
                        </label>
                    )
                })}
            </div>
            <div className={cardStyle}>
                <h3 className={`${headingStyle} bg-[#2d2d2d]`}>
                    Regions
                </h3>
                {regionsInputs.map((item, index) => {
                    return (
                        <label key={index} className="flex flex-row items-center mx-5 cursor-pointer group">
                            <input 
                                type="radio" 
                                name="regions"
                                id={item.id}
                                className="peer hidden"
                                defaultChecked={item.id === 'all'} 
                            />
                            <div className="w-5 h-5 rounded-full border-2 border-[#0085ff] bg-white 
                                transition-all duration-200
                                peer-checked:shadow-[0_0_10px_rgba(0,133,255,0.5)]
                                peer-checked:bg-[#69b4ff]">
                            </div>
                            
                            <span className="m-2 text-lg font-semibold text-white">
                                {item.label}
                            </span>
                        </label>
                    )
                })}
            </div>
        </div>
    )
}
