
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { avatarUpdateUser, clearError, profile, profileDelete, profileUpdate } from "../redux/features/authSlice";
import { toast } from "react-toastify";
import Spinners from "../layouts/Spinners";
import { useNavigate } from "react-router-dom";
// import axios from "axios";



const Profile = () => {
   const {user, isLoading, error } = useSelector((state) =>state.auth)
     const dispatch = useDispatch();
     const navigate = useNavigate();

  //ones showns 
     const shownToasstOnce = useRef(false);

     const [updateValue, setUpdateValue] = useState({
      fullName: "",
      email: "",
      username: "",
      mobileNo: "",
      role: "",
    });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatar, setAvatarFile] = useState(null);
  
   //in my case user can change these value
   const { fullName, username, mobileNo } = updateValue;



   const handleChange = (e) => {
    let { name, value } = e.target;
    setUpdateValue({ ...updateValue, [name]: value });
  };
  

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  //for submit
  const handleSubmit = (e) => {
    e.preventDefault();

    /* bainary pani send ---multipart form data*/

    const updateForm = new FormData();
    updateForm.append("fullName", fullName);
    updateForm.append("username", username);
    updateForm.append("mobileNo", mobileNo);
    // updateForm.append("avatar", avatar);

    dispatch(profileUpdate({ updateForm, toast }));
  };
  
  useEffect(() => {
    if (user) {
      setUpdateValue({ fullName: user.fullName || "" });
      setUpdateValue({ username: user.username || "" });
      setUpdateValue({ mobileNo: user.mobileNo || "" });
      
      // setAvatarPreview(user?.avatar?.url || "");
    }
  }, [user]);
  
  //for avatar 
  const handleAvatarSubmit = (e) => {
    e.preventDefault();

    const updateForm = new FormData();
   
    updateForm.append("avatar", avatar);

    dispatch(avatarUpdateUser({ updateForm, toast }));
  };
  useEffect(() => {
    if (user) {
      
      setAvatarPreview(user?.avatar?.url || "");
    }
  }, [user]);
  

  useEffect(() => {
    if (error && !shownToasstOnce.current) {
      toast.error(error);
      dispatch(clearError());
      shownToasstOnce.current = true;
    }

    dispatch(profile());
  }, [dispatch, error]);


  //handle deleteuser part
  const handleDeleteUser =  (id) => {
    try {
      dispatch(profileDelete({id, toast, navigate})); // Your delete user logic here
      alert("User deleted successfully");
      
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md my-2 flex space-x-4">
        {/* Information Form */}
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                value={fullName}
                onChange={handleChange}
                />
            </div>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                User Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                value={username}
                onChange={handleChange}
                />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
                >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                value={user.email}
                disabled
                />
            </div>
            <div className="mb-4">
              <label
                htmlFor="mobileNo"
                className="block text-sm font-medium text-gray-700"
                >
                Phone Number
              </label>
              <input
                type="number"
                id="mobileNo"
                name="mobileNo"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                value={mobileNo}
                onChange={handleChange}
               />
            </div>
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
                >
                User Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                value={user.role}
                disabled
             />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {isLoading && <Spinners />} Save
              </button>
            </div>
          </form>
        </div>

        {/* Avatar Upload Form */}
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mb-4"> Update Avatar</h2>
          <form onSubmit={handleAvatarSubmit}>
          <div className="bg-orange-100 p-4 rounded-md">
            <label className="block text-sm font-medium text-gray-700">
              Select Image
            </label>
            {avatarPreview ? (
              <img
              src={avatarPreview}
                alt="avatar"
                className="w-32 h-32 object-cover mt-2 mb-4"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-200 flex items-center justify-center mt-2 mb-4">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-2"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-4"
            >
             {isLoading && <Spinners />} Save
            </button>
          </div>
          </form>
        </div>
      </div>

      {/* Delete User Button */}
      <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md my-2">
        <button
          type="button"
          onClick={handleDeleteUser}
          className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete User
        </button>
      </div>
    </>
  );
};

export default Profile;

// const Profile = () => {
//   const [userData, setUserData] = useState({
//     fullName: "",
//     username: "",
//     email: "",
//     mobileNo: "",
//     role: "",
//   });

//   const [avatar, setAvatar] = useState(null);
//   const [avatarPreview, setAvatarPreview] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({
//       ...userData,
//       [name]: value,
//     });
//   };

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     setAvatar(file);
//     setAvatarPreview(URL.createObjectURL(file));
//   };

//   const handleUserDetailsSubmit = async (e) => {
//     e.preventDefault();
//     // Make API call to update user details
//     try {
//       await axios.patch("/api/user/update-details", userData);
//       alert("User details updated successfully!");
//     } catch (error) {
//       console.error("Error updating user details:", error);
//       alert("Failed to update user details.");
//     }
//   };

//   const handleAvatarSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("avatar", avatar);
//     // Make API call to update user avatar
//     try {
//       await axios.patch("/api/user/update-avatar", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Avatar updated successfully!");
//     } catch (error) {
//       console.error("Error updating avatar:", error);
//       alert("Failed to update avatar.");
//     }
//   };

//   return (
//     <>
//       <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md my-2">
//         <h2 className="text-2xl font-semibold mb-4">Information</h2>
//         <form onSubmit={handleUserDetailsSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="fullName"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="fullName"
//               name="fullName"
//               className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
//               value={userData.fullName}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="username"
//               className="block text-sm font-medium text-gray-700"
//             >
//               User Name
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
//               value={userData.username}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
//               value={userData.email}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="mobileNo"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Phone Number
//             </label>
//             <input
//               type="number"
//               id="mobileNo"
//               name="mobileNo"
//               className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
//               value={userData.mobileNo}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="role"
//               className="block text-sm font-medium text-gray-700"
//             >
//               User Role
//             </label>
//             <input
//               type="text"
//               id="role"
//               name="role"
//               className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
//               value={userData.role}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="mt-4">
//             <button
//               type="submit"
//               className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>

//       <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md my-2">
//         <h2 className="text-2xl font-semibold mb-4">Update Avatar</h2>
//         <form onSubmit={handleAvatarSubmit}>
//           <div className="bg-orange-100 mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Image
//             </label>
//             {avatarPreview && (
//               <img
//                 src={avatarPreview}
//                 alt="avatarImg"
//                 className="w-32 h-32 object-cover mb-4"
//               />
//             )}
//             <input
//               type="file"
//               name="avatar"
//               accept="image/*"
//               onChange={handleAvatarChange}
//             />
//           </div>
//           <div className="mt-4">
//             <button
//               type="submit"
//               className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               Upload
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };
