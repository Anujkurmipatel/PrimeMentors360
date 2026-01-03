import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InstructorNavbar from "../../Layouts/InstructorNavbar";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";

function InstructorCreateCourse() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth?.data);
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState({
        title: "",
        description: "",
        category: "",
        thumbnail: null,
    });
    const [preview, setPreview] = useState("");

    function handleInputChange(e) {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    }

    function handleThumbnail(e) {
        const file = e.target.files[0];
        setCourseData({ ...courseData, thumbnail: file });
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        // Use logged-in user as createdBy if available
        const payload = {
            ...courseData,
            createdBy: user?._id || user?.id || ""
        };
        const res = await dispatch(createNewCourse(payload));
        if (res?.payload?.success) {
            navigate("/instructor/dashboard");
        }
    }

    return (
        <>
            <InstructorNavbar />
            <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50">
                <form onSubmit={onFormSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-blue-600 mb-2">Create New Course</h2>
                    <input
                        type="text"
                        name="title"
                        placeholder="Course Title"
                        className="border rounded-lg px-4 py-2"
                        value={courseData.title}
                        onChange={handleInputChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Course Description"
                        className="border rounded-lg px-4 py-2"
                        value={courseData.description}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        className="border rounded-lg px-4 py-2"
                        value={courseData.category}
                        onChange={handleInputChange}
                        required
                    />
                    <label className="font-semibold">Course Thumbnail</label>
                    <input type="file" accept="image/*" onChange={handleThumbnail} />
                    {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mt-2" />}
                    <button type="submit" className="bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition">Create Course</button>
                </form>
            </div>
        </>
    );
}

export default InstructorCreateCourse;
