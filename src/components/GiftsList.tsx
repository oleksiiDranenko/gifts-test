'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"


interface ItemInterface {
    name: string,
    imgUrl: string,
    price: number,
    percentageChange: number,
    history: number[] 
}

export default function GiftsList() {

    const [list, setList] = useState<ItemInterface[]>([
        {name: 'Plush Pepe', imgUrl: 'plushPepe', price: 301, percentageChange: 0.05, history: [290, 295, 290, 300, 280]},
        {name: 'Love Potion', imgUrl: 'lovePotion', price: 1.68, percentageChange: -0.163, history: [1.80, 1.75, 1.78, 1.83, 1.75]},
        {name: 'Signet Ring', imgUrl: 'signetRing', price: 7.7, percentageChange: 0.95, history: [6.5, 7.0, 7.6,5, 7.5, 7.0]}
    ])


    return (
        <div className='w-screen h-auto flex flex-col items-center'>
            
            <div className="w-full pl-3 pr-3 flex flex-row h-6 text-xs text-slate-500">
                <div className="w-3/5 flex flex-row items-center">
                    Name / Supply
                </div>
                <div className="w-2/5 flex flex-row items-center justify-end">
                    Price / 24h change
                </div>
            </div>

            {
                list.map((item) => {

                    return (
                        <Link 
                            className="w-full h-20 pl-3 pr-3 flex flex-row items-center justify-between"
                            href={'/gift'}
                            key={item.name}
                        >

                            <div className="w-3/5 flex flex-row items-center">
                                <Image
                                    alt="gift image"
                                    src={`/images/${item.imgUrl}.png`}
                                    width={50}
                                    height={50}
                                    className="bg-slate-800 p-1 mr-3 rounded-lg"
                                />

                                <div className="flex flex-col">
                                    <span className="text-base font-bold">
                                        {item.name} 
                                    </span>
                                    <span className="text-slate-500 text-sm font-normal">
                                        {'4.8K'}
                                    </span>
                                </div>
                            </div>

                            

                            <div className="w-2/5 flex flex-row items-center justify-end">
                                <div className="w-20 h-10 text-sm flex flex-col items-end justify-center mr-2">
                                    <div className="flex flex-row items-center">
                                        <Image 
                                            alt="ton logo"
                                            src='/images/ton.png'
                                            width={15}
                                            height={15}
                                            className="mr-1"
                                        />
                                        <span className="text-base font-bold">
                                            {item.price}
                                        </span>
                                    </div>

                                    
                                    <span className={`text-sm ${item.percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {item.percentageChange > 0 ? '+' : null}{item.percentageChange * 100}%
                                    </span>
                                </div>
                                
                            </div>

                        </Link>
                    )
                })
            }
        </div>
    )
}
