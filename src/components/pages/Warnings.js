import React from 'react'
import Navigation from '../UI/organisms/Navigation'
import WarningsOverview from '../UI/organisms/WarningsOverview';
import TwoColumnLayout from '../UI/templates/TwoColumnLayout';
import FullPageLayout from '../UI/templates/FullPageLayout';
import WarningsConfiguration from '../UI/organisms/WarningsConfiguration';

function Warnings() {

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
