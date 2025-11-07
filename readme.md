## Node.js version

v18.20.8

## Packages required:

npm create vite@5 . -- --template vanilla-ts
npm i axios @tanstack/react-query
npm i -D eslint prettier
npm i -D @types/react @types/react-dom
npm i react react-dom

npm install -D @tailwindcss/postcss
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss@3 init -p
npm i lucide-react date-fns

## To run locally:

1. use Visual Studio Code to open the project

2. set the backend API URL in .env
   VITE_API_URL=your backend localhost address

3. include required packages by running the npm commands.

4. npm run dev
