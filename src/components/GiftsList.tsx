'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface ItemInterface {
    name: string,
    imgUrl: string,
    price: number,
    percentageChange: number
}

export default function GiftsList() {

    const [list, setList] = useState<ItemInterface[]>([
        {name: 'Plush Pepe', imgUrl: 'plushPepe', price: 301, percentageChange: 0.05},
        {name: 'Love Potion', imgUrl: 'lovePotion', price: 1.68, percentageChange: -0.163},
        {name: 'Signet Ring', imgUrl: 'signetRing', price: 7.7, percentageChange: 0.95}
    ])


    return (
        <div className='w-screen h-auto flex flex-col items-center'>
            {
                list.map((item) => {

                    return (
                        <Link 
                            className="w-full h-16 pl-3 pr-3 flex flex-row items-center justify-between"
                            href={'/gift'}
                            key={item.name}
                        >

                            <div className="w-1/2 flex flex-row items-center">
                                <Image
                                    alt="gift image"
                                    src={`/images/${item.imgUrl}.png`}
                                    width={45}
                                    height={45}
                                    className="bg-slate-800 p-1 mr-3 rounded-lg"
                                />

                                <span>
                                    {item.name} 
                                    <span className="text-slate-400 text-sm">
                                        {' / TON'}
                                    </span>
                                </span>
                            </div>

                            <div className="w-1/2 flex flex-row items-center justify-end">
                                <span className={`mr-3 text-sm ${item.percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {item.percentageChange * 100}%
                                </span>
                                <div className="w-1/3 h-8 flex items-center justify-center bg-slate-700 rounded-lg">
                                    {item.price}
                                </div>
                            </div>

                        </Link>
                    )
                })
            }
        </div>
    )
}
