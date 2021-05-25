import moment from 'moment';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { precisionSelector, sensorDataSelector } from '../../../store/roomsSlice';

function MyChart() {

    // {
    //     "_id": "60a2db5945e9ba001d5498b7",
    //     "value": "1243",
    //     "sensorId": "500",
    //     "dateTime": "2020-01-16T08:08:35.000Z"
    // }


    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    function createDataset(label, data){
        return {
            type: 'bar',
            label: label,
            backgroundColor: `rgba(${randomInteger(25,255)},${randomInteger(50,255)},${randomInteger(100,255)},1)`,
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: data,
            parsing: {
                yAxisKey: 'value',
                xAxisKey: 'dateTime'
            }
        }
    }


    const sensorData = useSelector(sensorDataSelector);
    const precision = useSelector(precisionSelector);
    const labels = new Set();

    const datasets = sensorData.map((sensor) => {
        const label = Object.keys(sensor)[0];
        const sesnorData = sensor[label].map((sensor) => sensor.map((obj) => Object.assign({}, {...obj, dateTime: moment(obj.dateTime).format(precision === 'days' ? "MM-DD" : "MM-DD HH:00")})));
        const labelDates = sesnorData ?sesnorData.map((sensor) => [...new Set(sensor.map((obj) =>  obj.dateTime).sort())]) : [];
        labels.add(...labelDates);
        return createDataset(label, sesnorData.flat())});

    console.log(Array.from(labels),'labels');
    console.log(datasets,'datasets');

    let data = {
        labels: Array.from(labels)[0],
        datasets
    }

    return (
        <div>
            <Bar
                id='mainChart'
                data={data}
                options={{
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
