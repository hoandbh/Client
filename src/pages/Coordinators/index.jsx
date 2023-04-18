import {useContext,React} from 'react';
import Login from "../Login"; 

import { AuthContext } from '../../context/authContext';

const Coordinator = () => {
  
  const {currentUser} = useContext(AuthContext);
  var name = currentUser?.name || 'default';

  return <>
    <p>hello {name}</p>
    <p>דף הבית של מרכזת רשומה</p>
  </>
};



export default Coordinator;