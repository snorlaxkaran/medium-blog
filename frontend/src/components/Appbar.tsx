import { Link, useParams } from "react-router-dom";
import { Avatar } from "./BlogsCard";
import { Pencil } from "lucide-react";
import { useBlog } from "../hooks";

export const Appbar = () => {
  const { id } = useParams();
  const { blog } = useBlog({ id: id || "" });
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
        <Avatar authorName={blog?.author.name || ""} size="w-9 h-9" />
      </div>
    </div>
  );
};
