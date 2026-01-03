import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate("/course/description/", { state: { ...data } })}
            className="card w-80 bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-b-8 border-r-4 border-primary rounded-3xl overflow-hidden group"
        >
            {/* Image Area */}
            <figure className="relative h-48 overflow-hidden">
                <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    src={data?.thumbnail?.secure_url}
                    alt="course thumbnail"
                />
                
                {/* "Category" Badge as a sticker on the image */}
                <div className="absolute top-3 right-3 badge badge-secondary badge-lg font-bold shadow-md rotate-3">
                    {data?.category}
                </div>
            </figure>

            {/* Content Area */}
            <div className="card-body p-5 gap-1">
                
                {/* Title */}
                <h2 className="card-title text-primary font-black text-2xl mb-1 line-clamp-1">
                    {data?.title}
                    {/* New badge if relevant (optional logic) */}
                    <div className="badge badge-accent badge-sm text-xs">NEW</div>
                </h2>

                {/* Instructor (Small and friendly) */}
                <div className="flex items-center gap-2 text-sm text-gray-500 font-bold mb-2">
                    <span className="bg-base-200 p-1 rounded-full">🎓</span> 
                    <span>Teacher: <span className="text-secondary">{data?.createdBy}</span></span>
                </div>

                {/* Description */}
                <p className="text-base-content/70 text-sm line-clamp-2 font-medium leading-relaxed">
                    {data?.description}
                </p>

                {/* "Total Lectures" or Action Area */}
                <div className="card-actions justify-end mt-4 items-center">
                    {/* Optional: Show lectures count if you want */}
                    {data?.numberoflectures > 0 && (
                        <div className="badge badge-outline font-bold mr-auto">
                            📺 {data?.numberoflectures} Lessons
                        </div>
                    )}
                    
                    {/* Big Friendly Button */}
                    <button className="btn btn-primary btn-sm rounded-full px-6 text-white shadow-md group-hover:btn-secondary transition-colors">
                        Start 🚀
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;