import { AuthContext } from "../../context/authContext";
import {useContext, React, useEffect} from 'react';
 
const Coordinator = () => {

  var name = 'default';
  // const {currentUser} = useContext(AuthContext);
  // const {login} = useContext(login);
  // loadUser();

  // const setName = () => {
  //   name = currentUser? currentUser.user_name : '??';
  // }


  // const loadUser = async () => { 
  //   const userDetails = {
  //     user_name:"hadas",
  //     password:"123"
  //   }
  //   await login(userDetails);
  //   setName();
  // }
 
  
  return <>
    <p>hello {name}</p>
    <p>דף הבית של מרכזת רשומה</p>
  </>
};



export default Coordinator;