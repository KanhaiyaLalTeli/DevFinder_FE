import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { useEffect } from "react";


const Profile = () =>{
    const user=useSelector((store)=>store.user);

    useEffect(()=>{

    })

    return user &&(
        <>
        <EditProfile user={user}/>
        </>
    )
}

export default Profile;