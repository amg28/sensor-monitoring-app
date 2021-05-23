import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, sensorDataSelector } from '../../store/roomsSlice';
import MyChart from '../UI/atoms/MainChart';
import ChartComparision from '../UI/molecules/ChartComparision';
import InputForm from '../UI/molecules/InputForm';
import Navigation from '../UI/organisms/Navigation'
import TwoColumnLayout from "../UI/templates/TwoColumnLayout";

function DataOverview() {

    const dispatch = useDispatch();

    const component1 = [(<InputForm />)];
    const component2 = [(<MyChart />)];

    React.useEffect(() => {
        dispatch(fetchRooms());
        return () => {
            // cleanup
        }
    }, [dispatch])

    return (
        <div>
            <Navigation pageTitle="Data Overview" />
            <TwoColumnLayout contentLeft={component1} contentRight={component2}  />
            <ChartComparision />
        </div>
    )
}

export default DataOverview
