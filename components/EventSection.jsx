"use client";

import Image from "next/image";

export default function NextEvent() {
    return (
        <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white p-10 rounded-lg shadow-lg animate-fade-in flex flex-col lg:flex-row items-center gap-8">
            {/* Event Image */}
            <div className="w-full lg:w-1/2">
                <Image
                    src="/img/festivalyear.webp"
                    alt="Next Event"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                />
            </div>

            {/* Event Details */}
            <div className="flex-1 text-center lg:text-left">
                <h2 className="text-4xl font-bold mb-4">Next Big Event</h2>
                <p className="text-lg mb-6">
                    Join us for an unforgettable night of music, art, and celebration. Don’t miss your chance to experience 
                    <span className="font-semibold"> this incredible event</span> with amazing performances and magical moments.
                </p>
                <p className="text-xl font-semibold mb-6">
                    <span>Date:</span> June 10, 2025 <br />
                    <span>Location:</span> Paradise Valley, California
                </p>

                {/* Call-to-Action Buttons */}
                <div className="flex justify-center lg:justify-start gap-4">
                    <button className="bg-white text-gray-800 py-2 px-6 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
                        Purchase Tickets
                    </button>
                    <button className="border border-white py-2 px-6 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition duration-300">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
}
