import "./App.css";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  );
}

export default App;
