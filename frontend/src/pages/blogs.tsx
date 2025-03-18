import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogsCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Appbar />
      <div className="max-w-5xl mx-auto my-10 flex gap-10 flex-col">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              context={blog.context}
              publishedDate={"31st jan 2022"}
            />
          ))
        ) : (
          <>
            <div className="flex min-h-screen justify-center items-center">
              No record
            </div>
          </>
        )}
      </div>
    </>
  );
};
