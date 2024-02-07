import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import ShowInfo from "./ShowInfo";

const GET_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      username
      profilePicture
      badges {
        id
        name
        image
      }
      followersCount
      isPro
      posts(page: 1, pageSize: 6) {
        edges {
          node {
            title
            url
            publishedAt
          }
        }
      }
      tagsFollowing {
        name
        logo
      }
      location
      socialMediaLinks {
        github
        twitter
      }
    }
  }
`;

function User() {
  const [inputValue, setInputValue] = useState("");

  // Replace useQuery with useLazyQuery to avoid automatic query execution
  const [getUser, { loading, data, error }] = useLazyQuery(GET_USER);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getUser({ variables: { username: inputValue } }); // Trigger query manually with updated username
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg w-full h-fit">
      <div className="absolute inset-0 -z-10 min-h-[180vh] xl:min-h-[110vh] min-w-[70vh] bg-[#2563EB] bg-[radial-gradient(#7ba0f2_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {error && (
        <p className=" text-xl font-semibold ml-2 mt-2 text-[#ffffff] p-2">
          {error.message.includes("Username is required") &&
            "Enter Your Hashnode username!"}
        </p>
      )}

      {data ? (
        <ShowInfo data={data} />
      ) : (
        <section className="flex items-center h-full w-full justify-center">
          <div className="card bg-[rgba(0,0,0,0.05)] h-60 w-60 relative shadow-custom hover:shadow-customhover hover:w-[30rem]">
            <div className="flip-card h-60 w-60 absolute right-0 invisible z-50">
              <div className="flip-card__container visible h-full w-full absolute right-0 origin-left">
                <div className="absolute inset-0 transform rotate-y-180 backface-hidden">
                  <video
                    className="video__container h-auto min-h-full object-cover w-full"
                    autoPlay
                    muted
                    loop
                  >
                    <source
                      className=""
                      src="https://res.cloudinary.com/dvuazircp/video/upload/v1706462393/vidhashdev_vqtcjs.webm"
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>
            </div>

            <div className="inside-page bg-[#fafbfa] h-full p-4 absolute right-0 w-60 z-10">
              <div className="relative flex flex-col text-center h-full w-full items-center">
                <form
                  action=""
                  onSubmit={handleSubmit}
                  className=" flex flex-col w-full p-4 gap-4"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="border border-slate-400 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-transparent"
                    placeholder="Enter username"
                  />
                  <button
                    type="submit"
                    className={`bg-[${
                      !loading ? "#2563EB" : "#2563EB50"
                    }] text-white rounded-md p-2`}
                    disabled={loading}
                    title="Submit"
                  >
                    {!loading ? "Go! Go! Dev!" : "Loading..."}
                  </button>
                </form>

                {loading && (
                  <div className="flex justify-center items-start h-screen z-20">
                    {" "}
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#2563EB]"></div>
                  </div>
                )}
                <span className=" italic absolute bottom-0">
                  by{" "}
                  <a
                    href="https://github.com/gateremark"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#2563EB]"
                  >
                    gateremark
                  </a>
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default User;
