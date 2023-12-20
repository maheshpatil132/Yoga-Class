import { useContext, useState } from "react";
import Profile from "./components/Dashboard/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserContext from "./context/UserContext";


function App() {

  const { user } = useContext(UserContext)
  const [loginToggle, setLoginToggle] = useState(true)

  return (
    <div className="App w-full">

      {
        user ?
          <Profile />
          :
          loginToggle ?  <Login setLoginToggle={setLoginToggle} /> :  <Register setLoginToggle={setLoginToggle}/>
         
      }
     
     
      {/* <Profile/> */}

    </div>
  );
}

export default App;
