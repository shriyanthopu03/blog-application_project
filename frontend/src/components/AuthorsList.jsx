import { useEffect, useState } from "react";
import axios from "axios";
import { errorClass, loadingClass, emptyStateClass, articleGrid, articleCardClass } from "../styles/common";

function AuthorsList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAuthors = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("http://localhost:4000/admin-api/authors", { withCredentials: true });
        if (res.status === 200) {
          setAuthors(res.data.payload || []);
        }
      } catch (err) {
        setError(err.response?.data?.error || err.response?.data?.message || "Failed to fetch authors");
      } finally {
        setLoading(false);
      }
    };

    getAuthors();
  }, []);

  const toggleAuthorStatus = async (authorObj) => {
    const nextStatus = !authorObj.isUserActive;
    try {
      const res = await axios.patch(
        `http://localhost:4000/admin-api/authors/${authorObj._id}/status`,
        { isUserActive: nextStatus },
        { withCredentials: true },
      );

      if (res.status === 200) {
        setAuthors((prev) =>
          prev.map((author) => (author._id === authorObj._id ? { ...author, isUserActive: nextStatus } : author)),
        );
      }
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || "Failed to update author status");
    }
  };

  if (loading) return <p className={loadingClass}>Loading authors...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (authors.length === 0) return <p className={emptyStateClass}>No authors found.</p>;

  return (
    <div>
      <h3 className="text-lg font-semibold text-[#1d1d1f] mb-4">Authors List</h3>

      <div className={articleGrid}>
        {authors.map((author) => (
          <div key={author._id} className={`${articleCardClass} rounded-2xl`}>
            <div className="flex items-center gap-3">
              {author?.profileImageUrl ? (
                <img src={author.profileImageUrl} alt="author" className="w-10 h-10 rounded-full object-cover border" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-sm font-semibold">
                  {author?.firstName?.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-[#1d1d1f]">
                  {author.firstName} {author.lastName}
                </p>
                <p className="text-xs text-[#6e6e73]">{author.email}</p>
              </div>
            </div>

            <p className="text-xs text-[#a1a1a6] mt-3">Status: {author.isUserActive ? "Active" : "Blocked"}</p>

            <button
              className="mt-3 border border-[#d2d2d7] text-[#1d1d1f] font-medium px-4 py-1.5 rounded-full hover:bg-[#f5f5f7] transition-colors cursor-pointer text-sm"
              onClick={() => toggleAuthorStatus(author)}
            >
              {author.isUserActive ? "Block" : "Unblock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthorsList;
