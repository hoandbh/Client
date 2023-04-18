import { NavLink } from "react-router-dom"
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from "../context/authContext"
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import PersonAddIcon from '@mui/icons-material/Person';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListIcon from '@mui/icons-material/List';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BarChartIcon from '@mui/icons-material/BarChart';

import { Button} from '@mui/material';

const CoordinateNav = () => {
  return (
    <>
      <Button component={NavLink} to="/questionnaire/new" startIcon={<AddBoxIcon />}>
        New Questionnaire
      </Button>
      <Button component={NavLink} to="/questionnaires" startIcon={<ListIcon />}>
        questionnaires
      </Button>
      <Button component={NavLink} to="/statistic" startIcon={<BarChartIcon />}>
        statistic
      </Button>
      <Button component={NavLink} to="/logout" startIcon={<ExitToAppIcon />}>
        Logout
      </Button>
    </>
  );
};





const TeacherNav = () => {
  return <>
      {/* bracha, add the buttons of the techer here */}
      <Button component={NavLink} to="/questionnaires" startIcon={<ListIcon />}>
        questionnaires
      </Button>
      <Button component={NavLink} to="/logout" startIcon={<ExitToAppIcon />}>
        Logout
      </Button>
  </>
}

const AdminNav = () => {
  return <>
      <Button component={NavLink} to="/logout" startIcon={<ExitToAppIcon />}>
        Logout
      </Button>
      {/**/}
  </>
}

const UnidentifiedUserNav = () => {
  return <>
      <Button component={NavLink} to="/login" startIcon={<LockIcon />}>
        Login
      </Button>
      <Button component={NavLink} to="/register" startIcon={<PersonAddIcon />}>
        Register
      </Button>
  </>
}



const Nav = () => {
  const {currentUser} = useContext(AuthContext);
  const [permission, setPermission] = useState(currentUser?.permission || 0);

  useEffect(() => {
  },[permission])

  useEffect(() => {
    setPermission(currentUser?.permission || 0);
  },[currentUser])

  
  return (
    <> 
      <nav>
        <Button component={NavLink} to="/" startIcon={<HomeIcon />}>
          Home
        </Button>
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
      </nav>
    </>
   );
}
export default Nav