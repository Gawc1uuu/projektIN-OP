import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreateRecipe from "./pages/CreateRecipe";
import SignleTrip from "./pages/SignleTrip";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";
import { io } from "socket.io-client";
import CreateHouse from "./pages/CreateHouse";
import MyTrips from "./pages/MyTrips";

export const socket = io("http://localhost:4000");

function App() {
  const { state: AuthState } = useAuthContext();

  return (
    <div className="font-poppins dark:bg-gray-600">
      <BrowserRouter>
        <Navbar />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mytrips" element={<MyTrips />} />
            <Route
              path="/login"
              element={!AuthState.user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!AuthState.user ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="/create" element={<CreateRecipe />} />
            <Route path="/:id/createhouse" element={<CreateHouse />} />
            <Route path="/:id" element={<SignleTrip />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
