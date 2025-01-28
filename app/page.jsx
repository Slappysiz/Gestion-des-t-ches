import NextEvent from '@/components/EventSection';
import PastEvents from '@/components/LineupSection';
import AboutUs from '@/components/ThemeSection';
import Contact from '@/components/PastEventsSection';

export default function Home() {
    return (
        <main>
            {/* Next Event Section */}
            <div className="mb-16">
                <NextEvent />
            </div>

            {/* Past Events Section */}
            <div className="mb-16">
                <PastEvents />
            </div>

            {/* About Us Section */}
            <div className="mb-16">
                <AboutUs />
            </div>

            {/* Contact Section */}
            <Contact />
        </main>
    );
}
