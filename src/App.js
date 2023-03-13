import Home from "./pages/Home";
import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom"
import Single from './pages/Coordinators/Questionnaire/Single';
import New from './pages/Coordinators/Questionnaire/New';
import Many from "./pages/Coordinators/Questionnaire/Many"
import { Button, Box, Tabs, Tab } from "@mui/material";

function App() {
  return <>
    <Router>
      <nav>
        <NavLink to="/"><Tab value = "one" label="הוספת מבחן" href="./Questionnaire/new" />   </NavLink><span>----</span>
        <NavLink to="/questionnaire/new">new questionnaire</NavLink><span>----</span>
        <NavLink to="/questionnaire/many">many</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionnaire/new" element={<New />} />
        <Route path="/single" element={<Single />} />
        <Route path="/questionnaire/many" element={<Many/>}/>
      </Routes>
    </Router>  
  </>

}

export default App;
