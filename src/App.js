import Home from "./pages/Home";
import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom"
import Single from './pages/Coordinators/Questionnaire/Single';
import New from './pages/Coordinators/Questionnaire/New';
import Many from "./pages/Coordinators/Questionnaire/Many"
import Teacher from "./pages/Teachers";
import MessagesList from "./pages/Teachers/Tasks/Messages/List";

function App() {
  return <>
    <Router>
      {/* <ButtonAppBar/> */}
      <nav>
        <NavLink to="/">Home  </NavLink><span>----</span>
        <NavLink to="/questionnaire/new">new questionnaire</NavLink><span>----</span>
        <NavLink to="/questionnaire/many">many</NavLink>
           <br/><br/>
         <NavLink to="/teacher">Teacher Element</NavLink>

    
        {/* Links for teacher */}

        <NavLink to=""></NavLink>


      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionnaire/new" element={<New />} />
        <Route path="/single" element={<Single />} />
        <Route path="/questionnaire/many" element={<Many/>}/>

        <Route path="/teacher" element = {<Teacher/>}/>
        <Route path="/messages" element = {<MessagesList/>}/>


        {/* routes for teachers */}



      </Routes>
    </Router>  
  </>

}

export default App;
