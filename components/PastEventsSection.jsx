"use client";

import Image from "next/image";

export default function PastFestivals() {
    return (
        <div className="py-10 px-8 flex flex-col lg:flex-row-reverse items-center lg:items-start gap-8  text-white">
            {/* Text Content */}
            <div className="max-w-lg text-center lg:text-left">
                <h2 className="text-3xl font-bold mb-4">Past Festivals & Concerts</h2>
                <p className="text-md leading-6 mb-4">
                    Take a journey back through the unforgettable moments of past festivals. From the incredible performances by 
                    artists like <span className="font-semibold">Artist A</span> and <span className="font-semibold">Artist B</span> 
                    to stunning themes like <span className="font-semibold">Desert Oasis</span> and 
                    <span className="font-semibold">Twilight Dreams</span>, each event has been a celebration of music, art, and community.
                </p>
                <p className="text-md leading-6 mb-4">
                    Relive the magic of these experiences and get inspired by the creativity and passion that made each event unique.
                </p>
                <p className="underline text-md font-medium cursor-pointer hover:text-yellow-200 transition duration-200">
                    Learn More
                </p>
            </div>

            {/* Round Image */}
            <div className="w-64 h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                <Image
                    src="/img/past-festivals.webp" 
                    alt="Past Festivals"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        </div>
    );
}
