"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/button";

export default function Lineup({ setPage }) {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        // Fetch artist data from the JSON file
        fetch('/json/artists.json')
            .then((response) => response.json())
            .then((data) => setArtists(data));
    }, []);

    return (
        <div className="py-10">
            <h2 className="text-4xl font-bold text-center mb-8">Lineup</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {artists.slice(0, 3).map((artist) => (
                    <div
                        key={artist.id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
                    >
                        {/* Artist Image */}
                        <div className="relative w-full h-48">
                            <Image
                                src={artist.image}
                                alt={artist.name}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        {/* Artist Name */}
                        <div className="p-4 text-center">
                            <h3 className="text-xl font-semibold">{artist.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
            {/* "More" Button */}
            <div className="text-center mt-8">
                <Button text="More" onClick={() => setPage('/lineup')} variant="primary" />
            </div>
        </div>
    );
}
