import Home from "./pages/Home";
import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom"
import Single from './pages/Coordinators/Questionnaire/Single';
import New from './pages/Coordinators/Questionnaire/New';
import Many from "./pages/Coordinators/Questionnaire/Many"
import { AuthContextProvider } from "./context/authContext";
import Nav from "./components/Nav";


function App() {
  return <>
    <AuthContextProvider>
      <Router>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questionnaire/new" element={<New />} />
          {/* <Route path="/single" element={<Single />} /> */}
          <Route path="/questionnaire/:id" element={<Single />} />
          <Route path="/questionnaire/many" element={<Many/>}/>
        </Routes>
      </Router>  
    </AuthContextProvider>
  </>

}

export default App;


