import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { NotificationContainer } from "react-notifications";
import { store, persistor } from "./app/redux/store/appStore";
import { PersistGate } from "redux-persist/integration/react";

import Login from "./app/views/login";
import ForgotPassword from "./app/views/forgotPassword";
import BusinessAccount from "./app/views/businessAccount";
import AccountInformation from "./app/views/accountInformation";
import OverallPerformance from "./app/views/overallPerformance";
import Location from "./app/views/location";
import Inventory from "./app/views/inventory";
import BusinessHours from "./app/views/businessHours";
import Integrations from "./app/views/integrations";
import Employee from "./app/views/employee";
import Returns from "./app/views/returns";
import Settings from "./app/views/settings";
import BillingInfo from "./app/views/BillingInfo";
import Terms from "./app/views/terms";
import Policy from "./app/views/policy";
import Orders from "./app/views/orders";
import OrderPendingView from "./app/views/orderPendingView";
import OrderCanceledView from "./app/views/orderCanceledView";
import OrderCompleteView from "./app/views/orderCompleteView";
import Constraction from "./app/views/Constraction";
import NotFound from "./app/views/404";
import Home from "./app/views/home";
import Welcome from "./app/views/welcome";
import AddBusiness from "./app/views/addBusiness";
import OrderOngoingView from "./app/views/orderOngoingView";
import VerificationUser from "./app/views/verificationUser";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <NotificationContainer />
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route
                exact
                path="/forgot-password"
                component={ForgotPassword}
              ></Route>
              <Route
                exact
                path="/business-account"
                component={BusinessAccount}
              ></Route>
              <Route
                exact
                path="/account-information"
                component={AccountInformation}
              ></Route>
              <Route
                exact
                path="/Constraction"
                component={Constraction}
              ></Route>
              <Route
                exact
                path="/integrations"
                component={Integrations}
              ></Route>
              <Route
                exact
                path="/overall-performance"
                component={OverallPerformance}
              ></Route>
              <Route exact path="/location" component={Location}></Route>
              <Route exact path="/catalog" component={Inventory}></Route>
              <Route
                exact
                path="/business-hours"
                component={BusinessHours}
              ></Route>
              <Route exact path="/admins" component={Employee}></Route>
              <Route exact path="/returns" component={Returns}></Route>
              <Route exact path="/settings" component={Settings}></Route>
              <Route exact path="/billing" component={BillingInfo}></Route>
              <Route exact path="/terms" component={Terms}></Route>
              <Route exact path="/policy" component={Policy}></Route>
              <Route exact path="/orders" component={Orders}></Route>
              <Route
                exact
                path="/pending-order-view"
                component={OrderPendingView}
              ></Route>
              <Route
                exact
                path="/canceled-order-view"
                component={OrderCanceledView}
              ></Route>
              <Route
                exact
                path="/complete-order-view"
                component={OrderCompleteView}
              ></Route>
              <Route
                exact
                path="/ongoing-order-view"
                component={OrderOngoingView}
              ></Route>
              <Route exact path="/welcome" component={Welcome}></Route>
              <Route exact path="/AddBusiness" component={AddBusiness}></Route>
              <Route exact path="/user/verification" component={VerificationUser}></Route>
              <Route exact path="" component={NotFound}></Route>
              <Route exact path="*" component={NotFound}></Route>
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
