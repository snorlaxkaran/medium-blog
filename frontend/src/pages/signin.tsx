import { AuthSidebar } from "../components/AuthSidebar";
import { Auth } from "../components/AuthForm";

export const Signin = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <Auth type="signin" />
      <div className="invisible md:visible">
        <AuthSidebar />
      </div>
    </div>
  );
};
