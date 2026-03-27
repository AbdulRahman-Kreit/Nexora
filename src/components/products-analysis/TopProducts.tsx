import React from 'react'

export default function TopProducts() {
    const cardStyle = `w-[200px] h-[160px] bg-[#006fff] mb-5 mx-0 rounded-2xl
    text-center relative`;
    const headingStyle = `w-full text-[#006fff] font-semibold py-2 
    my-0 mx-auto rounded-t-2xl`;
    const percentageStyle = `text-5xl text-white font-bold my-4`;
    const miniCardStyle = `flex items justify-between w-[160px] px-2 py-1 my-2 
    text-[#006fff] text-xs mx-auto rounded`;

    return (
        <div className='flex flex-col items-center'>
            <div className={cardStyle}>
                <h3 className={`${headingStyle} bg-white`}>
                    Top Product by Profit
                </h3>
                <p className={percentageStyle}>
                    100%
                </p>
                <p className={`${miniCardStyle} bg-white`}>
                    <span className='font-semibold'>Protein</span>
                    <span>Pure Casein</span>
                </p>
            </div>
            <div className={cardStyle}>
                <h3 className={`${headingStyle} bg-white`}>
                    Top product by GM%
                </h3>
                <p className={percentageStyle}>
                    100%
                </p>
                <p className={`${miniCardStyle} bg-white`}>
                    <span className='font-semibold'>XTEND</span>
                    <span>Ripped</span>
                </p>
            </div>
            <div className={cardStyle}>
                <h3 className={`${headingStyle} bg-[#2d2d2d]`}>
                    Top product by Returns
                </h3>
                <p className={percentageStyle}>
                    100%
                </p>
                <p className={`${miniCardStyle} bg-[#2d2d2d]`}>
                    <span className='font-semibold'>Protein</span>
                    <span>Eggs</span>
                </p>
            </div>
            <div className={cardStyle}>
                <h3 className={`${headingStyle} bg-[#2d2d2d]`}>
                    Top product by Cost
                </h3>
                <p className={percentageStyle}>
                    100%
                </p>
                <p className={`${miniCardStyle} bg-[#2d2d2d]`}>
                    <span className='font-semibold'>Concentrate</span>
                    <span>Whey Protein</span>
                </p>
            </div>
        </div>
    )
}
