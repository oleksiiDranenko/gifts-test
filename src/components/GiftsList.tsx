'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { Line } from "react-chartjs-2"
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js"

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale)


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
            {
                list.map((item) => {

                        const data = {
                            labels: ["1h", "2h", "3h", "4h", "Now"], // Example time labels
                            datasets: [
                                {
                                    data: item.history,
                                    borderColor: item.percentageChange >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)", // Green for up, red for down
                                    backgroundColor: "transparent",
                                    borderWidth: 1,
                                    pointRadius: 0,
                                    tension: 0
                                }
                            ]
                        }
    
                        const options = {
                            responsive: true,
                            scales: {
                                x: { display: false},
                                y: { display: false }
                            },
                            plugins: {
                                legend: { display: false }
                            }
                        }

                    return (
                        <Link 
                            className="w-full h-14 pl-3 pr-3 mb-2 rounded-lg flex flex-row items-center justify-between border border-slate-800"
                            href={'/gift'}
                            key={item.name}
                        >

                            <div className="w-6/12 flex flex-row items-center">
                                <Image
                                    alt="gift image"
                                    src={`/images/${item.imgUrl}.png`}
                                    width={40}
                                    height={40}
                                    className="bg-slate-800 p-1 mr-3 rounded-lg"
                                />

                                <div className="text-sm flex flex-col">
                                    {item.name} 
                                    <span className="text-slate-400 text-xs">
                                        {' / TON'}
                                    </span>
                                </div>
                            </div>

                            <div className="w-2/12 h-14 flex items-center">
                                <Line data={data} options={options} height={120}/>
                            </div>

                            <div className="w-4/12 flex flex-row items-center justify-end">
                                <div className={`w-20 h-10 text-sm flex flex-col items-center justify-center rounded-lg`}>
                                    <div className="flex flex-row items-center">
                                        <Image 
                                            alt="ton logo"
                                            src='/images/ton.png'
                                            width={12}
                                            height={12}
                                            className="mr-1"
                                        />
                                        {item.price}
                                    </div>

                                    
                                    <span className={`text-xs ${item.percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
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
