"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";

function AboutUs() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <section className="max-w-3xl w-full bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Section */}
        <header className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-extrabold text-center">About Me</h1>
        </header>

        {/* Content Section */}
        <div className="p-6 space-y-8">
          {/* Introduction */}
          <article>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Hello, I'm Kristin Alex
            </h2>
            <p className="text-gray-700">
              I’m a dedicated software developer with a passion for crafting
              efficient, user-focused solutions. Whether it’s designing
              web-based platforms or working on challenging coding projects, my
              goal is to make technology more accessible and impactful.
            </p>
          </article>

          {/* My Background */}
          <article>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              My Journey
            </h2>
            <p className="text-gray-700">
              Starting from my first line of code to contributing to diverse
              projects, I’ve embraced every opportunity to grow as a developer.
              My technical expertise spans full-stack development, and I love
              working on both collaborative and individual projects.
            </p>
          </article>

          {/* Values Section */}
          <article>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              What Drives Me
            </h2>
            <p className="text-gray-700">
              I strongly believe in continuous improvement, innovation, and
              fostering meaningful connections through technology. I aim to
              create solutions that not only work seamlessly but also make a
              positive difference.
            </p>
          </article>

          {/* Social Links */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Let’s Connect
            </h3>
            <div className="flex justify-center gap-8">
              <a
                href="https://github.com/KristinAlex1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-gray-600 hover:text-gray-900 transition-all"
              >
                <FaGithub size={36} />
              </a>
              <a
                href="https://www.linkedin.com/in/kristin-alex-740a72153/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-gray-600 hover:text-blue-500 transition-all"
              >
                <FaLinkedin size={36} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutUs;
