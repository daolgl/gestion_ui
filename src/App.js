import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from "./contexts/UserContext/UserContext";
import UserTarea from "./contexts/UserContext/UserTarea";
import { Spa } from "./Spa";




function App() {
  const [user, setUser] = useState(null)
  const [tarea, setTarea] = useState(false)
  const [tareaEdit, setTareaEdit] = useState({tarea: false, id: null})
  return (
    <UserContext.Provider value={{user, setUser}} >
      <UserTarea.Provider value={{tarea, setTarea, tareaEdit, setTareaEdit}} >
        <Spa />
      </UserTarea.Provider>
    </UserContext.Provider>
  );
}

export default App;
