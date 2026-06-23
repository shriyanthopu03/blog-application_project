import React, { useEffect, useState } from "react";
import { useAuth } from "../store/authStore";
import { NavLink, useNavigate } from "react-router";
import api from "../config/api";
import {
  articleGrid,
  articleCardClass,
  articleTitle,
  timestampClass,
  ghostBtn,
  loadingClass,
  errorClass,
  primaryBtn,
  secondaryBtn,
} from "../styles/common.js";

function Home() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [authorArticles, setAuthorArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (currentUser?.role === "USER") {
          const res = await api.get("/user-api/articles");
          if (res.status === 200) {
            setArticles(res.data.payload || []);
          }
        } else if (currentUser?.role === "AUTHOR") {
          const res = await api.get("/author-api/articles");
          if (res.status === 200) {
            setAuthorArticles(res.data.payload || []);
          }
        }
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
        setError(err.response?.data?.error || "Failed to load dashboard updates.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated, currentUser]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  // ────────────────────────────────────────────────────────
  // 1. VISITOR / UNAUTHENTICATED VIEW
  // ────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col gap-20 py-10">
        {/* HERO SECTION */}
        <section className="relative text-center max-w-4xl mx-auto px-4 pt-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40 -z-10 animate-pulse"></div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1d1d1f] mb-6 leading-tight">
            Where words spark <br />
            <span className="bg-gradient-to-r from-[#0066cc] via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              limitless ideas.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#6e6e73] font-normal leading-relaxed mb-10 max-w-2xl mx-auto">
            Join a premium, high-fidelity publishing platform designed for developers, creators, and modern thinkers to share their wisdom.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NavLink
              to="/register"
              className="w-full sm:w-auto bg-[#0066cc] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#004499] hover:scale-105 transition-all shadow-md text-base text-center cursor-pointer"
            >
              Start Reading For Free
            </NavLink>
            <NavLink
              to="/login"
              className="w-full sm:w-auto border border-[#d2d2d7] text-[#1d1d1f] bg-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#f5f5f7] hover:scale-105 transition-all text-base text-center cursor-pointer"
            >
              Sign In to Account
            </NavLink>
          </div>
        </section>

        {/* TOPICS SECTION */}
        <section className="max-w-5xl mx-auto w-full px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1d1d1f] tracking-tight">Explore curated topics</h2>
            <p className="text-sm text-[#6e6e73] mt-2">Diving deep into contemporary fields of expertise</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tech */}
            <div className="bg-[#f5f5f7] hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-3xl p-6 border border-[#e8e8ed] flex flex-col justify-between group">
              <div>

                <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">Technology</h3>
                <p className="text-sm text-[#6e6e73] leading-relaxed">
                  Insights on emerging hardware, gadget ecosystems, and future technical landscape.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#0066cc] mt-6 inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                Read Technology →
              </span>
            </div>

            {/* Programming */}
            <div className="bg-[#f5f5f7] hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-3xl p-6 border border-[#e8e8ed] flex flex-col justify-between group">
              <div>

                <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">Programming</h3>
                <p className="text-sm text-[#6e6e73] leading-relaxed">
                  Code patterns, paradigms, architectural decisions, and algorithmic tutorials.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#0066cc] mt-6 inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                Read Programming →
              </span>
            </div>

            {/* AI */}
            <div className="bg-[#f5f5f7] hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-3xl p-6 border border-[#e8e8ed] flex flex-col justify-between group">
              <div>

                <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">Artificial Intelligence</h3>
                <p className="text-sm text-[#6e6e73] leading-relaxed">
                  Deep dives into LLMs, computer vision, AI agents, and ethical machine learning.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#0066cc] mt-6 inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                Read AI →
              </span>
            </div>

            {/* Web Dev */}
            <div className="bg-[#f5f5f7] hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-3xl p-6 border border-[#e8e8ed] flex flex-col justify-between group">
              <div>

                <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">Web Development</h3>
                <p className="text-sm text-[#6e6e73] leading-relaxed">
                  Modern frontend frameworks, serverless, database optimizations, and tooling.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#0066cc] mt-6 inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                Read Web Dev →
              </span>
            </div>
          </div>
        </section>

        {/* NEWSLETTER ROW */}
        <section className="max-w-3xl mx-auto text-center px-4 py-8">
          <h2 className="text-2xl font-bold text-[#1d1d1f] tracking-tight">Stay updated with weekly digests</h2>
          <p className="text-sm text-[#6e6e73] mt-2 mb-6">No spam. Only deep, informative technical content straight to your inbox.</p>
          
          {newsletterSubscribed ? (
            <div className="bg-green-50 text-[#248a3d] border border-green-200 rounded-2xl py-4 px-6 inline-block font-semibold">
              🎉 Thank you for subscribing! You are on the list.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-[#f5f5f7] border border-[#d2d2d7] rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#0066cc] focus:bg-white transition"
              />
              <button
                type="submit"
                className="bg-[#1d1d1f] text-white hover:bg-black font-semibold px-6 py-3 rounded-full text-sm transition shadow cursor-pointer whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </section>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────
  // 2. AUTHENTICATED USERS VIEWS (DASHBOARD LAYOUT)
  // ────────────────────────────────────────────────────────
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-10">
      {/* PERSONALIZED HEADER */}
      <div className="bg-gradient-to-br from-white to-[#f5f5f7] border border-[#e8e8ed] rounded-3xl p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-[#1d1d1f] tracking-tight mt-3">
            Welcome back, {currentUser?.firstName || "Friend"}!
          </h2>
          <p className="text-sm text-[#6e6e73] mt-1.5 leading-relaxed">
            {currentUser?.role === "USER" && "Explore the latest wisdom shared by authors on programming and technology."}
            {currentUser?.role === "AUTHOR" && "Manage your articles, review readers' comment threads, and write new drafts."}
            {currentUser?.role === "ADMIN" && "Manage platform safety, edit directories, and inspect system users."}
          </p>
        </div>

        {/* AVATAR DETAILS */}
        <div className="flex items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-[#e8e8ed]">
          {currentUser?.profileImageUrl ? (
            <img
              src={currentUser.profileImageUrl}
              className="w-14 h-14 rounded-full object-cover border border-[#d2d2d7] shadow-inner"
              alt="avatar"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#0066cc] to-[#004499] text-white flex items-center justify-center text-lg font-bold shadow">
              {currentUser?.firstName?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h4 className="text-sm font-bold text-[#1d1d1f] leading-none">
              {currentUser?.firstName} {currentUser?.lastName}
            </h4>
            <span className="text-xs text-[#a1a1a6] mt-1 block font-mono">{currentUser?.email}</span>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS GRID */}
      <div>
        <h3 className="text-lg font-bold text-[#1d1d1f] tracking-tight mb-4">Quick Management Actions</h3>
        
        {currentUser?.role === "USER" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <button
              onClick={() => navigate("/user-profile")}
              className="bg-[#f5f5f7] hover:bg-white hover:shadow-md border border-[#e8e8ed] rounded-2xl p-6 text-left transition duration-200 group cursor-pointer"
            >
              <h4 className="text-sm font-bold text-[#1d1d1f] group-hover:text-[#0066cc]">Browse Your Feed</h4>
              <p className="text-xs text-[#6e6e73] mt-1">Read articles, view publishing times, and add comments.</p>
            </button>
            <button
              onClick={() => navigate("/user-profile")}
              className="bg-[#f5f5f7] hover:bg-white hover:shadow-md border border-[#e8e8ed] rounded-2xl p-6 text-left transition duration-200 group cursor-pointer"
            >
              <h4 className="text-sm font-bold text-[#1d1d1f] group-hover:text-[#0066cc]">Your User Profile</h4>
              <p className="text-xs text-[#6e6e73] mt-1">Check credentials, logged statuses, and accounts details.</p>
            </button>
            <div className="bg-[#f5f5f7] rounded-2xl p-6 border border-[#e8e8ed] flex flex-col justify-center">
              <span className="text-xs text-[#a1a1a6]">Protip</span>
              <p className="text-xs text-[#6e6e73] mt-1.5 leading-relaxed font-normal">
                To add feedback or questions, click on any article and scroll to the bottom comments section!
              </p>
            </div>
          </div>
        )}

        {currentUser?.role === "AUTHOR" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <button
              onClick={() => navigate("/author-profile/write-article")}
              className="bg-blue-50/50 hover:bg-blue-50 hover:shadow-md border border-blue-100 rounded-2xl p-6 text-left transition duration-200 group cursor-pointer"
            >
              <h4 className="text-sm font-bold text-blue-900 group-hover:text-[#0066cc]">Write New Article</h4>
              <p className="text-xs text-blue-700/80 mt-1">Create posts across Technology, Programming, AI, or Web Dev.</p>
            </button>
            <button
              onClick={() => navigate("/author-profile")}
              className="bg-[#f5f5f7] hover:bg-white hover:shadow-md border border-[#e8e8ed] rounded-2xl p-6 text-left transition duration-200 group cursor-pointer"
            >
              <h4 className="text-sm font-bold text-[#1d1d1f] group-hover:text-[#0066cc]">Manage My Articles</h4>
              <p className="text-xs text-[#6e6e73] mt-1">Edit title details, review active status, or delete files.</p>
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-[#f5f5f7] hover:bg-white hover:shadow-md border border-[#e8e8ed] rounded-2xl p-6 text-left transition duration-200 group cursor-pointer"
            >
              <h4 className="text-sm font-bold text-[#1d1d1f] group-hover:text-[#0066cc]">All Articles</h4>
              <p className="text-xs text-[#6e6e73] mt-1">Browse all published files from fellow MyBlog authors.</p>
            </button>
          </div>
        )}

        {currentUser?.role === "ADMIN" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <button
              onClick={() => navigate("/admin-profile/users")}
              className="bg-purple-50/50 hover:bg-purple-50 hover:shadow-md border border-purple-100 rounded-2xl p-6 text-left transition duration-200 group cursor-pointer"
            >
              <h4 className="text-sm font-bold text-purple-900 group-hover:text-purple-600">Moderate Users</h4>
              <p className="text-xs text-purple-700/80 mt-1">View list of users, inspect roles, or block user accounts.</p>
            </button>
            <button
              onClick={() => navigate("/admin-profile/authors")}
              className="bg-[#f5f5f7] hover:bg-white hover:shadow-md border border-[#e8e8ed] rounded-2xl p-6 text-left transition duration-200 group cursor-pointer"
            >
              <h4 className="text-sm font-bold text-[#1d1d1f] group-hover:text-[#0066cc]">Moderate Authors</h4>
              <p className="text-xs text-[#6e6e73] mt-1">Inspect authors and customize block/active status variables.</p>
            </button>
            <button
              onClick={() => navigate("/admin-profile")}
              className="bg-[#f5f5f7] hover:bg-white hover:shadow-md border border-[#e8e8ed] rounded-2xl p-6 text-left transition duration-200 group cursor-pointer"
            >
              <h4 className="text-sm font-bold text-[#1d1d1f] group-hover:text-[#0066cc]">Admin Console</h4>
              <p className="text-xs text-[#6e6e73] mt-1">View comprehensive list details and user profile items.</p>
            </button>
          </div>
        )}
      </div>

      {/* ERROR & LOADING STATES */}
      {loading && <p className={loadingClass}>Updating feed items...</p>}
      {error && <p className={errorClass}>{error}</p>}

      {/* DYNAMIC ARTICLE FEEDS */}
      {!loading && (
        <div className="border-t border-[#e8e8ed] pt-8">
          {currentUser?.role === "USER" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight">Latest Published Articles</h3>
                <NavLink to="/user-profile" className="text-xs font-semibold text-[#0066cc] hover:underline">
                  View Feed page →
                </NavLink>
              </div>

              {articles.length === 0 ? (
                <div className="bg-[#f5f5f7] rounded-3xl py-12 text-center border border-[#e8e8ed]">
                  <p className="text-sm text-[#a1a1a6]">No articles have been published on the platform yet.</p>
                </div>
              ) : (
                <div className={articleGrid}>
                  {articles.map((art) => (
                    <div
                      key={art._id}
                      onClick={() => navigate(`/article/${art._id}`, { state: art })}
                      className={`${articleCardClass} relative overflow-hidden rounded-3xl border border-[#e8e8ed] group`}
                    >
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0066cc] bg-blue-50 px-2 py-0.5 rounded">
                              {art.category}
                            </span>
                            <span className="text-[10px] text-[#a1a1a6] font-mono">
                              {new Date(art.createdAt).toLocaleDateString("en-IN", { dateStyle: "short" })}
                            </span>
                          </div>
                          
                          <h4 className="text-base font-bold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors leading-snug line-clamp-2">
                            {art.title}
                          </h4>
                          
                          <p className="text-xs text-[#6e6e73] leading-relaxed mt-2.5 line-clamp-3">
                            {art.content}
                          </p>
                        </div>

                        <div className="border-t border-[#e8e8ed]/60 pt-3 mt-4 flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-[#6e6e73] flex items-center gap-1">
                            Author Desk
                          </span>
                          <span className="text-xs font-bold text-[#0066cc] group-hover:translate-x-1 transition-transform">
                            Read article →
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentUser?.role === "AUTHOR" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight">Your Writing Desk</h3>
                <NavLink to="/author-profile" className="text-xs font-semibold text-[#0066cc] hover:underline">
                  Go to Profile Dashboard →
                </NavLink>
              </div>

              {authorArticles.length === 0 ? (
                <div className="bg-[#f5f5f7] rounded-3xl py-12 text-center border border-[#e8e8ed]">
                  <p className="text-sm text-[#a1a1a6] mb-4">You haven't written any articles yet.</p>
                  <button
                    onClick={() => navigate("/author-profile/write-article")}
                    className={primaryBtn}
                  >
                    Write Your First Post
                  </button>
                </div>
              ) : (
                <div className={articleGrid}>
                  {authorArticles.map((art) => (
                    <div
                      key={art._id}
                      onClick={() => navigate(`/article/${art._id}`, { state: art })}
                      className={`${articleCardClass} relative rounded-3xl border border-[#e8e8ed] overflow-hidden group`}
                    >
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0066cc] bg-blue-50 px-2 py-0.5 rounded">
                              {art.category}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              art.isArticleActive 
                                ? "bg-green-50 text-green-700 border border-green-100" 
                                : "bg-red-50 text-red-700 border border-red-100"
                            }`}>
                              {art.isArticleActive ? "Active" : "Deleted"}
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors leading-snug line-clamp-2">
                            {art.title}
                          </h4>

                          <p className="text-xs text-[#6e6e73] leading-relaxed mt-2.5 line-clamp-3">
                            {art.content}
                          </p>
                        </div>

                        <div className="border-t border-[#e8e8ed]/60 pt-3 mt-4 flex items-center justify-between">
                          <span className="text-[10px] text-[#a1a1a6] font-mono">
                            Created: {new Date(art.createdAt).toLocaleDateString()}
                          </span>
                          <span className="text-xs font-bold text-[#0066cc] group-hover:translate-x-1 transition-transform">
                            Manage Desk →
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentUser?.role === "ADMIN" && (
            <div className="bg-[#f5f5f7] rounded-3xl p-8 border border-[#e8e8ed] text-center">
              <h4 className="text-base font-bold text-[#1d1d1f]">Administrative Control Active</h4>
              <p className="text-xs text-[#6e6e73] mt-2 max-w-md mx-auto">
                As an Admin, your account has authorization to list and status-patch all users and authors. 
                Use the quick buttons above to toggle block metrics or view user records.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;