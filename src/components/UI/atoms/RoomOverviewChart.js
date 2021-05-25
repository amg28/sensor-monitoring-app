import moment from 'moment';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { precisionSelector, sensorDataSelector } from '../../../store/roomsSlice';

function MyChart({label, sensorData}) {

    const precision = useSelector(precisionSelector);

    console.log(label, 'label');
    console.log(sensorData, 'sensorData');

    const newSensorData = sensorData.flat().map((sensor) => Object.assign({}, {...sensor, dateTime: moment(sensor.dateTime).format(precision === 'days' ? "MM-DD" : "MM-DD HH:00")}));
    const labels = newSensorData ? [...new Set(newSensorData.map((sensor) => sensor.dateTime).sort())] : [];

    let data = {
        labels,
        datasets: [
            {
                label: label,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: newSensorData,
                parsing: {
                    yAxisKey: 'value',
                    xAxisKey: 'dateTime'
                }
            }
        ]
    }

    return (
        <div>
            <Bar
                id='myChart'
                data={data}
                options={{
                    title: {
                        display: true,
                        text: 'Average Rainfall per month',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    },
                    responsive: true
                }}
            />
        </div>
    )
}

export default MyChart
