import "./App.css";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthProvider>
      <div className="w-full min-h-screen flex justify-center bg-white">
      <div className="w-full max-w-[45em]">
            <AppRoutes />
          </div>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
