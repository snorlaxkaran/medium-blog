import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { Avatar } from "../components/BlogsCard";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Appbar />

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto my-20">
        <div className=" flex items-center justify-center">
          <article className="max-w-2xl w-full ">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              {blog?.title}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-medium text-gray-900">
                    {blog?.author.name}
                  </h2>
                  <button className="text-sm font-medium text-green-600 hover:text-green-700">
                    Follow
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>6 min read</span>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <span>Oct 11, 2024</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-gray-700 text-lg">{blog?.context}</p>
            </div>
          </article>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Avatar
              authorName={blog?.author.name || "Anonymous"}
              size="w-9 h-9"
            />
            <h2 className="font-medium text-gray-900 text-lg">
              {blog?.author.name}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};
