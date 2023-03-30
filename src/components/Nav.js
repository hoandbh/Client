import { NavLink } from "react-router-dom"
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from "../context/authContext"

// import {HomeIcon, LockIcon, PersonAddIcon, AddBoxIcon, ListIcon} from '@mui/icons-material';

import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import PersonAddIcon from '@mui/icons-material/Person';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListIcon from '@mui/icons-material/List';
import { Button} from '@mui/material';

// const CoordinateNav = () => {
//   return <>
//     <nav>
//       <NavLink to="/">Home  </NavLink><span>----</span>
//       <NavLink to="/login">login  </NavLink><span>----</span>
//       <NavLink to="/register">register  </NavLink><span>----</span>
//       <NavLink to="/questionnaire/new">new questionnaire</NavLink><span>----</span>
//       <NavLink to="/questionnaire/many">many</NavLink>
//     </nav>
//   </>
// }

const CoordinateNav = () => {
  return (
    <nav>
      <Button component={NavLink} to="/" startIcon={<HomeIcon />}>
        Home
      </Button>
      <Button component={NavLink} to="/login" startIcon={<LockIcon />}>
        Login
      </Button>
      <Button component={NavLink} to="/register" startIcon={<PersonAddIcon />}>
        Register
      </Button>
      <Button component={NavLink} to="/questionnaire/new" startIcon={<AddBoxIcon />}>
        New Questionnaire
      </Button>
      <Button component={NavLink} to="/questionnaire/many" startIcon={<ListIcon />}>
        Many
      </Button>
    </nav>
  );
};





const TeacherNav = () => {
  return <>
    <nav>
      {/* bracha, add the <NavLink/> of the techer hare */}
    </nav>
  </>
}

const AdminNav = () => {
  return <>
    <nav>
      {/**/}
    </nav>
  </>
}

const UnidentifiedUserNav = () => {
  return <>
    <nav>
    <Button component={NavLink} to="/login" startIcon={<LockIcon />}>
        Login
      </Button>
      <Button component={NavLink} to="/register" startIcon={<PersonAddIcon />}>
        Register
      </Button>
    </nav>
  </>
}



const Nav = () => {
  const {currentUser} = useContext(AuthContext);
  const [permission, setPermission] = useState(currentUser?.permission || 0);

  useEffect(() => {
    console.log(permission);
  },[permission])

  useEffect(() => {
    setPermission(currentUser?.permission || 0);
  },[currentUser])

  
  return (
    <> 
      {
        (() => {
          switch (permission) {
            case 1:
              return <TeacherNav />
            case 2:
              return <CoordinateNav />
            case 3:
              return <AdminNav />
            default:
              return <UnidentifiedUserNav />     
          }
        })()
      }
    </>
   );
}
export default Nav