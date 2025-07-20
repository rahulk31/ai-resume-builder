import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { RouterProvider } from "react-router";
import { Home } from "./Home";
import { Dashboard } from "./Dashboard";
import { ClerkProvider } from "@clerk/clerk-react";
import { SignInPage } from "./auth";
import { EditResume } from "./Dashboard/resume/[resumeId]/edit/EditResume.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
    errorElement: <div>Resume Not Found</div>,
    children: [],
  },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
