"use client";

import Image from "next/image";
import Button from "@/components/button";


export default function NextEvent() {
    return (
        <div className="relative text-white py-20 px-6 overflow-hidden">
            {/* Floating Irregular Shapes with Images (Background) */}
            <div className="absolute left-[-150px] top-1/4 w-[450px] h-[600px] animate-float clip-irregular overflow-hidden z-0">
                <Image
                    src="/img/eventsection/eventa.webp"
                    alt="Floating Decoration"
                    width={450}
                    height={600}
                    className="w-full h-full object-cover opacity-75"
                />
            </div>

            <div className="absolute right-[-150px] bottom-1/4 w-[500px] h-[550px] animate-float-reverse clip-irregular overflow-hidden z-0">
                <Image
                    src="/img/eventsection/eventb.webp"
                    alt="Floating Decoration"
                    width={500}
                    height={550}
                    className="w-full h-full object-cover opacity-75"
                />
            </div>

            {/* Content Layer (On Top of Images) */}
            <div className="relative z-10">
                {/* Large Header */}
                <h1 className="w-full text-center text-6xl md:text-8xl playball-regular mb-8"
                    style={{ fontFamily: "Zen Antique Soft, serif" }}>
                    Passes On Sale Now
                </h1>

                {/* Event Details Centered */}
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Paradise Beach Festival</h2>
                    <p className="text-lg mb-6">
                        Join us for an unforgettable night of music, art, and celebration. Don’t miss your chance to experience{" "}
                        <span className="font-semibold">this incredible event</span> with amazing performances and magical moments.
                    </p>
                    <p className="text-xl font-semibold mb-6">
                        <span>Date:</span> June 10, 2025 <br />
                        <span>Location:</span> Paradise Valley, California
                    </p>

                    {/* Call-to-Action Buttons */}
                    <div className="flex justify-center gap-4">
                    <Button text="Purchase Tickets" variant="primary" />
                    <Button text="Learn More" variant="secondary" />
                    </div>
                </div>
            </div>
        </div>
    );
}
