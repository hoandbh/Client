import Home from "./pages/Home";
import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom"
import Questionnaire from './pages/Coordinators/Questionnaire/Single';
import NewQustionnire from './pages/Coordinators/Questionnaire/New';
import QuestionnairesList from "./pages/Coordinators/Questionnaire/List"
import MixQuestionnaire from './pages/Coordinators/Questionnaire/Mix'
import { AuthContextProvider } from "./context/authContext";
import Nav from "./components/Nav";
import Login from './pages/Login';
// import Login from './Riki'; 
import Register from './pages/Register';
import Logout from './pages/Logout';
import Statistic from './pages/Statistic';

function App() {
  return <>
    <AuthContextProvider>
      <Router>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/nav" element={<Nav/>} />          
          <Route path="/questionnaire/new" element={<NewQustionnire />} />
          <Route path="/questionnaire/:id" element={<Questionnaire />} />
          <Route path="/questionnaires" element={<QuestionnairesList/>}/>
          <Route path="questionnaire/complete/:id" element={<MixQuestionnaire/>}/>
          <Route path="/statistic" element={<Statistic/>}/>          
        </Routes>
      </Router>  
    </AuthContextProvider>
  </>

}

export default App;


