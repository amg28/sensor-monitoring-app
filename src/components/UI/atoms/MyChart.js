import React from 'react';
import { Bar } from 'react-chartjs-2';

const state = {
    labels: ['1/05/2021','2/05/2021','3/05/2021','4/05/2021','5/05/2021'],
    datasets: [
        {
            label: 'POS_1',
            backgroundColor: 'rgba(75,192,192,1)',
            // backgroundColor: gradientStroke,
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [10, 35, 28, 15, 17]
        },
        {
            label: 'POS_2',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [20, 35, 28, 15, 17]
        },
        {
            label: 'POS_3',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [30, 35, 28, 15, 17]
        },
        {
            label: 'POS_4',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [40, 35, 28, 15, 17]
        },
        {
            label: 'POS_5',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [66, 35, 28, 15, 17]
        }
    ]
}

function MyChart() {

    return (
        <div>
            <Bar
                id='myChart'
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Average Rainfall per month',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
        </div>
    )
}

export default MyChart
