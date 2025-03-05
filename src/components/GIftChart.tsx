"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  CategoryScale,
  ChartOptions,
  ChartEvent,
} from "chart.js";

import { useEffect, useState } from "react";
import Image from "next/image";

// ✅ Register necessary components
ChartJS.register(LineElement, PointElement, LinearScale, Tooltip, CategoryScale);


interface ListInterface {
    date: string,
    priceTon: number,
    priceUsd: number
}

interface PropsInterface {
    list: ListInterface[],
}


export default function GiftChart({ list }: PropsInterface) {

    const [selectedPrice, setSelectedPrice] = useState<'ton' | 'usd'>('ton')
    const [percentChange, setPercentChange] = useState<number>(0)
    const [currentList, setCurrentList] = useState<ListInterface[]>(list.slice(-7))
    const [listSelected, setListSelected] = useState<'24h' | '1w' | '1m' | 'all'>('24h')

    useEffect(() => {
        if(selectedPrice == 'ton') {
            const firstData = currentList[0].priceTon;
            const lastData = currentList[currentList.length - 1].priceTon;

            const result = parseFloat(((lastData - firstData) / firstData * 100).toFixed(2));

            setPercentChange(result)
        } else {
            const firstData = currentList[0].priceUsd;
            const lastData = currentList[currentList.length - 1].priceUsd;

            const result = parseFloat(((lastData - firstData) / firstData * 100).toFixed(2));

            setPercentChange(result)
        }

    }, [selectedPrice, currentList])


    useEffect(() => {

        switch(listSelected) {
            case '24h': 
                setCurrentList(list.slice(-7))
                break;
            case '1w':
                setCurrentList(list.slice(-15))
                break;
            case '1m':
                setCurrentList(list.slice(-25))
                break;
            case 'all':
                setCurrentList(list)
                break;
        }

    }, [listSelected])

  
    const data = {
        labels: currentList.map((item) => {
            return item.date.slice(0, 5)
        }),

        datasets: [
            {
                label: "Gift Price",
                data: currentList.map((item) => {
                    return selectedPrice == 'ton' ?  item.priceTon : item.priceUsd
                }),
                borderColor: percentChange >= 0 ? "#22c55e" : "#ef4444", // Line color
                borderWidth: 1,
                backgroundColor: percentChange >= 0 ? "#22c55e" : "#ef4444", // ✅ Fix: Ensure transparency
                fill: 0, // ✅ Fix: Ensures filling below the line
                tension: 0, 
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: percentChange >= 0 ? "#22c55e" : "#ef4444",
            },
          ],

    };
  

  // ✅ Options with custom crosshair
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        enabled: true, // Show tooltips
        mode: "index", // Tooltip follows the vertical line
        intersect: false, // Allows tooltip when not exactly on a point
        callbacks: {
            title: function (tooltipItems) {
                // Display full date in the tooltip title
                return currentList[tooltipItems[0].dataIndex].date;
              },
            label: function (tooltipItem) {
                return `Price: ${tooltipItem.raw} ${selectedPrice == 'ton' ? 'TON' : 'USD'}`;
            },
        },
        external: function (context) {
          // ✅ Custom crosshair drawing logic
          const { chart, tooltip } = context;
          const ctx = chart.ctx;

          if (!tooltip || !tooltip.opacity) {
            return;
          }

          // Get hovered position
          const tooltipX = tooltip.caretX;
          const tooltipY = tooltip.caretY;

          ctx.save();
          ctx.beginPath();
          ctx.setLineDash([5, 5]); // Dashed line style
          ctx.lineWidth = 1;
          ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"; // Crosshair color

          // 🔹 Draw vertical line
          ctx.moveTo(tooltipX, chart.chartArea.top);
          ctx.lineTo(tooltipX, chart.chartArea.bottom);

          // 🔹 Draw horizontal line
          ctx.moveTo(chart.chartArea.left, tooltipY);
          ctx.lineTo(chart.chartArea.right, tooltipY);

          ctx.stroke();
          ctx.restore();
        },
      },
    },

    interaction: {
      mode: "index",
      intersect: false,
    },

    scales: {
      x: {
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: {
          color: "rgba(255, 255, 255, 0.6)",
          padding: 0,
          autoSkip: true,
          maxTicksLimit: 3,
          maxRotation: 0,
          minRotation: 0,
          
        },

        
        
      },
      y: {
        grid: {
            color: "rgba(255, 255, 255, 0.1)",
            drawTicks: true, // ✅ Ensures grid lines extend with ticks
            tickLength: 10,  // ✅ Extends grid lines by 10 pixels outside the chart
          },
        ticks: { color: "rgba(255, 255, 255, 0.6)", padding: 10 },
        position: "right",
        suggestedMax: Math.max(...data.datasets[0].data) * 1.1,
      },
    }
  };




    return (
        <div className="h-screen w-screen">

            <div className="w-full h-12 mt-5 pl-2 flex flex-row justify-between items-center">
                <div className="h-full flex items-center">
                    <Image 
                        alt="gift"
                        src={'/images/plushPepe.png'}
                        width={50}
                        height={50}
                        className="mr-3 bg-slate-800 p-1 rounded-lg"
                    />
                    <h1>
                        <span className="text-xl font-bold">
                            Plush Pepe
                        </span>
                        <span className="text-[rgba(255, 255, 255, 0.6)] text-sm">
                            {' / ' + (selectedPrice == 'ton' ? 'TON' : 'USD')}
                        </span>
                    </h1>
                </div>
                <div className="w-1/3 h-10 mr-2 flex flex-row items-center justify-center text-base font-bold bg-slate-800 rounded-lg">
                    {
                        selectedPrice == 'ton' 
                        ? currentList[currentList.length -1].priceTon 
                        : currentList[currentList.length -1].priceUsd
                    }
                </div>
            </div>


            <div className="w-full mb-2 mt-5 flex flex-row justify-between">
                <div className="w-1/2 flex flex-row box-border ml-2">
                    <button 
                        className={`w-2/5 text-sm  h-10 box-border ${selectedPrice == 'ton' ? 'rounded-lg bg-[#0098EA] font-bold' : null }`}
                        onClick={() => setSelectedPrice('ton')}
                    >
                        TON
                    </button>
                    <button 
                        className={`w-2/5 text-sm  h-10 box-border ${selectedPrice == 'usd' ? 'rounded-lg bg-[#0098EA] font-bold' : null }`}
                        onClick={() => setSelectedPrice('usd')}
                    >
                        USD
                    </button>
                </div>
                
                <div className="w-1/3 h-10 mr-2 flex items-center justify-center">
                    <span className={`${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {
                            (percentChange > 0 ? '+' : '') + percentChange + '%'

                        }
                    </span>
                </div>
                
            </div>

            
            <Line 
                data={data} 
                options={options}
            />
            


            <div className="mb-1 mt-5 w-screen flex flex-col pr-3 pl-2">
                <div className="w-full  flex flex-row justify-between">
                    <button 
                        className={`w-1/5 text-sm  h-10 box-border ${listSelected == 'all' ? 'rounded-lg bg-[#0098EA] font-bold' : null}`}
                        onClick={() => setListSelected('all')}
                    >
                        All
                    </button>
                    <button 
                        className={`w-1/5 text-sm  h-10 box-border ${listSelected == '1m' ? 'rounded-lg bg-[#0098EA] font-bold' : null}`}
                        onClick={() => setListSelected('1m')}
                    >
                        1m
                    </button>
                    <button 
                        className={`w-1/5 text-sm h-10 box-border ${listSelected == '1w' ? 'rounded-lg bg-[#0098EA] font-bold' : null}`}
                        onClick={() => setListSelected('1w')}
                    >
                        1w
                    </button>
                    <button 
                        className={`w-1/5 text-sm  h-10 box-border ${listSelected == '24h' ? 'rounded-lg bg-[#0098EA] font-bold' : null}`}
                        onClick={() => setListSelected('24h')}
                    >
                        24h
                    </button>
                                        
                </div>
            </div>
            
        </div>
  );
}
