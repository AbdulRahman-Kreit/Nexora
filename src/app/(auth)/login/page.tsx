import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoginInputs from '@/components/login/LoginInputs';

export default function page() {
    const LinkStyle = `underline duration-200 hover:text-[#69b4ff]`;

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
            <p className="text-sm text-center font-grotesk mt-6 opacity-50">
                By continuing, you agree to our <Link className={LinkStyle} href='#'>Terms of Service</Link>, <Link className={LinkStyle} href='#'>Privacy Policy</Link> and <Link className={LinkStyle} href='#'>Data Protection Agreement</Link>
            </p>
        </main>
    )
}
