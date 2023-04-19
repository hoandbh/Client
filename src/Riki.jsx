// import { Link } from "react-router-dom";
// import { useFormik } from "formik";
// import {Button ,TextField} from '@mui/material';

// const Login = () => {

//     const login = () => {}
//     const { handleSubmit ,handleChange ,values ,getFieldProps ,errors,touched, handleReset} = useFormik({
//         initialValues: {
//             email:'',
//             password:''
//         },
//         onSubmit: async(values)=>{
//           console.log('in submit');
//           await login({ userName:values.email,password:values.password});
//         },
//         onReset: (values) => {
//           console.log(values);
//         }
//     });

//     return (
//         <>
//         <form onSubmit={handleSubmit} onReset={handleReset}>
//           <TextField 
//           value={values.email} 
//           id="outlined-basic" 
//           label=" מייל"
//           variant="outlined" 
//             {...getFieldProps("email")} 
//             onChange={handleChange}
//             error={touched.email && Boolean(errors.email)}
//             helperText={touched.email && errors.email}
//           />
//           <br/>
//           <TextField 
//           value={values.password} 
//           id="outlined-basic" 
//           label=" סיסמה"
//           variant="outlined" 
//             {...getFieldProps("password")} 
//             onChange={handleChange}
//             error={touched.password && Boolean(errors.password)}
//             helperText={touched.password && errors.password}
//           />
//               <Button type="submit">לחץ לכניסה</Button>
//               <Button type="reset">לחץ לביטול</Button>
//         </form>
//         <Link to="/register">אתה לא רשום? לחץ כאן</Link>
//         </>
//     )
// }

// export default Login

