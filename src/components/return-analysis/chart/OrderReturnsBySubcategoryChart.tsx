"use client";
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const chartData = [
    { product: 'Whey Protein', value: 441 },
    { product: 'Egg Protein', value: 373 },
    { product: 'Meal Replacement', value: 239 },
    { product: 'BCAA', value: 198 },
    { product: 'Gainer', value: 194 },
    { product: 'Casein Protein', value: 192 },
    { product: 'Vitamins', value: 178 },
    { product: 'Jerseys', value: 155 },
    { product: 'Gloves', value: 95 },
    { product: 'Vests', value: 94 },
    { product: 'Blended Protein', value: 82 },
    { product: 'Shorts', value: 69 },
    { product: 'Beef Protein', value: 56 },
    { product: 'Vegan Protein', value: 34 },
    { product: 'Socks', value: 33 },
    { product: 'Jackets', value: 30 },
    { product: 'Tights', value: 30 },
    { product: 'Glutamine', value: 21 }
];


const barColors = ['#0085ff', '#69b4ff', '#e0ffff', '#006fff'];

const handleChageBarColors = chartData.map(() => {
    return barColors[Math.floor(Math.random() * barColors.length)];
});

export default function OrderReturnsBySubcategoryChart() {
    const data = {
        labels: chartData.map(item => item.product),
        datasets: [
            {
                label: 'Order Frequency',
                data: chartData.map(item => item.value),
                backgroundColor: handleChageBarColors,
                borderRadius: 5,
                barThickness: 20,
            }
        ]
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2000,
            easing: 'easeOutQuart',
        },
        animations: {
            y: {
                duration: 2000,
                easing: 'easeOutQuart',
                type: 'number',
                from: (context: any) => {
                    if (context.type === 'data') {
                        return context.chart.scales.y.getPixelForValue(0);
                    }
                }
            }
        },
        plugins: {
            legend: { display: false, },
            datalabels: {
                anchor: 'end',
                align: 'top',
                color: '#cbd5e1',
                font: { weight: 600, size: 14 },
                offset: 1,
            },
        },
        scales: {
            y: {
                title: { display: false }, 
                grid: { display: false },
                ticks: { display: false },
                
            },
            x: {
                title: { display: false }, 
                grid: { display: false },
                ticks: { color: '#006fff', font: { size: 14, weight: 600 } },
                
            }
        },
    };
    
    return (
        <div className={`bg-linear-to-r from-[#151a21] to-[#161616] ml-1 
        p-6 h-96 border-l-3 border-[#4a7fce]`}>
            <h2 className="text-gray-500 font-semibold mb-4">
                Order Returns by Subcategory
            </h2>
            <Bar data={data} options={options} />
        </div>
    )
}
