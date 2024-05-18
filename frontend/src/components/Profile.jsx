

const Profile = () => {
  
  return (
    <>
     
        <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md my-2">
          <h2 className="text-2xl font-semibold mb-4">Information</h2>
          <form >
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
               
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNo"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="number"
                id="mobileNo"
                name="mobileNo"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
               
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNo"
                className="block text-sm font-medium text-gray-700"
              >
                User Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                
              />
            </div>

            <div className="bg-orange-100">
              <label>Select Image</label>
              <img
                src="{avatarPreview}"
                alt="avatarImg"
                className="w-32 h-32 object-cover"
              />
              <input
                type="file"
                name="avatar"
                accept="image/*"
              
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
    
    </>
  );
};

export default Profile;
