import React, { useState } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../store/authStore";

function Footer() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const getProfilePath = () => {
    if (!user) return "/";
    switch (user.role) {
      case "AUTHOR":
        return "/author-profile";
      case "ADMIN":
        return "/admin-profile";
      default:
        return "/user-profile";
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#f5f5f7] border-t border-[#e8e8ed] mt-20 pt-16 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* BRAND COLUMN */}
          <div className="flex flex-col gap-4">
            <NavLink to="/" className="text-lg font-bold text-[#1d1d1f] tracking-tight">
              MyBlog
            </NavLink>
            <p className="text-xs text-[#6e6e73] leading-relaxed">
              A premium, high-fidelity space for authors and readers to share insights across software development, coding architectures, and artificial intelligence.
            </p>
          </div>

          {/* EXPLORE / QUICK LINKS COLUMN */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider">Explore</h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <NavLink to="/" end className="text-[#6e6e73] hover:text-[#0066cc] transition-colors">
                  Home
                </NavLink>
              </li>
              {!isAuthenticated ? (
                <>
                  <li>
                    <NavLink to="/register" className="text-[#6e6e73] hover:text-[#0066cc] transition-colors">
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" className="text-[#6e6e73] hover:text-[#0066cc] transition-colors">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to={getProfilePath()} className="text-[#6e6e73] hover:text-[#0066cc] transition-colors">
                    Dashboard Profile
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* TOPICS COLUMN */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider">Topics</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#6e6e73]">
              <li>
                <span className="hover:text-[#0066cc] cursor-pointer transition-colors">Technology</span>
              </li>
              <li>
                <span className="hover:text-[#0066cc] cursor-pointer transition-colors">Programming</span>
              </li>
              <li>
                <span className="hover:text-[#0066cc] cursor-pointer transition-colors">Artificial Intelligence</span>
              </li>
              <li>
                <span className="hover:text-[#0066cc] cursor-pointer transition-colors">Web Development</span>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER COLUMN */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider">Newsletter</h4>
            <p className="text-xs text-[#6e6e73] leading-relaxed">
              Stay in the loop with weekly publications.
            </p>
            
            {subscribed ? (
              <span className="text-xs text-green-700 bg-green-50 px-3 py-2 rounded-xl border border-green-100 font-semibold block">
                ✓ You have subscribed!
              </span>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border border-[#d2d2d7] rounded-xl px-3.5 py-2 text-xs text-[#1d1d1f] placeholder:text-[#a1a1a6] focus:outline-none focus:border-[#0066cc] transition"
                />
                <button
                  type="submit"
                  className="bg-[#0066cc] hover:bg-[#004499] text-white text-xs font-semibold py-2 rounded-xl transition cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* BOTTOM METRICS */}
        <div className="border-t border-[#e8e8ed] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-[#a1a1a6]">
          <span>© 2026 MyBlog. Designed with high-fidelity principles. All rights reserved.</span>
          
          <div className="flex gap-6">
            <span className="hover:text-[#6e6e73] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#6e6e73] cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-[#6e6e73] cursor-pointer transition-colors">Contact Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;