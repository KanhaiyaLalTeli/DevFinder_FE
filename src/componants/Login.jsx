import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import  {BASE_URL} from "../utils/constant";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] =useState('');
  const [firstName, setFirstName]=useState('');
  const [lastName, setLastName]=useState('');
  const [isLoginForm,setLoginForm]=useState(false);
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const [error, setError] = useState('');

  const handleLogIn = async() =>{
    try{
       const res= await axios.post(BASE_URL + "/login",{email,password},{withCredentials: true});
       dispatch(addUser(res.data));       
       return navigate('/');       
    }
    catch(err){
      setError(err.response.data)
    }
  }

  const handleSignUp = async() =>{
    try{
      const res=await axios.post(BASE_URL+'/signup',{firstName,lastName,email,password},{withCredentials:true});
      console.log(res.data.data);
      dispatch(addUser(res.data.data));
      return navigate('/profile');

    }
    catch(err){
      setError(err?.response?.data);
    }
  }

  return (
    
    <div className="flex justify-center my-4">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex justify-center">{isLoginForm ? "LogIn" : "SignUp"}</h2>

          {!isLoginForm && <><label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">First Name</span>              
            </div>
            <input
              type="text"
              value={firstName}
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=>setFirstName(e.target.value)}
            />          
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">LastName</span>              
            </div>
            <input
              type="text"
              value={lastName}
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=>setLastName(e.target.value)}
            />          
          </label> </>}

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email</span>              
            </div>
            <input
              type="text"
              value={email}
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=>setEmail(e.target.value)}
            />          
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>              
            </div>
            <input
              type="text"
              value={password}
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=>setPassword(e.target.value)}
            />          
          </label>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center my-2">
            
            <button className="btn btn-primary" onClick={isLoginForm? handleLogIn : handleSignUp}>
              { isLoginForm ? "LogIn" : "SignUp"}</button>
          </div>
          <p className="text-center py-2 cursor-pointer" onClick={()=>setLoginForm((value)=> !value)}>
            {isLoginForm ? "New User Sign Up" : "Existing User Log In" }
            
          </p>
        </div>
      </div>
      
    </div>
    
    
  );
};

export default Login;
