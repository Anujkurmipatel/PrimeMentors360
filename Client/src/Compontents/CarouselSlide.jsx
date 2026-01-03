function CarouselSlide({ image, title, description, slideNumber, totalSlides }) {
    return (
        <div id={`slide${slideNumber}`} className="carousel-item relative w-full flex items-center justify-center py-10">
            
            {/* Main Card Container */}
            <div className="card w-[90%] md:w-[60%] lg:w-[50%] bg-base-100 shadow-xl border-4 border-dashed border-primary rounded-3xl p-8 flex flex-col items-center text-center">
                
                {/* Avatar / Image "Polaroid" Style */}
                <div className="avatar mb-4">
                    <div className="w-32 md:w-40 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-4 shadow-lg hover:rotate-6 transition-transform duration-300">
                        <img src={image} alt={title} className="bg-white" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-3 px-4">
                    <p className="text-lg md:text-xl text-base-content/80 font-comic italic">
                        "{description}"
                    </p>
                    <h3 className="text-2xl md:text-3xl font-black text-primary">
                        {title}
                    </h3>
                    {/* Star Rating Decoration (Optional Fun Touch) */}
                    <div className="rating rating-sm gap-1">
                        <input type="radio" name={`rating-${slideNumber}`} className="mask mask-star-2 bg-orange-400" checked readOnly />
                        <input type="radio" name={`rating-${slideNumber}`} className="mask mask-star-2 bg-orange-400" checked readOnly />
                        <input type="radio" name={`rating-${slideNumber}`} className="mask mask-star-2 bg-orange-400" checked readOnly />
                        <input type="radio" name={`rating-${slideNumber}`} className="mask mask-star-2 bg-orange-400" checked readOnly />
                        <input type="radio" name={`rating-${slideNumber}`} className="mask mask-star-2 bg-orange-400" checked readOnly />
                    </div>
                </div>

                {/* Navigation Arrows (Absolute to the card, not the screen) */}
                <div className="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 top-1/2 w-full px-2 md:px-0 md:-left-16 md:-right-16">
                    
                    {/* Previous Button */}
                    <a 
                        href={`#slide${(slideNumber === 1 ? totalSlides : (slideNumber - 1))}`} 
                        className="btn btn-circle btn-primary btn-lg shadow-lg text-white border-4 border-white hover:scale-110 transition-transform"
                    >
                        ❮
                    </a> 
                    
                    {/* Next Button */}
                    <a 
                        href={`#slide${(slideNumber) % totalSlides + 1}`} 
                        className="btn btn-circle btn-secondary btn-lg shadow-lg text-white border-4 border-white hover:scale-110 transition-transform"
                    >
                        ❯
                    </a>
                </div>

                {/* Page Number Indicator */}
                <div className="badge badge-accent badge-lg mt-6 font-bold text-white shadow-md">
                   Slide {slideNumber} / {totalSlides}
                </div>

            </div>
        </div> 
    );
}

export default CarouselSlide;