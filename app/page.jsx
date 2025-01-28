import NextEvent from '@/components/EventSection';
import Lineup from '@/components/LineupSectionHomepage';
import ThemeSection from '@/components/ThemeSection';
import PastFestivals from '@/components/PastEventsSection';

export default function Home() {
    return (
        <main>
            {/* Next Event Section */}
            <div className="mb-16">
                <NextEvent />
            </div>

            {/* Past Events Section */}
            <div className="mb-16">
                <Lineup />
            </div>

            {/* About Us Section */}
            <div className="mb-16">
                <ThemeSection />
            </div>

            {/* Contact Section */}
            <PastFestivals />
        </main>
    );
}
