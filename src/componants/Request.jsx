import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);

  const reviewRequest = async(status,id) =>{
    try{
        const res=await axios.post(BASE_URL+'/request/review/'+status+"/"+id,{},{withCredentials:true});
        dispatch(removeRequest(id));       
    }
    catch(err){
        console.log(err);
    }
  }

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/receive", {
        withCredentials: true,
      });

      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!request) return;

  if (request.length === 0) return <div className="text-center text-3xl my-6">No Request Pending</div>;

  return (
    <div className="text-center my-5 mx-2">
      <h1 className=" text-bold text-white text-3xl">Requests</h1>
      <div className="flex flex-col content-center  gap-5 ">
        {request.map((value) => {
          const {_id, firstName, lastName, age, gender, about, photoURL } =
            value.fromUserId;
          return (
            <div key={_id} className="flex flex-col md:flex-row justify-between items-center m-2 p-4 bg-base-300 rounded-lg mx-auto">
              <div className="mb-4 md:mb-0">
                <img className="w-24 h-24 rounded-full" src={photoURL} />
              </div>
              <div className="text-left mx-4 flex-1">
                <h2 className="font-bold text-lg">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <div className="text-sm">{age + " " + gender}</div>}
                <div className="text-sm">{about}</div>
              </div>
              <div className="flex my-2">
                <button className="btn btn-success mx-2 mb-2 md:mb-0"
                onClick={()=>reviewRequest("accepted",value._id)}>Accept</button>
                <button className="btn btn-error mx-2"
                onClick={()=>reviewRequest("rejected",value._id)}>Reject</button>
              </div>
            </div>
          );
        })}
      </div>
      
      
    </div>
  );
};

export default Request;
