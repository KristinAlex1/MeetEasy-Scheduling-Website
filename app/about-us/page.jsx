"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";

function AboutUs() {
  return (
    <main className="bg-gray-50 min-h-screen flex items-center justify-center px-6">
      <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 max-w-3xl w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Me</h1>
          <p className="text-gray-600">
            Hello! I’m <span className="font-semibold">Kristin Alex</span>, a
            passionate software developer with a focus on building innovative,
            user-friendly solutions. I thrive on tackling challenging problems
            and turning ideas into functional, efficient code.
          </p>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* My Journey */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              My Journey
            </h2>
            <p className="text-gray-600">
              My journey into technology started with curiosity. Over the years, I’ve honed my skills in
              web development, problem-solving, and collaborative project work,
              always striving for excellence.
            </p>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              My Values
            </h2>
            <p className="text-gray-600">
              I believe in the power of collaboration, continuous learning, and
              using technology as a tool for positive change. Whether it’s
              contributing to open-source projects or collaborating on team
              efforts, I’m dedicated to making an impact.
            </p>
          </div>

          {/* Links */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Connect With Me
            </h2>
            <div className="flex justify-center gap-6">
              {/* GitHub */}
              <a
                href="https://github.com/KristinAlex1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition"
              >
                <FaGithub size={40} />
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/kristin-alex-740a72153/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                <FaLinkedin size={40} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AboutUs;
