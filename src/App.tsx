import { Navigate, Outlet } from "react-router";
import "./App.css";
// import { useUser } from "@clerk/clerk-react";
import { Header } from "./components/custom/Header";
import { Toaster } from "./components/ui/sonner";

function App() {
  // const { isSignedIn, isLoaded } = useUser();

  // if (!isSignedIn && isLoaded) {
  //   return <Navigate to={"/auth/sign-in"} replace />;
  // }

  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;
