import Home from "./pages/Home";
import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom"
import Questionnaire from './pages/Questionnaire/Single';
import NewQustionnire from './pages/Questionnaire/New';
import QuestionnairesList from "./pages/Questionnaire/List"
import MixQuestionnaire from './pages/Questionnaire/Mix'
import { AuthContextProvider } from "./context/authContext";
import Nav from "./components/Nav";
import Login from './pages/Login';
import Register from './pages/Register';
import Statistic from './pages/Statistic';
import Courses from './pages/Admin/Courses';
import DownloadPdfs from "./pages/Versions/download";
import Uploader from "./components/Uploader";
import A from './components/A';

function App() {
  return <>
  <AuthContextProvider>
    <Router>
    <Nav/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/nav" element={<Nav/>} />      
      <Route path="/questionnaire/new" element={<NewQustionnire />} />
      <Route path="/questionnaire/:id" element={<Questionnaire />} />
      <Route path="/questionnaires" element={<QuestionnairesList/>}/>
      <Route path="questionnaire/complete/:id" element={<MixQuestionnaire/>}/>
      <Route path="/statistic" element={<Statistic/>}/>      
      <Route path="/courses" element={<Courses/>}/>   
      <Route path = "/versions/:qId" element = {<DownloadPdfs/>} />     
      <Route path = "/upload" element = {<Uploader/>} /> 
      <Route path = "/a" element = {<A/>} />     
    </Routes>
    </Router>  
  </AuthContextProvider>
  </>

}

export default App;


