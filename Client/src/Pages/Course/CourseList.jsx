import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../Compontents/CourseCard";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourse } from "../../Redux/Slices/CourseSlice";

function CourseList() {
    const dispatch = useDispatch();
    const { courseData } = useSelector((state) => state.course);

    async function loadCourses() {
        await dispatch(getAllCourse());
    }

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-screen pt-12 px-5 flex flex-col gap-10 text-base-content bg-base-200 pb-20">
                
                {/* Header Section with Playful Typography */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black text-primary">
                        Find Your Next Adventure! 🗺️
                    </h1>
                    <p className="text-xl font-bold text-gray-500">
                        Courses created by{" "}
                        <span className="text-secondary decoration-wavy underline decoration-4 underline-offset-4">
                            Super Teachers
                        </span>{" "}
                        🦸
                    </p>
                </div>

                {/* Grid Container */}
                {/* 'justify-items-center' keeps cards centered in their grid cells */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center w-full max-w-[90%] mx-auto">
                    
                    {/* Map through courses */}
                    {courseData?.length > 0 ? (
                        courseData?.map((element) => {
                            return <CourseCard key={element._id} data={element} />;
                        })
                    ) : (
                        // Fallback / Empty State (Looks nicer than a blank screen)
                        <div className="col-span-full flex flex-col items-center justify-center mt-10 opacity-50">
                            <span className="loading loading-dots loading-lg text-primary"></span>
                            <p className="font-bold text-lg mt-2">Loading fun stuff...</p>
                        </div>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseList;