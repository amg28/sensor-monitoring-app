// import moment from 'moment';
// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { useSelector } from 'react-redux';
// import { precisionSelector, sensorDataSelector } from '../../../store/roomsSlice';

// function MyChart() {

//     // {
//     //     "_id": "60a2db5945e9ba001d5498b7",
//     //     "value": "1243",
//     //     "sensorId": "500",
//     //     "dateTime": "2020-01-16T08:08:35.000Z"
//     // }

//     const sensorData = useSelector(sensorDataSelector);
//     const precision = useSelector(precisionSelector);

//     const newSensorData = sensorData.map((sensor) => Object.assign({}, {...sensor, dateTime: moment(sensor.dateTime).format(precision === 'days' ? "MM-DD" : "MM-DD HH:00")}));
//     const labels = newSensorData ? [...new Set(newSensorData.map((sensor) => sensor.dateTime).sort())] : [];
//     const rand = () => Math.round(Math.random() * 20);

//     let data = {
//         labels,
//         datasets: [
//             {
//                 type: 'line',
//                 label: 'Consumption',
//                 backgroundColor: 'rgba(125,143,192,0.5)',
//                 borderColor: 'rgb(125, 162, 235)',
//                 borderWidth: 5,
//                 fill: true,
//                 data: [rand(), rand(), rand(), rand(), rand(), rand()],
//               },
//             {
//                 type: 'bar',
//                 label: 'POS_1',
//                 backgroundColor: 'rgba(75,192,192,1)',
//                 borderColor: 'rgba(0,0,0,1)',
//                 borderWidth: 2,
//                 data: newSensorData,
//                 parsing: {
//                     yAxisKey: 'value',
//                     xAxisKey: 'dateTime'
//                 }
//             },
//             {
//                 type: 'bar',
//                 label: 'POS_2',
//                 backgroundColor: 'rgba(100,100,250,1)',
//                 borderColor: 'rgba(0,0,0,1)',
//                 borderWidth: 2,
//                 data: newSensorData,
//                 parsing: {
//                     yAxisKey: 'value',
//                     xAxisKey: 'dateTime'
//                 }
//             },

//         ]
//     }

//     return (
//         <div>
//             <Bar
//                 id='mainChart'
//                 data={data}
//                 options={{
//                     legend: {
//                         display: true,
//                         position: 'right'
//                     },
//                     responsive: true
//                 }}
//             />
//         </div>
//     )
// }

// export default MyChart
function MyChart() {
    return (<div></div>
    )
    }
export default MyChart