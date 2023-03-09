import Home from "./pages/Home";
import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom"
import Single from './pages/Coordinators/Questionnaire/Single';
import New from './pages/Coordinators/Questionnaire/New';

function App() {
  return <>
    <Router>
      <nav>
        <NavLink to="/">Home   </NavLink>
        <NavLink to="/questionnaire/new">new questionnaire</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionnaire/new" element={<New />} />
        <Route path="/single" element={<Single />} />
      </Routes>
    </Router>  
  </>

}

export default App;
