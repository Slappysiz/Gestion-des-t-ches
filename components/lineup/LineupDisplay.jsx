"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function LineupDisplay() {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        // Fetch artist data from the JSON file
        fetch('/json/artists.json')
            .then((response) => response.json())
            .then((data) => setArtists(data));
    }, []);

    return (
        <div className="py-10 px-8">
            <h1 className="text-4xl font-bold text-center mb-8">Lineup</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {artists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                ))}
            </div>
        </div>
    );
}

function ArtistCard({ artist }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="relative w-full h-64 perspective cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div
                className={`absolute w-full h-full transition-transform duration-500 transform ${
                    isFlipped ? 'rotate-y-180' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front Side */}
                <div
                    className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg"
                    style={{ transform: 'rotateY(0deg)' }}
                >
                    <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
                        <Image
                            src={artist.image}
                            alt={artist.name}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="p-4 text-center">
                        <h3 className="text-xl font-bold">{artist.name}</h3>
                    </div>
                </div>

                {/* Back Side */}
                <div
                    className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-4"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <h3 className="text-xl font-bold mb-2">{artist.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">
                        <span className="font-semibold">Genre:</span> {artist.genre}
                    </p>
                    <p className="text-gray-600">{artist.description}</p>
                </div>
            </div>
        </div>
    );
}