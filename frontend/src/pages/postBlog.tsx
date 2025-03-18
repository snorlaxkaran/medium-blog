import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";

export const PostBlogs = () => {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const navigate = useNavigate();

  async function submit() {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        context,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    navigate("/blogs");

    console.log(res);
  }

  return (
    <>
      <Appbar />
      <div className="max-w-5xl mx-auto my-14 flex flex-col">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="placeholder:text-7xl p-4 text-7xl text-slate-600 font-bold roboto-semibold outline-none"
        />
        <input
          type="text"
          placeholder="Context"
          onChange={(e) => setContext(e.target.value)}
          className="placeholder:text-5xl p-4 text-5xl text-slate-600 font-bold roboto-bold outline-none"
        />
        <button
          onClick={submit}
          className="bg-slate-300/20 text-3xl roboto-semibold py-6 text-neutral-600"
        >
          Create post
        </button>
      </div>
    </>
  );
};
