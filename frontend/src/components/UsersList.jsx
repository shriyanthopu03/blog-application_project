import { useEffect, useState } from "react";
import axios from "axios";
import { errorClass, loadingClass, emptyStateClass, articleGrid, articleCardClass } from "../styles/common";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("https://http://localhost:4000/admin-api/users", { withCredentials: true });
        if (res.status === 200) {
          setUsers(res.data.payload || []);
        }
      } catch (err) {
        setError(err.response?.data?.error || err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const toggleUserStatus = async (userObj) => {
    const nextStatus = !userObj.isUserActive;
    try {
      const res = await axios.patch(
        `https://http://localhost:4000/admin-api/users/${userObj._id}/status`,
        { isUserActive: nextStatus },
        { withCredentials: true },
      );

      if (res.status === 200) {
        setUsers((prev) =>
          prev.map((user) => (user._id === userObj._id ? { ...user, isUserActive: nextStatus } : user)),
        );
      }
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || "Failed to update user status");
    }
  };

  if (loading) return <p className={loadingClass}>Loading users...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (users.length === 0) return <p className={emptyStateClass}>No users found.</p>;

  return (
    <div>
      <h3 className="text-lg font-semibold text-[#1d1d1f] mb-4">Users List</h3>

      <div className={articleGrid}>
        {users.map((user) => (
          <div key={user._id} className={`${articleCardClass} rounded-2xl`}>
            <div className="flex items-center gap-3">
              {user?.profileImageUrl ? (
                <img src={user.profileImageUrl} alt="user" className="w-10 h-10 rounded-full object-cover border" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-sm font-semibold">
                  {user?.firstName?.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-[#1d1d1f]">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-[#6e6e73]">{user.email}</p>
              </div>
            </div>

            <p className="text-xs text-[#a1a1a6] mt-3">Status: {user.isUserActive ? "Active" : "Blocked"}</p>

            <button
              className="mt-3 border border-[#d2d2d7] text-[#1d1d1f] font-medium px-4 py-1.5 rounded-full hover:bg-[#f5f5f7] transition-colors cursor-pointer text-sm"
              onClick={() => toggleUserStatus(user)}
            >
              {user.isUserActive ? "Block" : "Unblock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;