import { Link } from "react-scroll";

const navLinks = [
  { to: "home", label: "Home" },
  { to: "lessons", label: "Lessons" },
  { to: "booking", label: "Book Now" },
  { to: "about", label: "About" },
  { to: "contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://www.instagram.com", label: "Instagram" },
  { href: "https://www.facebook.com", label: "Facebook" },
  { href: "https://www.twitter.com", label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-xl font-bold mb-4">Mooseology101</h3>
          <p className="text-gray-400">
            Expert ski instruction at Park City Mountain Resort.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  smooth={true}
                  duration={500}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            {socialLinks.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} Mooseology101. All rights reserved.
        </p>
        <p>
          Powered by{" "}
          <a
            href="https://www.hexacode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Hexacode
          </a>
        </p>
      </div>
    </footer>
  );
}