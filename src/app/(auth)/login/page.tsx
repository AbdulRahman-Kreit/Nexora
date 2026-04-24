import React from 'react';
import Image from 'next/image';
import LoginInputs from '@/components/login/LoginInputs';
import PolicyFooter from '@/components/login/PolicyFooter';

export default function page() {
    // const LinkStyle = `underline duration-200 hover:text-[#69b4ff]`;

    return (
        <main className={`flex flex-col items-center justify-center text-center
        min-h-screen`}>
            <Image
                src='/assits/login.png'
                alt='Login'
                width={300}
                height={300}
            />
            <h2 className="my-8 text-3xl font-semibold font-clash">
                LOG IN
            </h2>
            <LoginInputs />
            <PolicyFooter />
        </main>
    )
}
