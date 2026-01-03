import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaVideo, FaHeading, FaPenNib, FaCloudUploadAlt, FaArrowLeft, FaFilm } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import InstructorNavbar from "../../Layouts/InstructorNavbar";
import { addCourseLectures } from "../../Redux/Slices/LectureSlice";
import toast from "react-hot-toast";

function InstructorAddLecture() {
    
    // Get state passed from previous page
    const { state: courseDetails } = useLocation();
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [lectureData, setLectureData] = useState({
        title: "",
        description: "",
        lecture: null,
        videoSrc: ""
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setLectureData({ ...lectureData, [name]: value });
    }

    function handleVideo(e) {
        const file = e.target.files[0];
        if(file){
            const videoUrl = URL.createObjectURL(file);
            setLectureData({ ...lectureData, lecture: file, videoSrc: videoUrl });
        }
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        
        if (!courseDetails || !courseDetails._id) {
            toast.error("Error: No course selected.");
            return;
        }
        
        if (!lectureData.lecture || !lectureData.title || !lectureData.description) {
            toast.error("Please fill all fields and upload a video.");
            return;
        }

        setIsLoading(true);
        
        const payload = {
            id: courseDetails._id,
            lecture: lectureData.lecture,
            title: lectureData.title,
            description: lectureData.description
        };

        const res = await dispatch(addCourseLectures(payload));
        
        setIsLoading(false);
        
        if (res?.payload?.success) {
            toast.success("Lecture added successfully!");
            navigate(-1);
        }
    }

    return (
        <>
            <InstructorNavbar />
            
            <div className="min-h-screen bg-base-200 py-10 px-4 flex items-center justify-center">
                
                {/* Main Card */}
                <form 
                    onSubmit={onFormSubmit} 
                    className="relative w-full max-w-2xl bg-base-100 rounded-3xl shadow-xl border-4 border-dashed border-primary/30 overflow-hidden"
                >
                    {/* Back Button (Absolute) */}
                    <button 
                        type="button" 
                        onClick={() => navigate(-1)} 
                        className="absolute top-4 left-4 btn btn-circle btn-ghost text-secondary z-10"
                    >
                        <FaArrowLeft size={20} />
                    </button>

                    {/* Header Section */}
                    <div className="bg-primary/5 p-8 text-center border-b-2 border-primary/10">
                        <div className="badge badge-secondary font-bold mb-2">
                             Course: {courseDetails?.title || "Unknown"}
                        </div>
                        <h1 className="text-3xl font-black text-primary flex items-center justify-center gap-3">
                            <FaFilm className="text-4xl" /> Add New Lecture
                        </h1>
                        <p className="text-base-content/60 font-medium">Upload your lesson video below</p>
                    </div>

                    <div className="p-8 space-y-6">
                        
                        {/* 1. Video Upload Zone */}
                        <div className="form-control w-full">
                            <label className="label font-bold text-secondary">
                                <span className="flex items-center gap-2"><FaVideo /> Lecture Video</span>
                            </label>

                            <label className="cursor-pointer group">
                                <input 
                                    type="file" 
                                    accept="video/*" 
                                    className="hidden" 
                                    onChange={handleVideo} 
                                />
                                
                                {lectureData.videoSrc ? (
                                    // Preview Mode
                                    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border-4 border-base-300 group-hover:border-primary transition-colors">
                                        <video 
                                            src={lectureData.videoSrc} 
                                            controls 
                                            controlsList="nodownload"
                                            className="w-full h-64 object-cover bg-black"
                                        />
                                        <div className="absolute top-2 right-2 badge badge-warning gap-1 shadow-md">
                                            Change Video <FaPenNib size={10}/>
                                        </div>
                                    </div>
                                ) : (
                                    // Empty / Upload Mode
                                    <div className="w-full h-48 border-4 border-dashed border-base-300 rounded-2xl flex flex-col items-center justify-center bg-base-200 group-hover:bg-base-300 group-hover:border-primary transition-all gap-3 text-base-content/50 group-hover:text-primary">
                                        <FaCloudUploadAlt size={50} />
                                        <span className="font-bold text-lg">Click to Upload Video</span>
                                        <span className="text-xs">MP4, MKV, etc.</span>
                                    </div>
                                )}
                            </label>
                        </div>

                        {/* 2. Text Inputs */}
                        <div className="space-y-4">
                            
                            {/* Title */}
                            <div className="form-control w-full">
                                <label className="label font-bold text-secondary">
                                    <span className="flex items-center gap-2"><FaHeading /> Title</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g. Introduction to Gravity"
                                    className="input input-bordered input-primary w-full rounded-full bg-base-200 focus:bg-white transition-colors"
                                    value={lectureData.title}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Description */}
                            <div className="form-control w-full">
                                <label className="label font-bold text-secondary">
                                    <span className="flex items-center gap-2"><FaPenNib /> Description</span>
                                </label>
                                <textarea
                                    name="description"
                                    placeholder="What will students learn in this video?"
                                    className="textarea textarea-bordered textarea-primary w-full rounded-2xl h-24 bg-base-200 focus:bg-white transition-colors resize-none"
                                    value={lectureData.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* 3. Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="btn btn-primary btn-lg w-full rounded-full shadow-lg text-white text-xl font-bold hover:-translate-y-1 transition-transform mt-4"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <AiOutlineLoading3Quarters className="animate-spin" /> Uploading...
                                </span>
                            ) : (
                                "🚀 Publish Lecture"
                            )}
                        </button>

                    </div>
                </form>
            </div>
        </>
    );
}

export default InstructorAddLecture;