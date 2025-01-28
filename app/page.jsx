import HeroSection from "../components/HeroSection";
import Lineup from "../components/Lineup";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <Lineup />
      <section id="contact" className="p-6 bg-gray-800 text-white">
        <h2 className="text-3xl font-bold mb-4 text-center">Get in Touch</h2>
        <form className="max-w-md mx-auto space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-yellow-300 text-black p-3 rounded-lg hover:bg-yellow-400"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
