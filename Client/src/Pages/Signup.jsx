import { useState } from "react";
import { toast } from 'react-hot-toast';
import { BsPersonCircle } from "react-icons/bs";
import { FaUser, FaEnvelope, FaLock, FaCamera, FaRocket } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmail, isPassword } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";
import { creatAccount } from "../Redux/Slices/AuthSlice";

function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [prevImage, setPrevImage] = useState("");

    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: "",
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    function getImage(event) {
        event.preventDefault();
        const uploadedImage = event.target.files[0];

        if (uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setPrevImage(this.result);
            })
        }
    }

    async function createNewAccount(event) {
        event.preventDefault();
        if (!signupData.email || !signupData.fullName || !signupData.avatar || !signupData.password) {
            toast.error("Please fill all the details");
            return;
        }

        if (signupData.fullName.length < 5) {
            toast.error("Name should be atleast 5 characters");
            return;
        }

        if (!isEmail(signupData.email)) {
            toast.error("Invalid email id");
            return;
        }

        if (!isPassword(signupData.password)) {
            toast.error("Password should be 6-16 characters with at least a number and special character");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);

        const response = await dispatch(creatAccount(formData));
        if (response?.payload?.success) {
            navigate("/");
            setSignupData({
                fullName: "",
                email: "",
                password: "",
                avatar: "",
            })
            setPrevImage("");
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-screen bg-base-200 px-4 py-10">
                
                {/* Registration Card */}
                <form 
                    noValidate 
                    onSubmit={createNewAccount} 
                    className="card w-full max-w-md bg-base-100 shadow-xl border-4 border-dashed border-primary/30 p-8"
                >
                    
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-black text-primary">Join the Squad! 🚀</h1>
                        <p className="text-base-content/60 font-medium">Create your hero profile</p>
                    </div>

                    {/* Avatar Upload Section */}
                    <div className="flex justify-center mb-6">
                        <label htmlFor="image_uploads" className="cursor-pointer group relative">
                            <div className="w-28 h-28 rounded-full border-4 border-secondary overflow-hidden shadow-lg group-hover:scale-105 transition-transform bg-base-200 flex items-center justify-center">
                                {prevImage ? (
                                    <img 
                                        className="w-full h-full object-cover" 
                                        src={prevImage} 
                                        alt="Avatar Preview" 
                                    />
                                ) : (
                                    <BsPersonCircle className="w-20 h-20 text-base-content/30" />
                                )}
                            </div>
                            
                            {/* Camera Overlay Icon */}
                            <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary-focus transition-colors">
                                <FaCamera size={16} />
                            </div>
                        </label>
                        <input
                            className="hidden"
                            type="file"
                            name="image_uploads"
                            id="image_uploads"
                            accept=".jpg, .jpeg, .png, .svg"
                            onChange={getImage}
                        />
                    </div>

                    {/* Inputs Container */}
                    <div className="flex flex-col gap-4">
                        
                        {/* Name Input */}
                        <div className="form-control w-full">
                            <label className="label py-1" htmlFor="fullName">
                                <span className="label-text font-bold text-secondary flex items-center gap-2">
                                    <FaUser /> Name
                                </span>
                            </label>
                            <input
                                type="text"
                                required
                                name="fullName"
                                id="fullName"
                                placeholder="Enter your full name..."
                                className="input input-bordered input-primary w-full rounded-full bg-base-200 focus:bg-white"
                                onChange={handleUserInput}
                                value={signupData.fullName}
                            />
                        </div>

                        {/* Email Input */}
                        <div className="form-control w-full">
                            <label className="label py-1" htmlFor="email">
                                <span className="label-text font-bold text-secondary flex items-center gap-2">
                                    <FaEnvelope /> Email
                                </span>
                            </label>
                            <input
                                type="email"
                                required
                                name="email"
                                id="email"
                                placeholder="Enter your email..."
                                className="input input-bordered input-primary w-full rounded-full bg-base-200 focus:bg-white"
                                onChange={handleUserInput}
                                value={signupData.email}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="form-control w-full">
                            <label className="label py-1" htmlFor="password">
                                <span className="label-text font-bold text-secondary flex items-center gap-2">
                                    <FaLock /> Password
                                </span>
                            </label>
                            <input
                                type="password"
                                required
                                name="password"
                                id="password"
                                placeholder="Create a secret password..."
                                className="input input-bordered input-primary w-full rounded-full bg-base-200 focus:bg-white"
                                onChange={handleUserInput}
                                value={signupData.password}
                            />
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="btn btn-primary w-full rounded-full mt-4 text-white text-lg shadow-lg hover:-translate-y-1 transition-transform"
                        >
                            Start Adventure <FaRocket />
                        </button>

                        {/* Login Link */}
                        <p className="text-center mt-2 text-sm font-semibold text-base-content/70">
                            Already a member? <Link to="/login" className="link link-primary font-bold">Login here</Link>
                        </p>
                    </div>

                </form>
            </div>
        </HomeLayout>
    )
}

export default Signup;