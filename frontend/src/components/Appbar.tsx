import { Link } from "react-router-dom";
import { Avatar } from "./BlogsCard";
import { Pencil } from "lucide-react";

export const Appbar = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-slate-200">
      <div>
        <Link to={"/blogs"}>
          <img src="/logo.svg" alt="" className="w-24" />
        </Link>
      </div>
      <div className="flex gap-3 items-center text-lg">
        <Link
          to={"/create-blog"}
          className="flex items-center gap-2 text-slate-600"
        >
          {" "}
          <Pencil className="w-4 h-4" /> Write
        </Link>
        <Avatar authorName={"Karan"} size="w-9 h-9" />
      </div>
    </div>
  );
};
