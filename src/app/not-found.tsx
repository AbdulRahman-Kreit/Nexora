import React from 'react';
import Image from 'next/image';
import ReturnButton from '@/components/not-found/ReturnButton';


export default function NotFoundPage() {
    return (
        <main className={`flex flex-col justify-center items-center h-screen`}>
            <Image
            src='/assits/notFound.png'
            alt='Error - 404'
            width={500}
            height={150}
            priority
            className='object-contain' />
            <h2 className='text-4xl font-semibold my-10'>
                Page Not Found
            </h2>
            <ReturnButton />
        </main>
    )
}
