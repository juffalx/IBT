# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

Mesob — React Capstone Project

Mesob is my React Capstone Project, built as part of my CodeOps Full Stack Software Development journey at IBT College of Canada.

The main goal of this project was to take a frontend product idea and turn it into a working React application while practicing the concepts I have learned throughout the React module.

This project is also part of my hands-on practice with building applications that are structured, reusable, responsive, and easier to maintain.

About the Project

Mesob is a food-related web application where users can browse products, view details, manage a shopping cart, and interact with different parts of the application.

While building it, I focused not only on making the UI look good, but also on understanding how the application works behind the UI — especially state management, routing, forms, authentication, and reusable React components.

What I Practiced

During this capstone, I worked with:

React

JavaScript (ES6+)

React Router

Zustand for state management

React Hook Form for form handling

Form validation

Reusable React components

Props and state

Conditional rendering

API/data handling

Shopping cart functionality

Authentication-related state

Responsive UI

CSS

Git & GitHub

Main Features

🛒 Shopping Cart

Users can:

Add products to the cart

Increase or decrease quantities

Remove products

View cart information

Keep cart state available across the application

🔐 Authentication

The application includes authentication-related functionality and manages authentication state through the application store.

📝 Forms

Forms are handled using React Hook Form, including input handling and validation.

🗂️ State Management

For global application state, I used Zustand.

This helped me move shared state such as cart and authentication data into a central store instead of passing the same data through many components.

🧭 Routing

The application uses React Router for navigation between different pages and application sections.

Project Structure

The project is organized around reusable React components and separate responsibilities rather than putting everything inside one large component.

Some of the main areas include:

src/
├── components/
├── pages/
├── store/
├── assets/
├── App.jsx
└── main.jsx

The exact structure may change as the project continues to develop.

What I Learned

One of the biggest things I learned from this project is that building a React application is not only about writing JSX and CSS.

I had to think about:

Where state should live

Which state should be global

How components communicate

How forms should be handled

How validation should work

How routes connect different parts of an application

How to make components reusable

How different features work together as one application

The project gave me a chance to connect many of the React concepts I studied separately and use them together in one application.

Challenges

There were several parts that required extra practice, especially when connecting different concepts together.

Instead of only copying solutions, I tried to understand why the code was needed and how each part affected the rest of the application.

That process helped me become more comfortable reading, debugging, changing, and rebuilding React code.

My Learning Approach

This project is part of my ongoing learning journey.

I am still improving my React and JavaScript skills, so this project is not just about the final UI. It is also a record of my progress from learning individual React concepts to putting them together in a complete application.

Still learning. Still building. Still practicing.

Running the Project

Clone the repository and install the dependencies:

npm install

Start the development server:

npm run dev

Then open the local development URL provided by Vite.

Technologies Used

Technology

Purpose

React

Frontend application

JavaScript

Application logic

React Router

Page navigation

Zustand

Global state management

React Hook Form

Form handling

CSS

Styling and responsive UI

Vite

Development and build tooling

Git & GitHub

Version control

Learning Context

Program: CodeOps Full Stack Software Development
Institution: IBT College of Canada
Project: React Capstone Project
Module: Module 03
Developer: Mohammed Yasin

This project represents one stage of my journey toward becoming a stronger full-stack developer.

A Note From Me

I built this project to practice, make mistakes, debug them, and understand what I was doing.

There is still a lot more for me to learn, but every project gives me another opportunity to improve.

Still Learning. Still Building. Still Practicing.
