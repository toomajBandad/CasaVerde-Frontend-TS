import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function Overview() {
  const authContext = useContext(AuthContext);
  const userData = authContext.userInfos;
  const userFavorites = authContext.userFavorites;
  const userProperties = authContext.userProperties;
  const userMessages = authContext.userMessages;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={userData?.profile?.image || "/default-avatar.png"}
            alt="User Avatar"
            className="w-20 h-20 rounded-full shadow-md"
          />
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome back, {userData?.username || "User"}!
            </h1>
            <p className="text-gray-500">{userData?.email || "No email"}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-teal-600 text-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-medium">Favorites</h3>
          <p className="text-4xl font-bold mt-2">
            {userFavorites?.length || 0}
          </p>
        </div>

        <div className="bg-teal-500 text-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-medium">My Properties</h3>
          <p className="text-4xl font-bold mt-2">
            {userProperties?.length || 0}
          </p>
        </div>

        <div className="bg-teal-400 text-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-medium">Messages</h3>
          <p className="text-4xl font-bold mt-2">{userMessages?.length || 0}</p>
        </div>
      </div>

      {/* About section */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Account Overview
        </h2>
        <p className="text-gray-600 leading-relaxed">
          This is your personal dashboard where you can manage your saved
          properties, view your listings, check your messages, and update your
          account settings. Use the menu on the left to navigate through your
          profile.
        </p>
      </div>
    </div>
  );
}
