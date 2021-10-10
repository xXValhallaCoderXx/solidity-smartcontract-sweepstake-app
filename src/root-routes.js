import { Switch,Route,Redirect } from "react-router-dom";

import EntryPage from "./pages/entry";

const RootRoutes = () => {
    return <Switch>
        <Route path="/" exact>
            <EntryPage />
        </Route>

        <Route>
            <Redirect to="/" />
        </Route>
    </Switch>
}

export default RootRoutes;