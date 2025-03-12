'use client'
import { TonConnectButton } from '@tonconnect/ui-react' 
import Image from 'next/image'

export default function Navbar() {
    return (
        <div className='fixed w-screen h-14 flex flex-row justify-between pl-2 pr-2 items-center bg-[#111827]'>
                <div className='flex flex-row items-center '>
                    <Image
                        src={'/images/logo.png'}
                        alt='sdfs'
                        width={40}
                        height={40}
                        className='p-2'
                    />
                    <span className=''>
                        Gift Charts
                    </span>
                </div>
                <TonConnectButton/>
        </div>
    )
}
