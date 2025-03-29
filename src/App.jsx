import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Helmet } from "react-helmet";

const AnimatedPage = ({ children }) => (
  <motion.section
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="p-8"
  >
    {children}
  </motion.section>
);

const FadeInSection = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

function useTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function AppWrapper() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <ScrollToTop />
      <App darkMode={darkMode} setDarkMode={setDarkMode} />
    </Router>
  );
}

function App({ darkMode, setDarkMode }) {
  const location = useLocation();
  const NavLink = ({ to, label }) => (
    <Link
      to={to}
      className={`hover:underline transition-colors ${
        location.pathname === to
          ? "text-blue-500 dark:text-blue-400 font-semibold"
          : ""
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-500">
      <Helmet>
        <title>Home | Sundar Machani</title>
        <meta
          name="description"
          content="Portfolio of Sundar Machani, Full-Stack Developer."
        />
        <meta property="og:image" content="/preview.png" />
      </Helmet>
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md p-4 flex justify-between items-center transition-colors">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo.svg"
            alt="logo"
            className="w-6 h-6"
            onError={(e) => (e.target.style.display = "none")}
          />
          <span className="text-xl font-bold">Sundar Machani</span>
        </Link>
        <nav className="space-x-4">
          <NavLink to="/" label="Home" />
          <NavLink to="/projects" label="Projects" />
          <NavLink to="/experience" label="Experience" />
          <NavLink to="/skills" label="Skills" />
          <NavLink to="/contact" label="Contact" />
          <button onClick={() => setDarkMode(!darkMode)} className="ml-4">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </header>

      <main className="p-4 flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <FadeInSection>
                <Home />
              </FadeInSection>
            }
          />
          <Route
            path="/projects"
            element={
              <FadeInSection>
                <Projects />
              </FadeInSection>
            }
          />
          <Route
            path="/experience"
            element={
              <FadeInSection>
                <Experience />
              </FadeInSection>
            }
          />
          <Route
            path="/skills"
            element={
              <FadeInSection>
                <Skills />
              </FadeInSection>
            }
          />
          <Route
            path="/contact"
            element={
              <FadeInSection>
                <Contact />
              </FadeInSection>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="text-center py-6 border-t border-gray-200 dark:border-gray-700 mt-8 text-sm text-gray-600 dark:text-gray-400">
        <div className="space-x-4 mb-2">
          <a
            href="https://github.com/sundarmachani"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sundar-machani/"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:sundarmachani@gmail.com" className="hover:underline">
            Email
          </a>
        </div>
        <p>© {new Date().getFullYear()} Sundar Machani. All rights reserved.</p>
      </footer>
    </div>
  );
}
const Home = () => {
  useTitle("Home | Sundar Machani");
  return (
    <AnimatedPage>
      <h2 className="text-4xl font-bold mb-2">Hi, I'm Sundar Machani 👋</h2>
      <p className="text-lg mb-6 max-w-2xl">
        Full-stack Software Engineer with experience in building scalable
        applications using Java, Spring Boot, React, and Node.js. Passionate
        about crafting clean code, solving meaningful problems, and continuously
        learning new technologies.
      </p>
      <div className="space-x-4 flex flex-wrap">
        <a
          href="mailto:sundarmachani@gmail.com"
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
        >
          Contact Me
        </a>
        <a
          href="https://github.com/sundarmachani"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/sundar-machani/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
        >
          LinkedIn
        </a>
        <a
          href="/sundar-machani-resume.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
        >
          Download Resume
        </a>
      </div>
    </AnimatedPage>
  );
};

const Projects = () => {
  useTitle("Projects | Sundar Machani");
  return (
    <AnimatedPage>
      <h2 className="text-3xl font-semibold mb-6">Projects</h2>
      <div className="mb-8">
        <h3 className="text-2xl font-bold">Machani’s E-Commerce Platform</h3>
        <p className="mb-1 text-sm text-blue-400">
          <a
            href="https://machanis.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Live App
          </a>{" "}
          |
          <a
            href="https://github.com/sundarmachani/machanis-frontend"
            target="_blank"
            rel="noreferrer"
            className="ml-2"
          >
            Frontend
          </a>{" "}
          |
          <a
            href="https://github.com/sundarmachani/machanis-backend"
            target="_blank"
            rel="noreferrer"
            className="ml-2"
          >
            Backend
          </a>
        </p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>Built using MERN stack with Stripe integration for payments</li>
          <li>
            Implemented JWT auth and role-based access for secure operations
          </li>
          <li>Admin dashboard for managing users, products, and orders</li>
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold">Secure Bank</h3>
        <p className="mb-1 text-sm text-blue-400">
          <a
            href="https://github.com/sundarmachani/SecureBank"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repo
          </a>
        </p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>
            Python Flask + MongoDB backend with ACID-compliant transactions
          </li>
          <li>JWT-based authentication and encryption protocols</li>
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold">Story Vault</h3>
        <p className="mb-1 text-sm text-blue-400">
          <a
            href="https://github.com/sundarmachani/StoryVault"
            target="_blank"
            rel="noreferrer"
          >
            Fullstack GitHub Repo
          </a>
        </p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>Diary platform using React, Spring Boot, JWT, PostgreSQL</li>
          <li>Real-time updates via Axios and full Swagger documentation</li>
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold">YOLO Object Detection</h3>
        <p className="mb-1 text-sm text-blue-400">
          <a
            href="https://github.com/sundarmachani/YOLO"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repo
          </a>
        </p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>Built a YOLO v1-based model for real-time object detection</li>
          <li>Achieved 98% localization and 95% class prediction accuracy</li>
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold">Sentiment Analysis</h3>
        <p className="mb-1 text-sm text-blue-400">
          <a
            href="https://github.com/sundarmachani/sentimental-analysis"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repo
          </a>
        </p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>
            Built with Python using NLTK's VADER for text sentiment
            classification
          </li>
          <li>
            Classified texts into Positive, Negative, Neutral with 95% accuracy
          </li>
        </ul>
      </div>
    </AnimatedPage>
  );
};

const Experience = () => {
  useTitle("Experience | Sundar Machani");
  return (
    <AnimatedPage>
      <h2 className="text-3xl font-semibold mb-6">Experience</h2>
      <div className="mb-8">
        <h3 className="text-2xl font-bold">Software Engineer (Volunteer)</h3>
        <p className="text-sm text-gray-400">
          One Community Global • Remote • Feb 2025 – Present
        </p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>
            Contributed to a large-scale MERN application (Highest Good Network)
          </li>
          <li>Resolved 15+ critical bugs and implemented 5+ new features</li>
          <li>
            Enhanced UI responsiveness, project dashboards, and system
            maintainability
          </li>
          <li>
            Led a team of 14 volunteer engineers — created tasks, enforced
            updates, and ensured collaboration
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold">Software Engineer</h3>
        <p className="text-sm text-gray-400">
          Rakuten Symphony • Bangalore, India • Mar 2022 – Aug 2023
        </p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>
            Engineered and optimized high-volume microservices using Java,
            Spring Boot, and Couchbase, processing over 1M orders per month
          </li>
          <li>
            Spearheaded performance improvements in quotation systems, reducing
            API latency by 25% and increasing throughput by 20%
          </li>
          <li>
            Directed migration from Spring Boot 2.5.4 to 2.7.5, resolving 15+
            dependency conflicts and reducing maintenance overhead by 30%
          </li>
          <li>
            Implemented 300+ JUnit tests, raising test coverage from 57% to 87%
            and reducing production defects
          </li>
          <li>
            Designed a Grafana/Kibana observability stack, reducing debugging
            time by 35% and enabling real-time monitoring
          </li>
          <li>
            Resolved security vulnerabilities using JFrog and SonarQube,
            boosting compliance from 65% to 87%
          </li>
          <li>
            Developed SOAP integrations and optimized legacy APIs to eliminate
            redundant calls and enhance response times
          </li>
          <li>
            Collaborated with cross-functional teams on the Quote Management
            API, improving scalability and team velocity
          </li>
          <li>
            Mentored junior developers and led knowledge-sharing sessions,
            improving onboarding and code quality
          </li>
          <li>
            Diagnosed and resolved login issues in the User Management System,
            reducing customer tickets and improving L3 support efficiency
          </li>
        </ul>
      </div>
    </AnimatedPage>
  );
};

const Skills = () => {
  useTitle("Skills | Sundar Machani");
  return (
    <AnimatedPage>
      <h2 className="text-3xl font-semibold mb-6">Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Languages</h3>
          <p>JavaScript, TypeScript, Java, Python, SQL, HTML, CSS</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Frontend</h3>
          <p>React.js, Tailwind CSS, Bootstrap, Axios, jQuery</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Backend</h3>
          <p>Spring Boot, Node.js, Express.js, Flask</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Databases</h3>
          <p>PostgreSQL, MongoDB, MySQL, Couchbase</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">DevOps & Cloud</h3>
          <p>
            AWS, GCP, Docker, Kubernetes, Vercel, Render, Jenkins, GitHub
            Actions
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Testing & Monitoring</h3>
          <p>JUnit, Mockito, SonarQube, Grafana, Kibana</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Tools & Practices</h3>
          <p>Git, GitHub, Postman, Swagger, RESTful APIs, Agile</p>
        </div>
      </div>
    </AnimatedPage>
  );
};

const Contact = () => {
  useTitle("Contact | Sundar Machani");
  return (
    <AnimatedPage>
      <h2 className="text-2xl font-semibold mb-4">Contact</h2>
      <p>
        Email:{" "}
        <a href="mailto:sundarmachani@gmail.com" className="underline">
          sundarmachani@gmail.com
        </a>
      </p>
    </AnimatedPage>
  );
};

const NotFound = () => {
  useTitle("404 | Sundar Machani");
  return (
    <AnimatedPage>
      <Link to="/" className="text-blue-500 underline">
        Go back home
      </Link>
    </AnimatedPage>
  );
};

export default AppWrapper;
