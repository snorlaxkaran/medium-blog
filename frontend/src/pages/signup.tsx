import { AuthSidebar } from "../components/AuthSidebar";
import { Auth } from "../components/AuthForm";

export const Signup = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <Auth type="signup" />
      <div className="invisible md:visible">
        <AuthSidebar />
      </div>
    </div>
  );
};
