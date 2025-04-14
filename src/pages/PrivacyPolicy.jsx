import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Footer from "../components/Footer";
import logo from "../assests/TMM-LANDING PAGE 1.svg";
import { Menu, X } from "lucide-react";

const PrivacyPolicy = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center px-4 md:px-10 lg:px-20 py-12 space-y-8">
        {/* Title and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 relative">
          {/* Logo */}
          <img src={logo} className="w-[250px] md:w-[400px]" alt="logo" />

          <div className="flex gap-2 w-full md:w-auto items-center">
            {/* Search Bar */}
            <div className="flex items-center w-full md:w-[300px] border border-[#000000] overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Country, Area, District..."
                className="w-full px-4 py-2 text-[#000000] text-sm bg-[#f5f5f5] focus:outline-none"
              />
            </div>

            {/* Search Button */}
            <button className="bg-[#00603A] px-4 py-2 flex items-center justify-center border border-[#00603A] text-white hover:text-[#00603A] hover:bg-transparent transition">
              <FaSearch className="font-thin hover:text-[#00603A]" />
            </button>

            {/* Menu Icon (Visible on all screen sizes) */}
            <button className="p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X className="w-6 h-6 text-[#000000]" />
              ) : (
                <Menu className="w-6 h-6 text-[#000000]" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Popup (Works on all screen sizes) */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-4/5 md:w-1/2 lg:w-1/3 flex flex-col items-start space-y-4 relative">
              {[
                { name: "Mansions", href: "/mansions" },
                { name: "Penthouses", href: "/penthouses" },
                { name: "New Developments", href: "/listingpage" },
                { name: "Magazine", href: "/magazine" },
                { name: "Luxe Collectibles", href: "/listingpage" },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="font-inter pb-2 text-gray-800 hover:text-[#00603A] text-lg"
                >
                  {link.name}
                </a>
              ))}

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-black"
                onClick={() => setMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        <div className="max-w-4xl  pt-4 md:pt-12  px-6 md:px-8 lg:px-8 font-inter leading-[2]">
          <h2 className="text-xl font-bold mb-4 text-black font-inter">
            Privacy Policy
          </h2>
          <p className="mb-6">
            Your privacy is important to us. This Privacy Policy outlines how we
            collect, use, and protect your personal information when you visit
            our website.
          </p>

          <h2 className="text-xl font-bold mb-2 text-black">Scope</h2>
          <p className="mb-6">
            This Privacy Policy applies to all visitors and users of The Mansion
            Market website and services. By accessing our site, you consent to
            the practices described in this policy.
            <p> Data Collection</p>
          </p>

          <h2 className="text-xl font-semibold mb-2 text-black">
            We collect information in the following ways:
          </h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">
              <strong>Personal Information:</strong> When you create an account
              or contact us, we may collect personal details such as your name,
              email address, phone number, and mailing address.
            </li>
            <li>
              <strong>Usage Data:</strong> We automatically collect information
              about your activity on our site, including your IP address,
              browser type, pages visited, and the time spent on our site.
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-2">Sharing of Personal Data</h2>
          <p className="mb-6">
            We do not sell or rent your personal information to third parties.
            We may share your data with trusted partners to help us operate our
            website, conduct our business, or provide services to you, provided
            those parties agree to keep this information confidential.
          </p>

          <h2 className="text-xl font-bold mb-2">Marketing</h2>
          <p className="mb-6">
            With your consent, we may use your personal information to send you
            promotional materials and updates about our services. You can
            opt-out of receiving these communications at any time by following
            the unsubscribe instructions provided in the emails.
          </p>

          <h2 className="text-xl font-bold mb-2">Purpose</h2>
          <p className="mb-4 font-semibold">
            The information we collect is used for the following purposes:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">
              To provide, maintain, and improve our website and services.
            </li>
            <li className="mb-2">
              To notify you about changes to our services.
            </li>
            <li className="mb-2">
              To allow you to participate in interactive features of our
              services when you choose to do so.
            </li>
            <li>To provide customer support.</li>
          </ul>

          <h2 className="text-xl font-bold mb-2 text-black">
            Account Protection
          </h2>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information. This includes using encryption,
            firewalls, and secure server hosting. However, no method of
            transmission over the Internet or method of electronic storage is
            100% secure.
          </p>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">
              User Rights About the Use of Personal Data
            </h2>
            <p className="mb-6 ">You have the right to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2"> Access your personal data.</li>
              <li className="mb-2">
                Request correction or deletion of your personal data.
              </li>
              <li className="mb-2">
                Object to or restrict the processing of your personal data.
              </li>
              <li>
                Withdraw consent at any time, where we are relying on consent to
                process your personal data.
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold mb-2 text-black">
              Using Original Content of The Mansion Market
            </h2>
            <p>
              All original content on The Mansion Market is protected by
              copyright. You may not reproduce, distribute, or create derivative
              works from our content without prior written permission.
            </p>

            <h2 className="text-xl font-bold mb-2 text-black">Cookies</h2>
            <p>
              The Mansion Market uses cookies to enhance user experience.
              Cookies are files stored on your device that help us recognize you
              and improve our website. You can manage your cookie preferences
              through your browser settings.
            </p>

            <h2 className="text-xl font-bold mb-2 text-black">
              Spam & Spyware
            </h2>
            <p>
              We are committed to preventing spam and spyware. We do not
              tolerate unsolicited communications and take measures to prevent
              spam on our platform. If you receive spam from us, please report
              it immediately.
            </p>

            <h2 className="text-xl font-bold mb-2 text-black">Third Party</h2>
            <p>
              We may link to third-party websites, which have their own privacy
              policies. We are not responsible for their content or practices.
              We encourage you to review the privacy policies of any third-party
              sites you visit.
            </p>

            <h2 className="text-xl font-bold mb-2 text-black">Security</h2>
            <p>
              We take the security of your personal information seriously. We
              implement appropriate security measures to protect against
              unauthorized access, alteration, disclosure, or destruction of
              your personal information.
            </p>
            <h2 className="text-xl font-bold mb-2 text-black">General</h2>
            <p>
              This Privacy Policy may be updated periodically to reflect changes
              in our practices. We will notify you of any changes by posting the
              new Privacy Policy on this page. We encourage you to review this
              policy regularly for the latest information on our privacy
              practices.
            </p>
            <h2 className="text-xl font-bold mb-2 text-black">Contact Us:</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy,
              please contact us at hello@themansionmarket.com
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
