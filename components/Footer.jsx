const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Main Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Column 1 */}
          <div>
            <h3 className="text-sm font-semibold mb-3">SERVICES</h3>
            <ul>
              <li className="mb-1"><a href="#" className="hover:underline text-gray-400">Custom Design</a></li>
              <li className="mb-1"><a href="#" className="hover:underline text-gray-400">Development Tools</a></li>
              <li><a href="#" className="hover:underline text-gray-400">Content Solutions</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-sm font-semibold mb-3">INSIGHTS</h3>
            <ul>
              <li className="mb-1"><a href="#" className="hover:underline text-gray-400">Case Studies</a></li>
              <li className="mb-1"><a href="#" className="hover:underline text-gray-400">News</a></li>
              <li><a href="#" className="hover:underline text-gray-400">Workshops</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-sm font-semibold mb-3">ABOUT</h3>
            <ul>
              <li className="mb-1"><a href="#" className="hover:underline text-gray-400">Our Team</a></li>
              <li className="mb-1"><a href="#" className="hover:underline text-gray-400">Success Stories</a></li>
              <li><a href="#" className="hover:underline text-gray-400">Community Impact</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-sm font-semibold mb-3">HELP</h3>
            <ul>
              <li className="mb-1"><a href="#" className="hover:underline text-gray-400">FAQs</a></li>
              <li className="mb-1"><a href="#" className="hover:underline text-gray-400">Support Center</a></li>
              <li><a href="#" className="hover:underline text-gray-400">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
 