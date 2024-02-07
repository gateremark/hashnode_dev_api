import React from "react";
import { Post } from "./UserInfo.types";

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div
      className="h-fit bg-[#121212] rounded-3xl overflow-hidden w-full"
      title={post.title}
    >
      <a
        href={post.url}
        className="post-item_link p-5 block overflow-hidden relative flex-grow" // flex-grow to allow the content to expand
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="post-item_bg h-32 w-32 bg-[#cd3e94] z-10 absolute top-[-75px] right-[-75px] rounded-full transition-all duration-500 ease-in-out"></div>

        <h3
          className="post-item_title overflow-hidden text-ellipsis font-bold text-white text-xl z-20 relative"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            maxHeight: "4.5rem",
          }}
        >
          {post.title}
        </h3>
      </a>

      <div className="p-5 text-lg text-white z-20 relative">
        {" "}
        {/* Padding to match the top */}
        <span>Published: </span>
        <time className="font-bold text-[#cd3e94] transition-colors duration-500 ease-in-out">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </div>
    </div>
  );
};

export default PostItem;
