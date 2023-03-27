import { NavLink } from "react-router-dom"

const CoordinateNav = () => {
  return <>
    <nav>
      <NavLink to="/">Home  </NavLink><span>----</span>
      <NavLink to="/questionnaire/new">new questionnaire</NavLink><span>----</span>
      <NavLink to="/questionnaire/many">many</NavLink>
    </nav>
  </>
}

const TeacherNav = () => {
  return <>
    <nav>
      {/* bracha, add the <NavLink/> of the techer hare */}
    </nav>
  </>
}


const Nav = () => {
  return <> {(1==1)? <CoordinateNav /> : <TeacherNav /> }</>
}
export default Nav