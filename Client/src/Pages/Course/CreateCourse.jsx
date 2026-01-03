import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaCloudUploadAlt, FaMagic, FaHeading, FaUserTie, FaTags, FaPencilAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";

function CreateCourse() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        title: "",
        category: "",
        description: "",
        thumbnail: null,
        previewImage: ""
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
        if (!userInput.title || !userInput.description || !userInput.category || !userInput.thumbnail || !userInput.previewImage) {
            toast.error("All fields are mandatory");
            return;
        }

        const response = await dispatch(createNewCourse(userInput));
        if (response?.payload?.success) {
            setUserInput({
                title: "",
                category: "",
                description: "",
                thumbnail: null,
                previewImage: ""
            });
            navigate("/courses");
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-screen bg-base-200 py-10 px-4">
                
                {/* Main Form Card - "The Workshop Table" */}
                <form
                    onSubmit={OnFormSubmit}
                    className="relative flex flex-col justify-center gap-5 rounded-3xl p-8 bg-base-100 w-full md:w-[800px] shadow-xl border-4 border-dashed border-primary/40"
                >
                    
                    {/* Header Section */}
                    <div className="flex items-center justify-center relative mb-4">
                        <Link to={"/courses"} className="absolute left-0 btn btn-circle btn-ghost text-2xl text-secondary hover:bg-secondary/20 transition-all">
                            <AiOutlineArrowLeft />
                        </Link>
                        <h1 className="text-center text-3xl md:text-4xl font-black text-primary">
                            ✨ Build a Course
                        </h1>
                    </div>

                    <main className="grid lg:grid-cols-2 grid-cols-1 gap-8">
                        
                        {/* LEFT COLUMN: Image Upload */}
                        <div className="flex flex-col gap-2">
                            <label className="label">
                                <span className="label-text text-lg font-bold text-base-content/70">Course Thumbnail</span>
                            </label>
                            
                            <label htmlFor="image_uploads" className="cursor-pointer group h-full">
                                {userInput.previewImage ? (
                                    <div className="relative w-full h-64 rounded-2xl overflow-hidden border-4 border-secondary shadow-md group-hover:scale-[1.02] transition-transform">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={userInput.previewImage}
                                            alt="Preview"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold">
                                            Change Image
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-64 flex flex-col items-center justify-center border-4 border-dashed border-base-300 rounded-2xl bg-base-200 group-hover:bg-base-300 group-hover:border-primary transition-colors gap-2">
                                        <FaCloudUploadAlt className="text-6xl text-primary/50 group-hover:text-primary transition-colors" />
                                        <span className="font-bold text-base-content/60">Click to upload cover</span>
                                    </div>
                                )}
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

                        {/* RIGHT COLUMN: Text Inputs */}
                        <div className="flex flex-col gap-4">
                            
                            {/* Title Input */}
                            <div className="form-control w-full">
                                <label className="label" htmlFor="title">
                                    <span className="label-text font-bold text-secondary flex items-center gap-2">
                                        <FaHeading /> Title
                                    </span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="e.g. Space Adventures 101"
                                    className="input input-bordered input-primary w-full rounded-full bg-base-200 focus:bg-white"
                                    value={userInput.title}
                                    onChange={handleUserInput}
                                />
                            </div>

                            {/* Instructor Input */}
                            <div className="form-control w-full">
                                <label className="label" htmlFor="createdBy">
                                    <span className="label-text font-bold text-secondary flex items-center gap-2">
                                        <FaUserTie /> Instructor Name
                                    </span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="createdBy"
                                    id="createdBy"
                                    placeholder="e.g. Professor Smartypants"
                                    className="input input-bordered input-primary w-full rounded-full bg-base-200 focus:bg-white"
                                    value={userInput.createdBy}
                                    onChange={handleUserInput}
                                />
                            </div>

                            {/* Category Input */}
                            <div className="form-control w-full">
                                <label className="label" htmlFor="category">
                                    <span className="label-text font-bold text-secondary flex items-center gap-2">
                                        <FaTags /> Category
                                    </span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="category"
                                    id="category"
                                    placeholder="e.g. Science, Art, Math"
                                    className="input input-bordered input-primary w-full rounded-full bg-base-200 focus:bg-white"
                                    value={userInput.category}
                                    onChange={handleUserInput}
                                />
                            </div>

                            {/* Description Input */}
                            <div className="form-control w-full">
                                <label className="label" htmlFor="description">
                                    <span className="label-text font-bold text-secondary flex items-center gap-2">
                                        <FaPencilAlt /> Description
                                    </span>
                                </label>
                                <textarea
                                    required
                                    name="description"
                                    id="description"
                                    placeholder="What will the students learn?"
                                    className="textarea textarea-bordered textarea-primary h-24 rounded-2xl bg-base-200 focus:bg-white resize-none"
                                    value={userInput.description}
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>
                    </main>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-primary btn-lg w-full mt-4 rounded-full shadow-lg hover:-translate-y-1 transition-transform text-white text-xl font-bold"
                    >
                        <FaMagic className="mr-2" /> Create Adventure
                    </button>

                </form>
            </div>
        </HomeLayout>
    )
}
export default CreateCourse;