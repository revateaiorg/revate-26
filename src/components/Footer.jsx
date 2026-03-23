import React from "react";
import { Linkedin, Twitter, Instagram, Facebook, Github } from "lucide-react";
import Logo from "../assets/logo.png"; // Assuming you have a logo image

const Footer = () => {
  return (
    <footer className="border-t border-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16r">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-32 mb-8 ">
          {/* Left Side - Brand and Description */}
          <div className="space-y-3">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              {/* <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-md flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                </div>
              </div> */}
              <img src={Logo} alt="Revate Logo" className="w-40" />
            </div>

            {/* Description */}
            <p className="text-gray-300 text-md leading-relaxed max-w-[400px] font-sans">
              Your trusted partner in Web & AI solutions, creating smarter
              systems for smarter businesses.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/revate/"
                aria-label="Revate LinkedIn Profile"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors duration-200 hover:scale-105 transform"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/revate"
                aria-label="Revate X Profile"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors duration-200 hover:scale-105 transform"
              >
                <img
                  src="data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABlklEQVR4nO2UPSiFYRiGj0PyM5EkRTEYJPnZbCg/pSwGUgYMFoOSRUrJ6GwGg0EpOQzKZkJJKImBTEJIyW/5i0tv3fR2+r7zfecc47mn89zv89z3ed73e55AIAm/AJqAb5yx7FHbCnyqvjNa4jTu6HKpqQaelTPi1UUGcKTkkLh+xQ9AcUR+IXCu81mPS/orqgHe1W6LuCWJbABBcVnArvh1IN2XgYpHVXgJ5AJ5wLW4IWMCrCg+BnJ8i8sgFdiSwIK4NsWvwKJ+3wKlMYlbJiXAo4S6xc1Yj26M6uISt0x6JXZvHhjIBk7FzSckbpmEJbipq6sFPoAvoP4/DPKAK5kMixtXfBHzAzsYZAMHEnwDKoE0YEfcXCLiQetzNNdicKiBLANexHXEaxCSwB1QBZwontL5gPURFMUq3m/98wZryn8fuFHcqvLWgBS/4s3ajgY9EWdjEVOeD9yIG/QjXq6WDSZc3sXspL81DrRbw1cRTbwAOFNy2K1lTfkTzth3XHxAJrCtpD2zLT067cMdk55XlURA+AFztNjG/xzYtwAAAABJRU5ErkJggg=="
                  alt="X Logo"
                />
              </a>
              <a
                href="https://www.instagram.com/revate/"
                aria-label="Revate Instagram Profile"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors duration-200 hover:scale-105 transform"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/people/Revate/pfbid0k3hF5pM4v8hcEQEi2PsAZPrXSMyqaSZr3a7FrUZxa4RoNSCu4zAFAHspwraUoEovl/?rdid=2TLCPjxVXXhRydsk&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18yNAer5CX%2F"
                aria-label="Revate Facebook Profile"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors duration-200 hover:scale-105 transform"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Side - Navigation Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-20 ">
            {/* Sections Column */}
            <div>
              <h3 className="text-md font-semibold mb-4 text-white">
                Services
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#about"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Web Development
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-gray-300 transition-colors"
                  >
                    AI Automation
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-gray-300 transition-colors"
                  >
                    UI UX Designing
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-gray-300 transition-colors"
                  >
                    AI Chatbot Development
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-gray-300 transition-colors"
                  >
                    SEO
                  </a>
                </li>
              </ul>
            </div>

            {/* Pages Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="" className="hover:text-gray-300 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-gray-300 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("about");
                      if (el) {
                        const y =
                          el.getBoundingClientRect().top +
                          window.pageYOffset -
                          100;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      }
                    }}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-gray-300 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("services");
                      if (el) {
                        const y =
                          el.getBoundingClientRect().top +
                          window.pageYOffset -
                          100;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      }
                    }}
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#works"
                    className="hover:text-gray-300 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("works");
                      if (el) {
                        const y =
                          el.getBoundingClientRect().top +
                          window.pageYOffset -
                          100;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      }
                    }}
                  >
                    Works
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-gray-300 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("contact");
                      if (el) {
                        const y =
                          el.getBoundingClientRect().top +
                          window.pageYOffset -
                          100;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      }
                    }}
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2026 RevateAI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
