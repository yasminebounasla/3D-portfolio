import {
  mobile,
  backend,
  creator,
  web,
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
  weatherApp
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
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
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
    name: "React Native",
    icon: reactjs,
  },
  {
    name: "docker",
    icon: docker,
  },
];


const projects = [
  {
    name: "Weather App",
    description:
      "This is a simple weather application built using vanilla JavaScript. It fetches and displays the current weather and a weekly forecast for a selected city using the Open-Meteo API.",
    tags: [
      {
        name: "javascript",
        color: "yellow-text-gradient",
      },
      {
        name: "H",
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
    name: "Travel Journal",
    description:
      "A full-stack app that allows users to document their travels. Users can create, read, update, and delete journal entries, making it easy to keep track of trips, memories, and experiences. It also includes search and filter functionalities for easy access to past entries",
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
      "Chef Claude is a smart recipe generator web application that helps users discover delicious recipes based on available ingredients. Users can create accounts, generate personalized recipes, save favorites, manage recipe history, and customize their cooking experience with a comprehensive profile management system.",
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
        color: "pink-text-gradient",
      },
    ],
    image: chefClaude,
    source_code_link: "https://github.com/yasminebounasla/chef-claude",
  },
  {
    name: "Collab Note",
    description:
      "A collaborative note-taking app that allows users to create, edit, and manage notes. Features include search, sorting, and favorites to organize notes efficiently.",
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
];

export { services, technologies, projects };