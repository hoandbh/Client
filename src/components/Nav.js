// import { NavLink } from "react-router-dom"
// import { useState, useContext, useEffect } from 'react'
// import { AuthContext } from "../context/authContext"
// import HomeIcon from '@mui/icons-material/Home';
// import LockIcon from '@mui/icons-material/Lock';
// import PersonAddIcon from '@mui/icons-material/Person';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import ListIcon from '@mui/icons-material/List';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import SchoolIcon from '@mui/icons-material/School';

// import { Button} from '@mui/material';

// const TeacherNav = () => {
//   return <>
//       <Button component={NavLink} to="/questionnaire/new" startIcon={<AddBoxIcon />}>
//         New Questionnaire
//       </Button>
//       <Button component={NavLink} to="/questionnaires" startIcon={<ListIcon />}>
//         questionnaires
//       </Button>
//       <Button component={NavLink} to="/statistic" startIcon={<BarChartIcon />}>
//         statistic
//       </Button>
//       <Button component={NavLink} to="/logout" startIcon={<ExitToAppIcon />}>
//         Logout
//       </Button>
//   </>
// }

// const AdminNav = () => {
//   return <>
//       <Button component={NavLink} to="/logout" startIcon={<ExitToAppIcon />}>
//         Logout
//       </Button>
//       <Button component={NavLink} to="/courses" startIcon={<SchoolIcon  />}>
//         Courses
//       </Button>
//       {/**/}
//   </>
// }

// const UnidentifiedUserNav = () => {
//   return <>
//       <Button component={NavLink} to="/login" startIcon={<LockIcon />}>
//         Login
//       </Button>
//       <Button component={NavLink} to="/register" startIcon={<PersonAddIcon />}>
//         Register
//       </Button>
//   </>
// }



// const Nav = () => {
//   const {currentUser} = useContext(AuthContext);
//   const [permission, setPermission] = useState(currentUser?.permission || 0);

//   useEffect(() => {
//   },[permission])

//   useEffect(() => {
//     setPermission(currentUser?.permission || 0);
//   },[currentUser])


//   return (
//     <> 
//       <nav>
//         <Button component={NavLink} to="/" startIcon={<HomeIcon />}>
//           Home
//         </Button>
//         {
//           (() => {
//             switch (permission) {
//               case 1:
//                 return <TeacherNav />
//               case 2:
//                 return <AdminNav />
//               default:
//                 return <UnidentifiedUserNav />     
//             }
//           })()
//         }
//       </nav>
//     </>
//    );
// }
// export default Nav


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
import SchoolIcon from '@mui/icons-material/School';

import { Button } from '@mui/material';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { Avatar } from '@mui/material';




const TeacherNav = () => {
  return <>
    <Button style={{ color: 'white' }} component={NavLink} to="/questionnaire/new" startIcon={<AddBoxIcon />}>
      New Questionnaire
    </Button>
    <Button style={{ color: 'white' }} component={NavLink} to="/questionnaires" startIcon={<ListIcon />}>
      questionnaires
    </Button>
    <Button style={{ color: 'white' }} component={NavLink} to="/statistic" startIcon={<BarChartIcon />}>
      statistic
    </Button>
  </>
}

const AdminNav = () => {
  return <>
    <Button style={{ color: 'white' }} component={NavLink} to="/courses" startIcon={<SchoolIcon />}>
      Courses
    </Button>
  </>
}

const UnidentifiedUserNav = () => {
  return <>
    <Button style={{ color: 'white' }} component={NavLink} to="/login" startIcon={<LockIcon />}>
      Login
    </Button>
    <Button style={{ color: 'white' }} component={NavLink} to="/register" startIcon={<PersonAddIcon />}>
      Register
    </Button>
  </>
}


const Nav = () => {

  const [auth, setAuth] = useState(true);

  const { currentUser } = useContext(AuthContext);
  const [permission, setPermission] = useState(currentUser?.permission || 0);

  useEffect(() => {
  }, [permission])

  useEffect(() => {
    setPermission(currentUser?.permission || 0);
    //console.log(currentUser)
  }, [currentUser])

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', 'justifyContent': 'space-between' }}>
          <Box>
            {
              (() => {
                switch (permission) {
                  case 1:
                    return <TeacherNav />
                  case 2:
                    return <AdminNav />
                  default:
                    return <UnidentifiedUserNav />
                }
              })()
            }
          </Box>

          {currentUser && <Box>
            <IconButton
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
              
            <Button style={{ color: 'white' }} component={NavLink} to="/logout" startIcon={<ExitToAppIcon />}>
              Logout
            </Button>
          </Box>
          }
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Nav

