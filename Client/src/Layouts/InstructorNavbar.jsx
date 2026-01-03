import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";

function InstructorNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    await dispatch(logout());
    navigate("/login");
  }

  return (
    <nav className="w-full bg-blue-600 shadow-lg py-3 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/instructor/dashboard" className="text-white text-2xl font-extrabold tracking-tight">
          Instructor<span className="text-yellow-300">Panel</span>
        </Link>
        <Link to="/instructor/dashboard" className="text-white font-semibold hover:text-yellow-200 transition">My Courses</Link>
        <Link to="/instructor/create-course" className="text-white font-semibold hover:text-yellow-200 transition">Create Course</Link>
        <Link to="/user/profile" className="text-white font-semibold hover:text-yellow-200 transition">Profile</Link>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default InstructorNavbar;
