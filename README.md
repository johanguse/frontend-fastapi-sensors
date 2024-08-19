![License](https://img.shields.io/badge/license-MIT-blue)

# Sensor Data Dashboard

This project is runnig live on [frontend-fastapi-sensors.vercel.app](https://frontend-fastapi-sensors.vercel.app/).

### ⚠️ Atention
### This project depends of backend [backend-fastapi-sensors](https://github.com/johanguse/backend-fastapi-sensors) to run.


### 🔐 How to login into the dashboard

Current we have three users on database, choose one of them to
login:
```
username: johanguse@gmail.com
password: mE8eAazZ28xmmHG$
```
```
username: jane.smith@example.com
password: mE8eAazZ28xmmHG$
```
```
username: alice.johnson@example.com
password: mE8eAazZ28xmmHG$
```

### Things could be improve with extra time aka to-do list.

 - Remove unnecessary files
 - Remove unnecessary dependencies
 - Improve Index page with more infos
 - Create a fake logo and added favicon
 - Use react-hook-form for a better form validation
 - Add reset password logic on both back and front end
 - Createa page to add new users
 - Add tests

To set up and run the project on your local machine, follow the instructions provided below.

Here's the updated README reflecting your project's dependencies:

---

## 🤖 Tech Stack

Here's a breakdown of the core technologies and libraries used:

- **[React](https://reactjs.org/)**: A popular JavaScript library for building dynamic and responsive user interfaces.
- **[Next.js](https://nextjs.org/)**: A React framework for building fast and SEO-friendly web applications.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapidly building custom designs with an emphasis on responsiveness and maintainability.
- **[Radix UI](https://radix-ui.com/)**: Unstyled, accessible components for building high-quality design systems and web applications.
- **[React Aria](https://react-spectrum.adobe.com/react-aria/)**: Accessible UI primitives for React applications.
- **[Remix Icon](https://remixicon.com/)**: A set of open-source neutral-style icons.
- **[NextAuth.js](https://next-auth.js.org/)**: Authentication for Next.js applications.
- **[Zod](https://zod.dev/)**: A TypeScript-first schema declaration and validation library.
- **[Recharts](https://recharts.org/)**: A composable charting library built on React components.
- **[TypeScript](https://www.typescriptlang.org/)**: A strongly typed programming language that builds on JavaScript.
- **[ESLint](https://eslint.org/)**: A powerful tool for identifying and fixing problems in JavaScript code, ensuring code quality and consistency.
- **[Prettier](https://prettier.io/)**: An opinionated code formatter that supports multiple languages and integrates with most editors.


## ⚒️ Prerequisites

Before starting, ensure you meet the following requirements:

### This project depends of backend [backend-fastapi-sensors](https://github.com/johanguse/backend-fastapi-sensors) to run. First you need to run the backend, follow the instructions in the README of [backend-fastapi-sensors](https://github.com/johanguse/backend-fastapi-sensors).

- **Node.js (v18 or higher)**: The project requires Node.js version 18 or higher. If you haven't installed it yet or need to upgrade, visit the [Node.js download page](https://nodejs.org/).
- **npm (Node Package Manager)**: npm is utilized to manage the project's dependencies. It comes bundled with Node.js. You can check your npm version by running `npm -v` in your terminal.
- **bun**: (optional) As an efficient alternative to npm, Yarn and pnpm, this project supports [bun](https://bun.sh/), known for its speed and efficiency in handling packages. Follow the instructions on the bun website for installation and usage.
- **A Code Editor**: Use a code editor like [Visual Studio Code](https://code.visualstudio.com/) (preferable), [Sublime Text](https://www.sublimetext.com/), [Atom](https://atom.io/) or why not [Adobe Dreamweaver](https://www.adobe.com/br/products/dreamweaver.html) ([remember that?](https://en.wikipedia.org/wiki/Adobe_Dreamweaver)) for an enhanced development experience.

## 🚀 Installation and Running Instructions

Getting this project up and running on your local machine.

### 1 - Download and Install Dependencies

**Clone the Repository**: First, clone the repository to your local machine. Open your terminal and run the following command:

```bash
git clone https://github.com/johanguse/frontend-fastapi-sensors.git
```

**Navigate to the Project Directory**: After cloning, move into the project directory with this command:

```bash
cd frontend-fastapi-sensors
```

**Install Dependencies**: Finally, install all necessary dependencies. You can use pnpm, but npm or yarn are also compatible. Execute one of the following commands:

```bash
bun install  # You can also use npm, yarn or pnpm if you prefer
```

### 2 - Running the Development Server

After successfully installing the dependencies, you're ready to launch the development server. Follow these steps to get it running on your local machine:

**Start the Development Server**: To initiate the server, open your terminal and execute the following command:

```bash
bun run dev  # You can also use npm, yarn or pnpm if you prefer
```

This command fires up the Next.js development server.

**Accessing the Server**: By default, the server will be accessible at [http://localhost:3000](http://localhost:3000). You can use this URL to view your application in a web browser.

If you fancy any errors make sure the [backend-fastapi-sensors](https://github.com/johanguse/backend-fastapi-sensors) is running.


## 🧪 Test

Current in the to-do list.



## 🏵️ Extra

We use ESLint and Prettier to ensure code quality and consistency. You can run the linting and formatting checks using the following command:

For checks:

```bash
bun run format  # You can also use npm, yarn or pnpm if you prefer
```

To fix the code style:

```bash
bun run format:fix  # You can also use npm, yarn or pnpm if you prefer
```

## 📝 License

This project is licensed under the MIT License.