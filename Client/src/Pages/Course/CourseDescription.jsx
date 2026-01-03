import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaChalkboardTeacher, FaLayerGroup, FaPlayCircle, FaStar } from "react-icons/fa";

import HomeLayout from "../../Layouts/HomeLayout";

function CourseDescription() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const { role, data } = useSelector((state) => state.auth);

    return (
        <HomeLayout>
            {/* Background container with padding */}
            <div className="min-h-screen pt-12 px-4 md:px-20 pb-10 flex flex-col items-center justify-center bg-base-200">
                
                {/* Main "Mission Card" */}
                <div className="card lg:card-side bg-base-100 shadow-xl md:w-[80%] lg:w-[70%] border-4 border-primary/20 overflow-hidden">
                    
                    {/* Left Side: Image & Quick Stats */}
                    <figure className="relative lg:w-1/2 h-full min-h-[400px]">
                        <img
                            className="w-full h-full object-cover"
                            alt="thumbnail"
                            src={state?.thumbnail?.secure_url}
                        />
                        {/* Overlay Gradient to make text readable if needed, or just decoration */}
                        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-base-100 to-transparent"></div>
                        
                        <div className="absolute top-4 left-4 badge badge-secondary badge-lg rotate-[-5deg] shadow-lg">
                            BEST SELLER
                        </div>
                    </figure>

                    {/* Right Side: Content */}
                    <div className="card-body lg:w-1/2 p-8 bg-base-100">
                        
                        {/* Title */}
                        <h1 className="text-4xl font-black text-primary mb-2 leading-tight">
                            {state?.title}
                        </h1>

                        {/* Gamified Stats Row */}
                        <div className="flex flex-wrap gap-4 my-4">
                            
                            {/* Instructor Badge */}
                            <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold text-sm">
                                <FaChalkboardTeacher size={18} />
                                <span>Mentor: {state?.createdBy}</span>
                            </div>

                            {/* Lectures Badge */}
                            <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold text-sm">
                                <FaLayerGroup size={16} />
                                <span>{state?.numberOfLectures} Lessons</span>
                            </div>

                            {/* Rating (Fake/Static for now, adds visual trust) */}
                            <div className="flex items-center gap-1 text-orange-400">
                                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                            </div>
                        </div>

                        {/* Description Box */}
                        <div className="bg-base-200/50 p-4 rounded-2xl border-2 border-dashed border-base-300 mb-6">
                            <h3 className="text-lg font-bold text-base-content/70 mb-1">Mission Briefing:</h3>
                            <p className="text-base-content leading-relaxed font-medium">
                                {state?.description}
                            </p>
                        </div>

                        {/* Action Area */}
                        <div className="card-actions justify-end mt-auto">
                            {role === "ADMIN" || data?.subscription?.status === "active" ? (
                                <button
                                    onClick={() => navigate("/course/displaylecture", { state: { ...state } })}
                                    className="btn btn-success btn-lg w-full text-white shadow-lg hover:scale-[1.02] transition-transform rounded-2xl"
                                >
                                    <FaPlayCircle size={24} />
                                    Start Learning Now
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate("/checkout")}
                                    className="btn btn-primary btn-lg w-full text-white shadow-orange-200 shadow-xl hover:-translate-y-1 transition-all rounded-2xl border-b-8 border-primary-focus active:border-b-0 active:translate-y-1"
                                >
                                    Unlock Full Course 🚀
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseDescription;