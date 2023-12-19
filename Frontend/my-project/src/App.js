import { useContext } from "react";
import Profile from "./components/Dashboard/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserContext from "./context/UserContext";


function App() {

  const { user } = useContext(UserContext)

  return (
    <div className="App w-full">

      {
        user ?
          <Profile />
          :
          <Login />
      }

      {/* <Register/> */}
      {/* <Profile/> */}

    </div>
  );
}

export default App;
