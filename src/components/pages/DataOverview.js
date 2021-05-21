import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { fetchRooms } from '../../store/roomsSlice';
import MyChart from '../UI/atoms/MyChart';
import InputForm from '../UI/molecules/InputForm';
import Navigation from '../UI/organisms/Navigation'
import TwoColumnLayout from "../UI/templates/TwoColumnLayout";

const initialRoomData = [
    {
        "_id": "608bf4f96ef769681c7e3524",
        "roomName": "POS_1",
        "sensors": [
        {
            "_id": "608bf4f96ef769681c7e3526",
            "sensorType": "temperatureSensor",
            "sensorId": "207",
            "warnings": [
            {
                "_id": "608bf4f96ef769681c7e3526",
                "warningText": "Oh my! That's unexpected. Too hot <?3",
                "threshold": "> 30"
            }
            ]
        },
        {
            "_id": "608bf4f96ef769681c7e3526",
            "sensorType": "temperatureSensor",
            "sensorId": "207",
            "warnings": [
            {
                "_id": "608bf4f96ef769681c7e3526",
                "warningText": "Oh my! That's unexpected. Too hot <?3",
                "threshold": "> 30"
            }
            ]
        },
        {
            "_id": "608bf4f96ef769681c7e3526",
            "sensorType": "temperatureSensor",
            "sensorId": "207",
            "warnings": [
            {
                "_id": "608bf4f96ef769681c7e3526",
                "warningText": "Oh my! That's unexpected. Too hot <?3",
                "threshold": "> 30"
            }
            ]
        }
        ]
    }
]

const initialSensorData = [
    {
      "dateTime": 1461110400000,
      "id": "d290f1ee-6c54-4b01-090e-d701748f0851",
      "value": "37"
    }
  ];

function DataOverview() {

    //GET sensors
    const [roomData, setRoomData] = useState(initialRoomData);
    
    //GET sensorsValues
    const [sensorData, setsensorData] = useState(initialSensorData);

    const dispatch = useDispatch();

    const roomList = roomData.map(a => a.roomName);
    console.log(roomList, 'roomList');

    const component1 = [(<InputForm rooms={roomList} />)];
    const component2 = [(<MyChart />)];

    React.useEffect(() => {
        dispatch(fetchRooms());
        return () => {
            // cleanup
        }
    }, [])

    return (
        <div>
            <Navigation pageTitle="Data Overview" />
            <TwoColumnLayout contentLeft={component1} contentRight={component2}  />
        </div>
    )
}

export default DataOverview
