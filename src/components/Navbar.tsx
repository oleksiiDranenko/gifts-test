'use client'
import { TonConnectButton } from '@tonconnect/ui-react' 

export default function Navbar() {
    return (
        <div className='fixed w-screen h-14 flex flex-row justify-between pl-2 pr-2 items-center bg-slate-800'>
                <h1>
                    Gift Charts Test 2
                </h1>
                <TonConnectButton/>
        </div>
    )
}
