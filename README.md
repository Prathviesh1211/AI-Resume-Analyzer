# Resumetric - AI Resume Analyzer
**Live Demo →** https://resumetric.netlify.app/

Resumetric is a powerful AI-powered resume analyzer that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS). Upload your resume, paste a job listing, and get instant feedback with an ATS compatibility score and personalized suggestions—all running directly in your browser with privacy-first cloud storage.

<img width="1893" height="848" alt="Screenshot 2025-11-18 185721" src="https://github.com/user-attachments/assets/209ebd2e-6bd8-44d0-ae37-fdd46deaf24e" />


## ✨ Features

- **🔐 Easy & Convenient Auth** - Handle authentication entirely in the browser using Puter.js—no backend or setup required
- **📄 Resume Upload & Storage** - Upload and store all your resumes in one secure place, safely and reliably
- **🤖 AI Resume Matching** - Provide a job listing and get an ATS score with custom AI-powered feedback tailored to each resume
- **🎨 Modern UI/UX** - Clean, responsive design built with Tailwind CSS and shadcn/ui for a sleek user experience
- **♻️ Code Reusability** - Leverage reusable components and a modular codebase for efficient development
- **📱 Cross-Device Compatibility** - Fully responsive design that works seamlessly across all devices
- **⚡ Fast & Efficient** - Built with Vite for lightning-fast development and optimized production builds

## 🛠️ Tech Stack

- **[React](https://react.dev/)** - Popular open-source JavaScript library for building user interfaces using reusable components and a virtual DOM
- **[React Router v7](https://reactrouter.com/)** - Go-to routing library offering nested routes, data loaders/actions, error boundaries, code splitting, and SSR support
- **[Puter.com](https://puter.com/)** - Advanced, open-source internet operating system providing privacy-first personal cloud storage
- **[Puter.js](https://docs.puter.com/)** - Tiny client-side SDK adding serverless auth, storage, database, and AI capabilities (GPT, Claude, DALL·E, OCR) straight into your browser app
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for building custom user interfaces with low-level utility classes
- **[TypeScript](https://www.typescriptlang.org/)** - Superset of JavaScript adding static typing for better tooling, code quality, and error detection
- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server using native ES modules for instant startup and hot-module replacement
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Minimal, hook-based state management library with zero boilerplate and excellent performance

## 📸 Screenshots

<div align="center">
  <img width="1893" height="848" alt="Screenshot 2025-11-18 185721" src="https://github.com/user-attachments/assets/209ebd2e-6bd8-44d0-ae37-fdd46deaf24e" />
  <p><em>Clean and intuitive homepage - Upload your first resume to get started</em></p>
  
  <img width="1534" height="860" alt="Screenshot 2025-11-18 185757" src="https://github.com/user-attachments/assets/6b11cd76-f859-458f-8a4c-9f61a9e17136" />
  <p><em>Simple upload interface - Add job details and upload your resume</em></p>
  
  <img width="1891" height="864" alt="Screenshot 2025-11-18 185932" src="https://github.com/user-attachments/assets/32a5756f-f6c1-4997-912b-176828af1fbb" />
  <p><em>Comprehensive resume analysis with detailed scoring</em></p>
  
  <img width="1883" height="860" alt="Screenshot 2025-11-18 190004" src="https://github.com/user-attachments/assets/072cd5e6-b1e9-4433-8432-17d9022e3cb9" />
  <p><em>ATS score breakdown with actionable improvement suggestions</em></p>
  
  <img width="1869" height="857" alt="Screenshot 2025-11-18 190034" src="https://github.com/user-attachments/assets/16a9093f-29fa-46c5-b842-d89c98eae8da" />
  <p><em>In-depth feedback on tone, style, and content quality</em></p>
  
  <p><em>Track multiple resume submissions and compare performance</em></p>
</div>


## 🚀 Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/adrianhajdin/ai-resume-analyzer.git
cd ai-resume-analyzer
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**

Navigate to [http://localhost:5173](http://localhost:5173) to view the project.

## 📦 Build for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

## 🌐 Deployment

This project is deployed on [Netlify](https://www.netlify.com/). To deploy your own instance:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

## 📁 Project Structure
```
resumetric/
├── app/
│   ├── components/     # Reusable UI components
│   ├── constants/      # Application constants and configurations
│   ├── lib/            # Utility functions and helpers
│   ├── routes/         # Application routes and pages
│   ├── types/          # TypeScript type definitions
│   ├── app.css         # Global styles
│   ├── root.tsx        # Root component
│   └── routes.ts       # Route configurations
├── public/             # Static assets
└── package.json        # Project dependencies
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with guidance from [JavaScript Mastery](https://github.com/adrianhajdin)
- Powered by [Puter.js](https://puter.com/) for serverless capabilities
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)

---

**Made with ❤️ using React, TypeScript, and Puter.js**
