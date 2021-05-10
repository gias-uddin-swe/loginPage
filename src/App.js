import { createContext, useState } from "react";
import "./App.css";
import LoginPage from "./components/Loginpage/LoginPage";

export const UserContext = createContext();

function App() {
  const [users, setUsers] = useState({
    email: "",
    wallet: "",
    phrase: "",
    oldPass: "",
    newPass: "",
    isLoggedIn: false,
  });
  return (
    <UserContext.Provider value={[users, setUsers]}>
      <LoginPage></LoginPage>
    </UserContext.Provider>
  );
}

export default App;
