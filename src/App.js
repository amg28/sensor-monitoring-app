import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BuildingPlan from "./components/pages/BuildingPlan";
import DataOverview from "./components/pages/DataOverview";
import Warnings from "./components/pages/Warnings";

export default function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/warnings">
            <Warnings />
          </Route>
          <Route path="/plan">
            <BuildingPlan />
          </Route>
          <Route exact path="/">
            <DataOverview />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
