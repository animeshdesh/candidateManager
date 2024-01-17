# Candidate Manager

This project is a React application scaffolded using Vite, a fast development build tool that provides a streamlined experience for front-end development.

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd your-project-directory
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the App

To run the application locally, use the following command:

```bash
npm run dev
```

This will start the development server, and you can view your app at [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

The main application code is organized in the `src` directory. Here's a brief overview of the important files and directories:

- **`src/App.jsx`**: This is the entry point of the application. It defines the main `App` component and sets up routing using React Router.

- **`src/components`**: This directory contains React components used throughout the application.

- **`src/routes`**: This directory may contain route components if you have separate route files.

- **`src/index.jsx`**: The main entry file for the React application.

## Dependencies

- [React](https://reactjs.org/): A JavaScript library for building user interfaces.

- [React Router](https://reactrouter.com/): A declarative routing for React.js.

- [Vite](https://vitejs.dev/): A fast development build tool for modern web applications.

## Additional Notes

- The application uses the `BrowserRouter` for client-side routing.

- The `Home` component is used for routes related to the candidate.

- The `Login` component is used for the root route ("/").

- The `useParams` hook from React Router is used to retrieve the `id` parameter from the current route.

- State management is achieved using the `useState` hook.

Feel free to modify and extend this application to suit your specific requirements.

## License

This project is licensed under the [MIT License](LICENSE).
