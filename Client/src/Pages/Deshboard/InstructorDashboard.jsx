import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaVideo, FaClipboardList, FaRocket, FaChalkboardTeacher } from "react-icons/fa";

import { getAllCourse } from "../../Redux/Slices/CourseSlice";
import InstructorNavbar from "../../Layouts/InstructorNavbar";

function InstructorDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Get Data from Redux
    const { courseData } = useSelector(state => state.course);
    const { data: user } = useSelector(state => state.auth);

    useEffect(() => {
        // Load fresh data when dashboard opens
        dispatch(getAllCourse());
    }, [dispatch]);

    /**
     * 🔍 FIX: Robust Filtering Logic
     * Handles cases where createdBy is an Object (populated) OR a String (raw ID)
     */
    const myCourses = (courseData || []).filter((element) => {
        // 1. Extract the ID safely
        // If element.createdBy is an object (populated), use ._id
        // If element.createdBy is just a string, use it directly
        const creatorId = element?.createdBy?._id || element?.createdBy;

        // 2. Compare with logged-in user's ID (convert both to strings to be safe)
        return creatorId?.toString() === user?._id?.toString();
    });

    return (
        <>
            <InstructorNavbar />
            
            <div className="min-h-screen bg-base-200 py-10 px-4">
                
                {/* Header Section */}
                <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row items-center justify-between gap-5">
                    <div>
                        <h1 className="text-4xl font-black text-primary flex items-center gap-3">
                            <FaChalkboardTeacher /> Mission Control
                        </h1>
                        <p className="text-base-content/60 font-medium text-lg mt-1">
                            Welcome back, Commander <span className="text-secondary font-bold">{user?.fullName}</span>!
                        </p>
                    </div>
                    
                    {/* Create New Course Button */}
                    <button 
                        onClick={() => navigate("/instructor/create-course")}
                        className="btn btn-primary btn-lg rounded-full shadow-lg text-white hover:scale-105 transition-transform"
                    >
                        <FaPlus /> Launch New Course
                    </button>
                </div>

                {/* Courses Grid */}
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-secondary mb-6 border-l-4 border-secondary pl-4">
                        Your Active Missions ({myCourses.length})
                    </h2>

                    {myCourses.length === 0 ? (
                        // Empty State
                        <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-3xl shadow-sm border-2 border-dashed border-base-300 text-center">
                            <FaRocket className="text-6xl text-base-content/20 mb-4" />
                            <h3 className="text-xl font-bold text-base-content/50">No active missions yet!</h3>
                            <p className="text-base-content/40">Create a course to get started.</p>
                        </div>
                    ) : (
                        // Course List
                        <div className="grid grid-cols-1 gap-6">
                            {myCourses.map(course => (
                                <div key={course._id} className="card lg:card-side bg-base-100 shadow-xl border-2 border-base-200 hover:border-primary/50 transition-all group">
                                    
                                    {/* Thumbnail */}
                                    <figure className="lg:w-1/4 h-48 lg:h-auto relative overflow-hidden">
                                        <img 
                                            src={course.thumbnail?.secure_url} 
                                            alt={course.title} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-2 left-2 badge badge-accent text-white font-bold">
                                            {course.category}
                                        </div>
                                    </figure>

                                    {/* Content */}
                                    <div className="card-body lg:w-3/4">
                                        <h2 className="card-title text-2xl font-bold text-primary">
                                            {course.title}
                                        </h2>
                                        <p className="text-base-content/70 line-clamp-2 font-medium">
                                            {course.description}
                                        </p>
                                        
                                        {/* Stats / Badges */}
                                        <div className="flex gap-4 mt-2">
                                            <div className="badge badge-outline gap-2 p-3">
                                                <FaVideo className="text-secondary"/> 
                                                {course.numberOfLectures || 0} Lectures
                                            </div>
                                            {/* You can add Students count here if you have it */}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="card-actions justify-end mt-4">
                                            <button
                                                className="btn btn-sm md:btn-md btn-outline btn-secondary rounded-full hover:bg-secondary hover:text-white"
                                                onClick={() => navigate("/instructor/add-quiz", { state: { ...course } })}
                                            >
                                                <FaClipboardList /> Add Quiz
                                            </button>
                                            
                                            <button
                                                className="btn btn-sm md:btn-md btn-primary rounded-full text-white shadow-md hover:-translate-y-1 transition-transform"
                                                onClick={() => navigate("/instructor/add-lecture", { state: { ...course } })}
                                            >
                                                <FaVideo /> Add Lecture
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default InstructorDashboard;