import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addConnection } from "../utils/connectionSlice";


const Connections = () => {
    const dispatch= useDispatch();
    const connections=useSelector((store) => store.connection);
   
     const fetchConnection= async() =>{
        try{ 
        const res = await axios.get(BASE_URL+'/user/connection',{withCredentials:true});
        
        dispatch(addConnection(res?.data));
        
        }
     
        catch(err){
        console.log(err);
         }
    }

     useEffect(()=>{
    fetchConnection()
},[])

if(!connections) return;

if(connections.length===0) return <div className="text-center text-white text-3xl my-5">No Connnection Found</div>

  return  (
    <div className="text-center my-5 flex-grow p-4 pb-16">
      <h1 className=" text-bold text-white text-3xl">Connections</h1>
      <div className="flex flex-col content-center gap-5">
        {connections.map((value)=>{
        let {_id,firstName,lastName,age,gender,about,photoURL} = value;
        if(about.length>100){
           about= about.substring(0,100)+"...";
        }
        return(
            <div key={_id} className="connection-container flex flex-col md:flex-row p-4 bg-base-300 rounded-lg mx-auto">
                <div className="w-1/5 md:w-1/6 h-24 mb-4 md:mb-0 mx-auto">
                <img className='w-full h-full rounded-full object-cover' src={photoURL}/></div>
                <div className="w-full md:w-5/6 text-left mx-4">
                    <h2 className="font-bold text-lg">{firstName + " "+ lastName}</h2>
                    { age && gender && <div>{age + " "+ gender}</div>}
                    <div>{about}</div>
                </div>
            </div>
        )
      })}</div>
    </div>
  )
}

export default Connections;
