import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaEdit, FaSave, FaImage, FaUserEdit, FaList, FaPenNib } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { updateCourse } from "../../Redux/Slices/CourseSlice";

function EditCourse() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();

    const [userInput, setUserInput] = useState({
        id: state?._id,
        title: state?.title,
        category: state?.category,
        description: state?.description,
        createdBy: state?.createdBy,
        thumbnail: null,
        previewImage: state?.thumbnail?.secure_url,
    });

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadedImage
                })
            })
        }
    }

    function handleUserInput(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    async function OnFormSubmit(e) {
        e.preventDefault();
        if (!userInput.title || !userInput.description || !userInput.category) {
            toast.error("All fields are mandatory");
            return;
        }

        const response = await dispatch(updateCourse(userInput));
        if (response?.payload?.success) {
            setUserInput({
                title: "",
                category: "",
                description: "",
                thumbnail: null,
            });
            navigate("/courses");
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-screen bg-base-200 py-10 px-4">
                
                {/* Main Card */}
                <form
                    onSubmit={OnFormSubmit}
                    className="relative flex flex-col justify-center gap-5 rounded-3xl p-8 bg-base-100 w-full md:w-[800px] shadow-xl border-4 border-dashed border-secondary/40"
                >
                    
                    {/* Header */}
                    <div className="flex items-center justify-center relative mb-4">
                        <Link to={"/courses"} className="absolute left-0 btn btn-circle btn-ghost text-2xl text-primary hover:bg-primary/20 transition-all">
                            <AiOutlineArrowLeft />
                        </Link>
                        <h1 className="text-center text-3xl md:text-4xl font-black text-secondary">
                            📝 Edit Mission
                        </h1>
                    </div>

                    <main className="grid lg:grid-cols-2 grid-cols-1 gap-8">
                        
                        {/* LEFT COLUMN: Image Edit */}
                        <div className="flex flex-col gap-2">
                            <label className="label">
                                <span className="label-text text-lg font-bold text-base-content/70 flex items-center gap-2">
                                    <FaImage /> Update Cover
                                </span>
                            </label>
                            
                            <label htmlFor="image_uploads" className="cursor-pointer group h-full">
                                <div className="relative w-full h-64 rounded-2xl overflow-hidden border-4 border-primary shadow-md group-hover:scale-[1.02] transition-transform">
                                    {userInput.previewImage ? (
                                        <img
                                            className="w-full h-full object-cover"
                                            src={userInput.previewImage}
                                            alt="Course Thumbnail"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full bg-base-200">
                                            <p>No Image</p>
                                        </div>
                                    )}
                                    
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold backdrop-blur-sm">
                                        <FaEdit size={40} className="mb-2"/>
                                        <span>Tap to Change</span>
                                    </div>
                                </div>
                            </label>
                            <input
                                className="hidden"
                                type="file"
                                id="image_uploads"
                                accept=".jpg, .jpeg, .png"
                                name="image_uploads"
                                onChange={handleImageUpload}
                            />
                        </div>

                        {/* RIGHT COLUMN: Inputs */}
                        <div className="flex flex-col gap-4">
                            
                            {/* Title */}
                            <div className="form-control w-full">
                                <label className="label" htmlFor="title">
                                    <span className="label-text font-bold text-secondary flex items-center gap-2">
                                        <FaEdit /> Course Title
                                    </span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter course title"
                                    className="input input-bordered input-secondary w-full rounded-full bg-base-200 focus:bg-white"
                                    value={userInput.title}
                                    onChange={handleUserInput}
                                />
                            </div>

                            {/* Instructor */}
                            <div className="form-control w-full">
                                <label className="label" htmlFor="createdBy">
                                    <span className="label-text font-bold text-secondary flex items-center gap-2">
                                        <FaUserEdit /> Instructor
                                    </span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="createdBy"
                                    id="createdBy"
                                    placeholder="Enter instructor name"
                                    className="input input-bordered input-secondary w-full rounded-full bg-base-200 focus:bg-white"
                                    value={userInput.createdBy}
                                    onChange={handleUserInput}
                                />
                            </div>

                            {/* Category */}
                            <div className="form-control w-full">
                                <label className="label" htmlFor="category">
                                    <span className="label-text font-bold text-secondary flex items-center gap-2">
                                        <FaList /> Category
                                    </span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="category"
                                    id="category"
                                    placeholder="Enter category"
                                    className="input input-bordered input-secondary w-full rounded-full bg-base-200 focus:bg-white"
                                    value={userInput.category}
                                    onChange={handleUserInput}
                                />
                            </div>

                            {/* Description */}
                            <div className="form-control w-full">
                                <label className="label" htmlFor="description">
                                    <span className="label-text font-bold text-secondary flex items-center gap-2">
                                        <FaPenNib /> Description
                                    </span>
                                </label>
                                <textarea
                                    required
                                    name="description"
                                    id="description"
                                    placeholder="Enter description"
                                    className="textarea textarea-bordered textarea-secondary h-24 rounded-2xl bg-base-200 focus:bg-white resize-none"
                                    value={userInput.description}
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>
                    </main>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-secondary btn-lg w-full mt-4 rounded-full shadow-lg hover:scale-[1.01] transition-transform text-white text-xl font-bold"
                    >
                        <FaSave className="mr-2" /> Save Changes
                    </button>

                </form>
            </div>
        </HomeLayout>
    );
}

export default EditCourse;