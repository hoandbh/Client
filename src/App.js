import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom"
import Home from "./pages/Home";

function App() {
  return (
   <Router>
    <nav>
      {/*why to '/' ?? */}
      {/* <NavLink to="/">Koogle_ </NavLink> */}
      <NavLink to="/home">Home </NavLink>
    </nav>
    <Routes>
      {/* <Route path="/" element={<Home />}/> */}
      <Route path='/home' element={<Home></Home>}></Route>
    </Routes>
   </Router>
  );
}

export default App;
