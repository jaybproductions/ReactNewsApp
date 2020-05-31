import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  newspaperOutline,
  searchOutline,
  personCircleOutline,
  createOutline,
  lockClosed,
  chatbubbleEllipsesOutline,
  personOutline,
  calendarOutline,
  ellipsisHorizontalOutline,
  homeOutline,
} from "ionicons/icons";
import News from "./pages/Tabs/News";
import Messages from "./pages/Tabs/Messages";
import Submit from "./pages/Tabs/Submit";
import Search from "./pages/Tabs/Search";
import Profile from "./pages/Tabs/Profile";
import EditProfile from "./pages/Auth/EditProfile";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Forgot from "./pages/Auth/Forgot";
import useAuth from "./hooks/useAuth";
import UserContext from "./contexts/UserContext";
import Link from "./pages/Link";
import Admin from "./pages/Tabs/AdminPage";
import NewMessage from "./components/Messages/NewMessage";
import AddEvent from "./pages/EventPages/AddEvent";
import Events from "./pages/EventPages/EventsPage";
import Event from "./pages/EventPages/Event";
import Users from "./pages/Tabs/Users";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Message from "./components/Messages/Message";

const App = () => {
  const [user, setUser] = useAuth();

  return (
    <IonApp>
      <IonReactRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <IonTabs>
            <IonRouterOutlet>
              <Route
                path="/"
                render={() => <Redirect to="/news" />}
                exact={true}
              />
              <Route path="/news" component={News} />
              <Route path="/messages" component={Messages} />
              <Route path="/submit" component={Submit} />
              <Route path="/search" component={Search} />
              <Route path="/profile" component={Profile} />
              <Route path="/edit-profile" component={EditProfile} />
              <Route path="/register" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot" component={Forgot} />
              <Route path="/admin" component={Admin} />
              <Route path="/new-message" component={NewMessage} />
              <Route path="/link/:linkId" component={Link} />
              <Route path="/message/:messageId" component={Message} />
              <Route path="/add-event" component={AddEvent} />
              <Route path="/events" component={Events} />
              <Route path="/event/:eventId" component={Event} />
              <Route path="/users" component={Users} />

              <Route component={() => <Redirect to="/news" />} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="news" href="/news">
                <IonIcon icon={homeOutline} />
                <IonLabel>Posts</IonLabel>
              </IonTabButton>
              <IonTabButton tab="events" href="/events">
                <IonIcon icon={calendarOutline} />
                <IonLabel>Calendar</IonLabel>
              </IonTabButton>

              <IonTabButton tab="users" href="/users">
                <IonIcon icon={personOutline} />
                <IonLabel>Brothers</IonLabel>
              </IonTabButton>
              <IonTabButton tab="messages" href="/messages">
                <IonIcon icon={chatbubbleEllipsesOutline} />
                <IonLabel>Messages</IonLabel>
              </IonTabButton>

              <IonTabButton tab="profile" href="/profile">
                <IonIcon icon={ellipsisHorizontalOutline} />
                <IonLabel>More</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </UserContext.Provider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
