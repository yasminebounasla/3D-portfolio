import {
  mobile,
  backend,
  javascript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  prisma,
  express,
  docker,
  collabNote,
  chefClaude,
  travelJournal,
  weatherApp,
  web,
  c,
  java,
  soon,
  python,
  tensorflow,
  pytorch,
  opencv,
  scikitlearn,
  visionEye,
  habitTracker,
  elexio,
  transformer,
  tumorClassification,
  breastCancer,
  skylineWeatherApp,
  churnDetection,
  multiAgents,
  codeReviewAgent,
  pfe
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "AI / Computer Vision",
    icon: visionEye,
  },
  {
    title: "Full-Stack Developer",
    icon: web,
  },
  {
    title: "Mobile Developer",
    icon: mobile,
  }
];

const technologies = [
  { name: "Python", icon: python },
  { name: "TensorFlow", icon: tensorflow },
  { name: "PyTorch", icon: pytorch },
  { name: "OpenCV", icon: opencv },
  { name: "Scikit-learn", icon: scikitlearn },
  { name: "React JS", icon: reactjs },
  { name: "Node JS", icon: nodejs },
  { name: "Express", icon: express },
  { name: "MongoDB", icon: mongodb },
  { name: "Prisma", icon: prisma },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Docker", icon: docker },
  { name: "git", icon: git },
  { name: "JavaScript", icon: javascript },
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "Java", icon: java },
  { name: "C", icon: c },
];

// Catégories utilisées par les tabs de filtre dans Works.jsx.
// IDs en minuscules obligatoire ("ai", pas "Ai") — doivent matcher
// exactement les valeurs utilisées dans "categories" de chaque projet.
export const categories = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI / ML" },
  { id: "web", label: "Full-Stack" },
  { id: "mobile", label: "Mobile" },
];

