import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";


const UserCard = ( {user} ) => {
    const dispatch=useDispatch();
    const {_id,firstName, lastName, age, gender,about, photoURL} = user;
    

    const handleSendrequst= async(status,id) =>{
      try{
        const req=await axios.post(BASE_URL+'/request/send/'+status+id,{},{withCredentials:true});
         dispatch(removeUserFromFeed(id))
      }
      catch(err){
        console.log(err);
      }
    }
    
  return (
    
    <div className="flex justify-center h-4/5 ">
      <div className="card card-compact bg-base-300 w-96 shadow-xl my-10">
        <figure className="flex justify-center my-5">
          <img className="w-80 h-80 object-cover"
            src={photoURL}
            alt="Profile Photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName+" " + lastName}</h2>
          
          {age && gender && <p>{age+ " "+gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary mx-2"
            onClick={()=>handleSendrequst("ignore/",_id)}>Ignore</button>
            <button className="btn btn-secondary"
            onClick={()=>handleSendrequst("intrested/",_id)}>Intrested</button>
          </div>
        </div>
      </div>
    </div>
     
    
  );
};

export default UserCard;
