import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function Setting() {
  const authContext = useContext(AuthContext);
  const userData = authContext.userInfos;
  const userFavorites = authContext.userFavorites;
  const userProperties = authContext.userProperties;
  const userMessages = authContext.userMessages;

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>

      {/* Profile Information */}
      <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Profile Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <button className="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
          Save Changes
        </button>
      </section>

      {/* Change Password */}
      <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-600 mb-1">Current Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <button className="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
          Update Password
        </button>
      </section>

      {/* Notifications */}
      <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>

        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-5 h-5" />
            <span className="text-gray-700">
              Email me when someone messages me
            </span>
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-5 h-5" />
            <span className="text-gray-700">
              Email me about new property recommendations
            </span>
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-5 h-5" />
            <span className="text-gray-700">Send me promotional updates</span>
          </label>
        </div>

        <button className="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
          Save Preferences
        </button>
      </section>

      {/* Danger Zone */}
      <section className="bg-red-50 border border-red-200 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-red-700">Danger Zone</h2>

        <p className="text-red-600">
          Deleting your account is permanent and cannot be undone.
        </p>

        <button className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
          Delete Account
        </button>
      </section>
    </div>
  );
}
