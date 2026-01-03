import { AiFillCloseCircle } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../Compontents/Footer.jsx';
import { logout } from '../Redux/Slices/AuthSlice.js';

function HomeLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux state
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);

    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        if(drawerSide[0]) drawerSide[0].style.width = 'auto';
    }

    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        if(element[0]) element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
        if(drawerSide[0]) drawerSide[0].style.width = '0';
    }

    async function handleLogout(e) {
        e.preventDefault();
        const res = await dispatch(logout());
        if (res?.payload?.success) navigate("/");
    }

    // Common Link Styles for Playful UI
    const navLinkStyle = "font-bold text-lg hover:text-primary transition-colors duration-200";
    const btnPlayful = "btn btn-sm md:btn-md rounded-full border-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all";

    return (
        <div className="min-h-screen bg-base-100 font-sans selection:bg-primary selection:text-white">
            
            {/* DAISY UI DRAWER WRAPPER */}
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                
                <div className="drawer-content flex flex-col">
                    {/* --- MODERN FLOATING NAVBAR --- */}
                    <nav className="w-full max-w-[95%] mx-auto mt-4 navbar bg-base-200/80 backdrop-blur-md rounded-box shadow-lg z-40 sticky top-4">
                        
                        {/* Hamburger for Mobile */}
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer" className="btn btn-square btn-ghost text-primary">
                                <FiMenu size={"28px"} onClick={changeWidth} />
                            </label>
                        </div>

                        {/* Logo / Brand */}
                        <div className="flex-1 px-2 mx-2">
                            <Link to="/" className="text-2xl font-black tracking-tighter text-primary">
                                Kidzo<span className="text-secondary">Learn</span>
                            </Link>
                        </div>

                        {/* Desktop Menu (Hidden on mobile) */}
                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal px-1 gap-2 items-center">
                                <li><Link to="/" className={navLinkStyle}>Home</Link></li>
                                <li><Link to="/courses" className={navLinkStyle}>Courses</Link></li>
                                <li><Link to="/about" className={navLinkStyle}>About</Link></li>
                                <li><Link to="/contact" className={navLinkStyle}>Contact</Link></li>


                                {/* Admin Links */}
                                {isLoggedIn && role === 'ADMIN' && (
                                    <li><Link to="/admin/dashboard" className="text-warning font-bold">Dashboard</Link></li>
                                )}

                                {/* Instructor Links */}
                                {isLoggedIn && role === 'INSTRUCTOR' && (
                                    <>
                                        <li><Link to="/instructor/dashboard" className="text-info font-bold">Instructor Panel</Link></li>
                                        <li><Link to="/instructor/create-course" className="text-success font-bold">Create Course</Link></li>
                                        <li><Link to="/instructor/add-lecture" className="text-primary font-bold">Add Lecture</Link></li>
                                        <li><Link to="/instructor/add-quiz" className="text-secondary font-bold">Add Quiz</Link></li>
                                    </>
                                )}

                                {/* Auth Buttons */}
                                {!isLoggedIn ? (
                                    <div className="flex gap-2 ml-4">
                                        <Link to="/login" className={`btn-primary text-white ${btnPlayful}`}>Login</Link>
                                        <Link to="/signup" className={`btn-secondary text-white ${btnPlayful}`}>Signup</Link>
                                    </div>
                                ) : (
                                    <div className="flex gap-2 ml-4">
                                        <Link to="/user/profile" className={`btn-accent text-white ${btnPlayful}`}>Profile</Link>
                                        <button onClick={handleLogout} className={`btn-error text-white ${btnPlayful}`}>Logout</button>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </nav>

                    {/* --- PAGE CONTENT --- */}
                    <main className="flex-grow p-4 md:p-8">
                        {children}
                    </main>

                    <Footer />
                </div>

                {/* --- DRAWER SIDEBAR (MOBILE MENU) --- */}
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer" className="drawer-overlay" onClick={hideDrawer}></label>
                    <ul className="menu p-4 w-64 min-h-full bg-base-100 text-base-content relative rounded-r-3xl">
                        
                        {/* Close Button */}
                        <li className="absolute right-4 top-4">
                            <button onClick={hideDrawer} className="btn btn-circle btn-ghost text-error">
                                <AiFillCloseCircle size={32} />
                            </button>
                        </li>

                        {/* Mobile Logo */}
                        <li className="mb-8 mt-2">
                             <Link to="/" className="text-3xl font-black text-primary">Menu</Link>
                        </li>

                        {/* Mobile Links */}
                        <li className="mb-2"><Link to="/" className="text-xl font-bold bg-base-200 rounded-xl p-3">🏠 Home</Link></li>
                        <li className="mb-2"><Link to="/courses" className="text-xl font-bold bg-base-200 rounded-xl p-3">📚 Courses</Link></li>
                        <li className="mb-2"><Link to="/about" className="text-xl font-bold bg-base-200 rounded-xl p-3">ℹ️ About Us</Link></li>
                        <li className="mb-2"><Link to="/contact" className="text-xl font-bold bg-base-200 rounded-xl p-3">📞 Contact</Link></li>

                        {isLoggedIn && role === 'ADMIN' && (
                            <>
                                <li className="mb-2"><Link to="/admin/dashboard" className="text-xl font-bold text-warning bg-warning/10 rounded-xl p-3">👑 Admin Panel</Link></li>
                                <li className="mb-2"><Link to="/course/create" className="text-xl font-bold text-success bg-success/10 rounded-xl p-3">➕ Create Course</Link></li>
                            </>
                        )}
                        {isLoggedIn && role === 'INSTRUCTOR' && (
                            <>
                                <li className="mb-2"><Link to="/instructor/dashboard" className="text-xl font-bold text-info bg-info/10 rounded-xl p-3">🧑‍🏫 Instructor Panel</Link></li>
                                <li className="mb-2"><Link to="/instructor/create-course" className="text-xl font-bold text-success bg-success/10 rounded-xl p-3">➕ Create Course</Link></li>
                                <li className="mb-2"><Link to="/instructor/add-lecture" className="text-xl font-bold text-primary bg-primary/10 rounded-xl p-3">🎬 Add Lecture</Link></li>
                                <li className="mb-2"><Link to="/instructor/add-quiz" className="text-xl font-bold text-secondary bg-secondary/10 rounded-xl p-3">📝 Add Quiz</Link></li>
                            </>
                        )}

                        {/* Mobile Auth Buttons */}
                        <div className="flex flex-col gap-3 mt-auto mb-4">
                            {!isLoggedIn ? (
                                <>
                                    <Link to="/login" className={`btn-primary text-white w-full ${btnPlayful}`}>Login</Link>
                                    <Link to="/signup" className={`btn-secondary text-white w-full ${btnPlayful}`}>Signup</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/user/profile" className={`btn-accent text-white w-full ${btnPlayful}`}>Profile</Link>
                                    <button onClick={handleLogout} className={`btn-error text-white w-full ${btnPlayful}`}>Logout</button>
                                </>
                            )}
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HomeLayout;