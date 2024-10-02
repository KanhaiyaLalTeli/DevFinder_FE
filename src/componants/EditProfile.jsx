import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || '');
  const [gender, setGender] = useState(user.gender || '');
  const [about, setAbout] = useState(user.about || '');
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const dispatch = useDispatch();
  const [notification,setNotification] = useState(false);
  const [error, setError] = useState('');

  const handleProfileUpdate = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoURL },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setNotification(true);
      setTimeout(()=>{setNotification(false)},3000);
    } catch (err) {
      setError(err?.response?.data);
    }
  };
  return (
    <div className="profile-container flex gap-4 justify-center">
      <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex justify-center">Edit Profile</h2>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">FirstName</span>
              </div>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}
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
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                type="text"
                value={age}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <input
                type="text"
                value={gender}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setGender(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <input
                type="text"
                value={about}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">PhotoURL</span>
              </div>
              <input
                type="text"
                value={photoURL}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </label>

            <div className="card-actions justify-center my-2">
              <button className="btn btn-primary" onClick={handleProfileUpdate}>
                Save Profile
              </button>
            </div>
            <p className="text-red-500">{error}</p>
          </div>
          
        </div>
      </div>
      <UserCard user={{ firstName, lastName, about, age, gender, photoURL }} />
      {notification && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile update successfully.</span>
        </div>
      </div>}
    </div>
  );
};

export default EditProfile;
