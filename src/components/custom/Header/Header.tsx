import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router";

export const Header = () => {
  const { isSignedIn } = useUser();
  return (
    <div className="flex justify-between items-center p-6 border mx-auto">
      {/* <img src="/logo.svg" alt="Logo" width={150} /> */}
      <h2 className="text-2xl font-bold lowercase">Resume Assist</h2>
      {isSignedIn ? (
        <div className="flex gap-4 items-center">
          <Link to={`/dashboard`}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={`/auth/sign-in`}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
};
