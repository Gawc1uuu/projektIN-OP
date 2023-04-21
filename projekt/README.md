<h1>Adi Cooking</h1>

Tech Stack:
-MongoDB
-Mongoose
-Express
-Socket IO
-React
-TailwindCSS

Its a simple Recipe app where you can share, rate and review recipes with users.

Backend API is based on Express and Mongoose. It's devided on mondels, routes and and controllers. Authorization is done with use of Json Web Token and I authorize requests
by AuthMiddleWare.Socket IO is used to fetch comments in real time so you dont have to refresh a page to see comments up to date.

On a Frontend I use React. I fetch data with axios and socket io. Logic of authentication is moved to custom hooks useSignup and useLogin.There is also useAuthContext
which makes it easier and shorter to acces AuthContext. For storing recipes on a frontendI use context api. RecipesContext to keep track of all recipes and manage 
them. And also AuthContext to keep track if user is logged in, protect certain routes and show conditional content. 

if you want to test it download a code open it with VS Code.
Open integrated terminal for a frontend folder and run npm install.
After its done run comment npm start to start a server.
Open integrated terminal for a backend and run 'npm install'.
After its done go to backend/src folder and run 'npm run serve' to run a server.

It will be deployed soon!
