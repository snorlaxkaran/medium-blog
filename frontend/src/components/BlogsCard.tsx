import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  context: string;
  publishedDate?: string;
  id?: string;
}

export const BlogCard = ({
  authorName,
  title,
  context,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-slate-200 border-b-2 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Avatar authorName={authorName} size="w-7 h-7" />
          <p className="text-sm font-medium text-neutral-600">
            {authorName} - {publishedDate}
          </p>
        </div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <h2 className="text-lg">{context.slice(0, 100) + "..."}</h2>
        <p className="text-neutral-500 mb-3">{`${Math.ceil(
          context.length / 100
        )} min read`}</p>
      </div>
    </Link>
  );
};

export const Avatar = ({
  authorName,
  size,
}: {
  authorName: string;
  size: string;
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
    >
      <span className="text-[10px] font-semibold text-gray-600 dark:text-gray-300">
        {authorName.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
};
