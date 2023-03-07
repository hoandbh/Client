// import Coordinator from "../Coordinators";
import New from '../Coordinators/Questionnaire/New'
import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom"



const Home = () => {

  return (
    <>
      <Router>
        <nav>
          <NavLink to="/home">Home </NavLink>{/* not hare?? just /?? */}
          <NavLink to="/questionnaire/new">new questionnaire </NavLink>
        </nav>
        <Routes>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/questionnaire/new' element={<New/>}></Route>
        </Routes>
      </Router>
      {/* <Coordinator></Coordinator> */}
    </>

  )
}

export default Home