// Pour ajouter un projet : copie un objet ci-dessous. "categories" est un
// tableau — mets-y une ou plusieurs valeurs parmi "ai" / "web" / "mobile"
// (ex: ["web", "mobile"] pour un projet qui a les deux). Trié par ordre
// d'importance : garde les plus forts en premier.
const projects = [
  {
    name: "Secure Transport — Recommendation & OCR",
    categories: ["ai", "mobile"],
    description:
      "My graduation project (PFE). A secure transport application combining facial-recognition login (InsightFace), a personalized recommendation system, and OCR-based document verification (EasyOCR). Backend built with Express, Node.js and Prisma; mobile app with React Native (Expo).",
    tags: [
      { name: "react-native", color: "blue-text-gradient" },
      { name: "express", color: "green-text-gradient" },
      { name: "prisma", color: "purple-text-gradient" },
      { name: "insightface", color: "pink-text-gradient" },
      { name: "easyocr", color: "orange-text-gradient" },
    ],
    image: pfe,
    source_code_link: "https://github.com/yasminebounasla/Application-de-Transport-Securise-avec-Recommandation-et-OCR",
  },
  {
    name: "Elexio — Stock Management System",
    categories: ["web", "mobile"],
    description:
      "A full-stack stock management system built for my father's electronics business. A Next.js web dashboard and a React Native (Expo) mobile app share one Prisma/PostgreSQL backend, with real-time stock tracking, low-stock alerts, and movement history across locations.",
    tags: [
      { name: "next.js", color: "blue-text-gradient" },
      { name: "react-native", color: "green-text-gradient" },
      { name: "prisma", color: "purple-text-gradient" },
      { name: "postgresql", color: "pink-text-gradient" },
    ],
    image: elexio,
    source_code_link: "https://github.com/yasminebounasla/Gestion-de-Stock",
  },
  {
    name: "Multi-Agent Code Optimizer",
    categories: ["ai"],
    description:
      "A pipeline of 5 cooperating AI agents (Profiler, Optimizer, Benchmarker, Explainer, Scorer) that take slow Python code, automatically optimize it, and score the improvement — built for an AI club coding challenge.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "llm-agents", color: "green-text-gradient" },
      { name: "groq", color: "orange-text-gradient" },
    ],
    image: multiAgents,
    source_code_link: "https://github.com/yasminebounasla/Multi-agent-code-optimizer",
  },
  {
    name: "Code Review Agent",
    categories: ["ai"],
    description:
      "An AI agent that automatically reviews code changes and returns structured feedback — built to explore practical uses of LLM agents in a developer workflow.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "llm-agents", color: "green-text-gradient" },
    ],
    image: codeReviewAgent,
    source_code_link: "https://github.com/yasminebounasla/code-review-agent",
  },
  {
    name: "Transformer — English to French",
    categories: ["ai"],
    description:
      "A Transformer model built entirely from scratch in PyTorch — attention mechanism, encoder and decoder blocks implemented without pre-built libraries — trained for English-to-French translation, with a Streamlit demo for live translation.",
    tags: [
      { name: "pytorch", color: "blue-text-gradient" },
      { name: "nlp", color: "green-text-gradient" },
      { name: "streamlit", color: "pink-text-gradient" },
    ],
    image: transformer,
    source_code_link: "https://github.com/yasminebounasla/Transformer",
  },
  {
    name: "Breast Cancer Detection",
    categories: ["ai"],
    description:
      "A breast cancer detection model trained on the Kaggle 'Micro Club Pinktober' competition dataset, restructured into clean, modular code with a Streamlit demo for interactive predictions.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "scikit-learn", color: "green-text-gradient" },
      { name: "streamlit", color: "pink-text-gradient" },
    ],
    image: breastCancer,
    source_code_link: "https://github.com/yasminebounasla/Breast-Tumor-Detection",
  },
  {
    name: "Tumor Classification",
    categories: ["ai"],
    description:
      "A machine learning pipeline for tumor classification, restructured into clean, modular source code with a Streamlit demo for interactive predictions.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "scikit-learn", color: "green-text-gradient" },
      { name: "streamlit", color: "pink-text-gradient" },
    ],
    image: tumorClassification,
    source_code_link: "https://github.com/yasminebounasla/Tumor-Classification",
  },
  {
    name: "Churn Detection",
    categories: ["ai"],
    description:
      "A customer churn prediction pipeline built for the Kaggle 'Predict Customer Churn' (Playground Series S6E3) competition — includes model comparison and a Streamlit demo interface.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "scikit-learn", color: "green-text-gradient" },
      { name: "streamlit", color: "pink-text-gradient" },
    ],
    image: churnDetection,
    source_code_link: "https://github.com/yasminebounasla/Churn-Detection",
  },
  {
    name: "Skyline Weather — AI Rain Outlook",
    categories: ["web", "ai"],
    description:
      "A weather app built with vanilla JavaScript using the Open-Meteo API, enhanced with an AI-powered rain outlook — a Random Forest model trained to predict next-day rainfall probability.",
    tags: [
      { name: "javascript", color: "blue-text-gradient" },
      { name: "random-forest", color: "green-text-gradient" },
      { name: "open-meteo-api", color: "pink-text-gradient" },
    ],
    image: skylineWeatherApp,
    source_code_link: "https://github.com/yasminebounasla/Skyline-Weather-App-with-AI-Rain-Outlook",
  },
  {
    name: "Smart Habit Tracker App",
    categories: ["mobile"],
    description:
      "A mobile app built with React Native and Expo that helps users build and maintain good habits — create, track, and visualize daily habit streaks. AI-driven habit insights are planned as a next step.",
    tags: [
      { name: "react-native", color: "blue-text-gradient" },
      { name: "expo", color: "green-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
    image: habitTracker,
    source_code_link: "https://github.com/yasminebounasla/Habit-Tracker-App",
  },
  {
    name: "Collab Note",
    categories: ["web"],
    description: "A collaborative note-taking app that allows users to create, edit, and manage notes in one place. Features include search, sorting, and favorites to organize notes efficiently. It is designed to be simple, user-friendly, and effective for both individual and team productivity.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
      { name: "express", color: "green-text-gradient" },
      { name: "prisma", color: "purple-text-gradient" },
    ],
    image: collabNote,
    source_code_link: "https://github.com/yasminebounasla/web-journey",
  },
  {
    name: "Travel Journal",
    categories: ["web"],
    description:
      "A full-stack application that allows users to document their travels. Users can create, read, update, and delete journal entries, making it easy to track trips, memories, and experiences. It also includes search and filtering features for quick access to past entries.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "express", color: "green-text-gradient" },
      { name: "prisma", color: "purple-text-gradient" },
      { name: "css", color: "pink-text-gradient" },
    ],
    image: travelJournal,
    source_code_link: "https://github.com/yasminebounasla/Travel-journal",
  },
  {
    name: "Chef Claude",
    categories: ["web"],
    description:
      "Chef Claude is a smart recipe generator web app that helps users discover delicious recipes based on available ingredients. Users can generate personalized recipes, save favorites, view history, and manage their cooking experience through a profile system tailored to their needs.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "express", color: "green-text-gradient" },
      { name: "mongodb", color: "pink-text-gradient" },
      { name: "css", color: "purple-text-gradient" },
    ],
    image: chefClaude,
    source_code_link: "https://github.com/yasminebounasla/chef-claude",
  },
];

export { services, technologies, projects };