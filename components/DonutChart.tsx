
import React from 'react';

interface DonutChartProps {
    data: { name: string; value: number; color: string }[];
    visitors: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, visitors }) => {
    const size = 180;
    const strokeWidth = 25;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const totalValue = data.reduce((sum, item) => sum + item.value, 0);

    let accumulatedPercentage = 0;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke="#e6e6e6"
                    strokeWidth={strokeWidth}
                />
                {data.map((item, index) => {
                    const percentage = (item.value / totalValue) * 100;
                    const offset = circumference - (accumulatedPercentage / 100) * circumference;
                    const dashArray = `${(percentage / 100) * circumference} ${circumference}`;
                    
                    accumulatedPercentage += percentage;
                    
                    return (
                        <circle
                            key={index}
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="transparent"
                            stroke={item.color}
                            strokeWidth={strokeWidth}
                            strokeDasharray={dashArray}
                            strokeDashoffset={offset}
                            transform={`rotate(-90 ${size / 2} ${size / 2})`}
                            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                        />
                    );
                })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-800">{visitors}</span>
                <span className="text-sm text-gray-500">Visitors</span>
            </div>
        </div>
    );
};

export default DonutChart;