import React from 'react'
import { Route, Switch } from 'react-router'
import BuildingPlan from '../../pages/BuildingPlan'
import DataOverview from '../../pages/DataOverview'
import Warnings from '../../pages/Warnings'

function Routing() {
    return (
        <>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/warnings">
              <Warnings />
            </Route>
            <Route path="/plan">
              <BuildingPlan />
            </Route>
            <Route path="/">
              <DataOverview />
            </Route>
          </Switch>
        </>
    )
}

export default Routing
