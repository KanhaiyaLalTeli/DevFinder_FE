import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addFeed} from '../utils/feedSlice';
import UserCard from "./UserCard";

const Feed = () => {
  const feed= useSelector((store) => store.feed);
  const dispatch= useDispatch();
  

  const getfeed= async() =>{   
    try{
      //  if(feed) return;
      const res=await axios.get(BASE_URL+'/feed',{withCredentials:true});     
      dispatch(addFeed(res?.data?.feedUser))
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getfeed();
  },[])

  if(!feed) return;

  if(feed.length ==0) return <div className="flex justify-center my-10">No More User Found</div>

  return (
    <div>
      { <UserCard user={feed[0]}/>}
    </div>
  )
}

export default Feed
