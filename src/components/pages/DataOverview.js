import { Button } from '@material-ui/core'
import React from 'react'
import MyChart from '../UI/atoms/MyChart';
import InputForm from '../UI/molecules/InputForm';
import Navigation from '../UI/organisms/Navigation'
import TwoColumnLayout from "../UI/templates/TwoColumnLayout";


function DataOverview() {

    const component1 = [(<InputForm />)];
    const component2 = [(<MyChart />)];

    return (
        <div>
            <Navigation pageTitle="Data Overview" />
            <TwoColumnLayout contentLeft={component1} contentRight={component2}  />
        </div>
    )
}

export default DataOverview
