import { Link } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher, FaStar, FaVideo, FaNewspaper, FaArrowRight } from "react-icons/fa";
import homeimg from '../Assets/Images/homePageMainImage.png';
import HomeLayout from "../Layouts/HomeLayout";

function HomePage() {

    // Mock Data for "New Courses"
    const newCourses = [
        { id: 1, title: "Space Math 🚀", category: "Mathematics", color: "bg-purple-100 border-purple-400" },
        { id: 2, title: "Dino History 🦖", category: "History", color: "bg-green-100 border-green-400" },
        { id: 3, title: "Robot Coding 🤖", category: "Technology", color: "bg-blue-100 border-blue-400" },
        { id: 4, title: "Art Attack 🎨", category: "Arts", color: "bg-pink-100 border-pink-400" },
    ];

    // Mock Data for Reviews
    const reviews = [
        { id: 1, name: "Timmy (Age 8)", text: "I learned how to code a game!", avatar: "👦" },
        { id: 2, name: "Sarah (Age 10)", text: "Math is actually fun now.", avatar: "👧" },
        { id: 3, name: "Rohan (Age 9)", text: "The teachers are super funny!", avatar: "🧑" },
    ];

    return (
        <HomeLayout>
            <div className="bg-base-200 min-h-screen pb-20 overflow-x-hidden">
                
                {/* --- SECTION 1: HERO --- */}
                <div className="pt-10 px-5 lg:px-16 flex flex-col md:flex-row items-center justify-center min-h-[90vh] gap-10">
                    
                    {/* Text Content */}
                    <div className="mt-16 sm:mt-0 flex flex-col justify-center md:w-1/2 space-y-6 z-10">
                        <div className="badge badge-secondary badge-lg animate-bounce font-bold">
                            🎉 New Classes Added!
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-black text-base-content leading-tight">
                            Unlock Your <br />
                            <span className="text-primary decoration-wavy underline decoration-4 underline-offset-4">
                                Superpowers
                            </span> ⚡
                        </h1>
                        <p className="text-xl font-medium text-base-content/70">
                            Join the coolest library of courses taught by superhero teachers. 
                            Learning is not boring anymore—it's an adventure!
                        </p>
                        
                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link to="/courses">
                                <button className="btn btn-primary btn-lg rounded-full shadow-lg hover:-translate-y-1 transition-transform text-white text-lg">
                                    Start Exploring 🚀
                                </button>
                            </Link>
                            <Link to="/contact">
                                <button className="btn btn-outline btn-secondary btn-lg rounded-full hover:-translate-y-1 transition-transform text-lg">
                                    Contact Us 📞
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="lg:w-1/2 flex items-center justify-center relative">
                        {/* Decorative Blob */}
                        <div className="absolute w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
                        <img 
                            src={homeimg} 
                            alt="Happy students learning" 
                            className="drop-shadow-2xl hover:scale-105 transition-transform duration-500 max-h-[500px]"
                        />
                    </div>
                </div>

                {/* --- SECTION 2: STATS SCOREBOARD --- */}
                <div className="w-full max-w-6xl mx-auto px-4 -mt-10 relative z-20">
                    <div className="stats shadow-xl w-full bg-base-100 border-4 border-base-300 rounded-3xl overflow-hidden flex flex-col lg:flex-row">
                        
                        <div className="stat place-items-center">
                            <div className="stat-figure text-primary">
                                <FaUserGraduate size={40} />
                            </div>
                            <div className="stat-title font-bold">Happy Students</div>
                            <div className="stat-value text-primary">15k+</div>
                            <div className="stat-desc font-semibold">Learning everyday</div>
                        </div>
                        
                        <div className="stat place-items-center">
                            <div className="stat-figure text-secondary">
                                <FaChalkboardTeacher size={40} />
                            </div>
                            <div className="stat-title font-bold">Super Teachers</div>
                            <div className="stat-value text-secondary">120+</div>
                            <div className="stat-desc font-semibold">Experts in fun</div>
                        </div>
                        
                        <div className="stat place-items-center">
                            <div className="stat-figure text-accent">
                                <FaStar size={40} />
                            </div>
                            <div className="stat-title font-bold">5-Star Reviews</div>
                            <div className="stat-value text-accent">4.9</div>
                            <div className="stat-desc font-semibold">Parents love us!</div>
                        </div>
                        
                    </div>
                </div>

                {/* --- SECTION 3: NEWS TICKER --- */}
                <div className="w-full bg-yellow-400 text-black py-3 mt-10 overflow-hidden flex items-center shadow-inner">
                    <div className="bg-red-600 text-white font-black px-4 py-1 ml-4 rounded -skew-x-12 shrink-0 flex items-center gap-2">
                         <FaNewspaper /> NEWS FLASH
                    </div>
                    <div className="whitespace-nowrap overflow-hidden w-full">
                        <p className="animate-marquee inline-block font-bold text-lg px-4">
                            📢 Summer Camp registrations are open! • 🏆 "Math Wizard" contest starts this Sunday • 🎨 New Art supplies available in the store! • 🚀 Science Fair winners announced!
                        </p>
                    </div>
                </div>

                {/* --- SECTION 4: TEACHER INTRO VIDEO --- */}
                <div className="py-20 px-5 flex flex-col items-center">
                    <h2 className="text-4xl font-black text-center mb-10 flex items-center gap-3">
                        <span className="bg-primary text-white p-2 rounded-xl"><FaVideo /></span>
                         Meet Your Mentors
                    </h2>
                    
                    {/* Tablet/TV Container Style */}
                    <div className="mockup-window border-4 border-base-300 bg-base-300 w-full max-w-4xl shadow-2xl">
                        <div className="flex justify-center bg-black px-4 py-16 relative group cursor-pointer">
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white">
                                    <FaVideo size={30} className="text-white ml-1" />
                                </div>
                            </div>
                            {/* Mock Video Placeholder */}
                            <img 
                                src="https://images.unsplash.com/photo-1577896335142-ac29f42d01d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                                alt="Teacher Video Thumbnail" 
                                className="opacity-60 w-full h-[300px] object-cover"
                            />
                            <div className="absolute bottom-5 left-5 text-white font-bold text-xl">
                                🔴 Introduction: Why we love teaching!
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- SECTION 5: NEW COURSES --- */}
                <div className="py-10 px-5 bg-base-100 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                    <div className="flex justify-between items-center max-w-6xl mx-auto mb-8">
                        <h2 className="text-3xl font-black text-secondary">✨ Fresh Arrivals</h2>
                        <Link to="/courses" className="btn btn-ghost text-primary font-bold">View All <FaArrowRight/></Link>
                    </div>
                    
                    {/* Horizontal Scroll Container */}
                    <div className="flex overflow-x-auto gap-6 pb-8 max-w-6xl mx-auto snap-x">
                        {newCourses.map((course) => (
                            <div key={course.id} className={`snap-center shrink-0 w-72 card ${course.color} border-b-8 shadow-lg hover:scale-105 transition-transform cursor-pointer`}>
                                <div className="card-body p-6">
                                    <div className="badge badge-accent font-bold text-white mb-2">NEW</div>
                                    <h3 className="card-title text-2xl font-black text-gray-800">{course.title}</h3>
                                    <p className="font-semibold text-gray-600">{course.category}</p>
                                    <div className="card-actions justify-end mt-4">
                                        <button className="btn btn-sm btn-circle btn-primary text-white">➜</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- SECTION 6: HAPPY REVIEWS --- */}
                <div className="py-16 px-5 max-w-4xl mx-auto">
                    <h2 className="text-4xl font-black text-center mb-12 text-primary">
                        💬 What Students Say
                    </h2>
                    
                    <div className="space-y-6">
                        {reviews.map((review, index) => (
                            <div key={review.id} className={`chat ${index % 2 === 0 ? 'chat-start' : 'chat-end'}`}>
                                <div className="chat-image avatar">
                                    <div className="w-14 rounded-full border-2 border-base-300 bg-base-100 p-1">
                                        <span className="text-3xl flex items-center justify-center h-full">{review.avatar}</span>
                                    </div>
                                </div>
                                <div className="chat-header opacity-50 mb-1 font-bold ml-1">
                                    {review.name}
                                </div>
                                <div className={`chat-bubble text-lg font-medium shadow-md ${index % 2 === 0 ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>
                                    {review.text}
                                </div>
                                <div className="chat-footer opacity-50 text-xs mt-1">
                                    Just now
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </HomeLayout>
    );
}

export default HomePage;