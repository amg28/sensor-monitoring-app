import React from 'react'
import TwoColumnLayout from "../UI/templates/TwoColumnLayout";
import OneRowLayout from "../UI/templates/OneRowLayout";
import Navigation from '../UI/organisms/Navigation'
import Floor1 from '../UI/atoms/Floor1';
import Floor2 from '../UI/atoms/Floor2';

function BuildingPlan() {

  const floor1 = [(<Floor1 />)];
  const floor2 = [(<Floor2 />)];
    return (
        <div>
            <Navigation pageTitle="Building Plan" />
            <OneRowLayout floorPlan={floor1} />
            <OneRowLayout floorPlan={floor2} />
        </div>
    )
}

export default BuildingPlan
