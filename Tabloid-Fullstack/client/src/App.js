import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { SubscriptionProvider } from "./providers/SubscriptionProvider"
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import AppHeader from "./components/AppHeader";

function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-right" hideProgressBar />
      <UserProfileProvider>
        <SubscriptionProvider>
          <Router>
            <AppHeader />
            <ApplicationViews />
          </Router>
        </SubscriptionProvider>
      </UserProfileProvider>
    </div>
  );
}

export default App;