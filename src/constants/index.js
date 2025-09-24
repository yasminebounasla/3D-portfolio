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
  soon
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
    title: "web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  }
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Prisma",
    icon: prisma,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "Express",
    icon: express,
  },
   {
    name: "Java",
    icon: java,
  },
   {
    name: "C",
    icon: c,
  },
  {
    name: "docker",
    icon: docker,
  },
];


const projects = [
  {
    name: "Travel Journal",
    description:
      "A full-stack application that allows users to document their travels. Users can create, read, update, and delete journal entries, making it easy to track trips, memories, and experiences. It also includes search and filtering features for quick access to past entries.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "express",
        color: "green-text-gradient",
      },
      {
        name: "prisma",
        color: "purple-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: travelJournal,
    source_code_link: "https://github.com/yasminebounasla/Travel-journal",
  },
  {
    name: "Chef Claude",
    description:
      "Chef Claude is a smart recipe generator web app that helps users discover delicious recipes based on available ingredients. Users can generate personalized recipes, save favorites, view history, and manage their cooking experience through a profile system tailored to their needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "express",
        color: "green-text-gradient",
      },
      {
        name: "mongodb",
        color: "pink-text-gradient",
      },
      {
        name: "css",
        color: "purple-text-gradient",
      },
    ],
    image: chefClaude,
    source_code_link: "https://github.com/yasminebounasla/chef-claude",
  },
  {
    name: "Collab Note",
    description:"A collaborative note-taking app that allows users to create, edit, and manage notes in one place. Features include search, sorting, and favorites to organize notes efficiently. It is designed to be simple, user-friendly, and effective for both individual and team productivity.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "express",
        color: "green-text-gradient",
      },
      {
        name: "prisma",
        color: "purple-text-gradient",
      },
    ],
    image: collabNote,
    source_code_link: "https://github.com/yasminebounasla/web-journey/tree/challenge-02-backend",
  },
  {
    name: "Weather App",
    description:
      "A simple weather application built with vanilla JavaScript. It fetches and displays the current weather and a weekly forecast for a selected city using the Open-Meteo API. The app focuses on simplicity, responsiveness, and delivering reliable weather updates to user.",
    tags: [
      {
        name: "javascript",
        color: "blue-text-gradient",
      },
      {
        name: "Html",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: weatherApp,
    source_code_link: "https://github.com/yasminebounasla/Weather-App",
  },
  {
    name: "Habit Tracker App",
    description:
      "A mobile application built with React Native and Expo that helps users build and maintain good habits. It allows users to create, track, and manage daily habits with streaks and progress visualization. The app focuses on simplicity, clean design, and providing an intuitive experience for personal growth.",
    tags: [
      {
        name: "React-Native",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: soon,
    source_code_link: "https://github.com/yasminebounasla/Habit-Tracker-App",
  },
];

export { services, technologies, projects };