import React, { useEffect } from 'react'
import Navigation from '../UI/organisms/Navigation'
import WarningsOverview from '../UI/organisms/WarningsOverview';
import TwoColumnLayout from '../UI/templates/TwoColumnLayout';
import FullPageLayout from '../UI/templates/FullPageLayout';
import WarningsConfiguration from '../UI/organisms/WarningsConfiguration';
import { fetchRooms, roomsSelector } from '../../store/roomsSlice';
import { useDispatch, useSelector } from 'react-redux';

function Warnings() {

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchRooms())
    // }, [dispatch])

    const warningsConfiguration = [<WarningsConfiguration />];
    const warningsMonitoring = <warningsMonitoring />;

    return (


        <div>
            <Navigation pageTitle="Warnings" />
            <TwoColumnLayout contentLeft={warningsConfiguration} contentRight={warningsMonitoring} columnSizeLeft={6} columnSizeRight={6}  />
        </div>
    )
}

export default Warnings
