"use client";

import Image from "next/image";

export default function ThemeSection() {
    return (
        <div className="py-10 px-8 flex flex-col lg:flex-row items-center lg:items-start gap-8 ">
            {/* Text Content */}
            <div className="max-w-lg text-center lg:text-left">
                <h2 className="text-3xl font-bold mb-4">This Year’s Theme</h2>
                <p className="text-md leading-6 mb-4">
                    Prepare to be amazed as we unveil the stunning new attractions for this year's festival. From the 
                    enchanting <span className="font-semibold">Oasis Stage</span> to awe-inspiring 
                    <span className="font-semibold"> interactive installations</span>, every detail has been crafted 
                    to transport you into a world of wonder and creativity.
                </p>
                <p className="text-md leading-6 mb-4">
                    Immerse yourself in the vibrant decor that brings the spirit of the desert to life, setting the stage for 
                    unforgettable moments and experiences.
                </p>
                <p className="underline text-md font-medium cursor-pointer hover:text-yellow-500 transition duration-200">
                    Learn More
                </p>
            </div>

            {/* Round Image */}
            <div className="w-64 h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                <Image
                    src="/img/sunset-beach-festival.webp" // Ensure this path is correct
                    alt="Oasis Theme"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        </div>
    );
}
