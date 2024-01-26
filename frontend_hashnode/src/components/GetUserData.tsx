import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import ShowInfo from "./ShowInfo";

const GET_USER = gql`
    query User($username: String!) {
        user(username: $username) {
            username
            name
            profilePicture
            bio {
                markdown
                html
                text
            }
            socialMediaLinks {
                website
                github
                twitter
                instagram
                facebook
                stackoverflow
                linkedin
                youtube
            }
            badges {
                id
                name
                description
                image
                dateAssigned
                infoURL
                suppressed
            }
            followersCount
            followingsCount
            dateJoined
            isPro
        }
    }
`;

function User() {
    const [username, setUsername] = useState("");
    const [inputValue, setInputValue] = useState(username);
    const { loading, error, data, refetch } = useQuery(GET_USER, {
        variables: { username },
    });

    // if (loading) return <p className="text-center mt-6 text-lg">Loading...</p>;
    if (error && error.message.includes("Server Error"))
        return (
            <p className=" text-xl font-semibold ml-2 mt-2 text-[#ff2424] p-2">
                {`${error.message} User not found!`}
            </p>
        );

    // if (error && error.message.includes("Username is required"))
    //     return error.message, "User not found!";

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setUsername(inputValue);
        refetch()
            .then(() => console.log("Refetching!"))
            .catch((err) => console.log(err));
    };

    // console.log("data2: ", data);
    return (
        <div className="flex flex-col items-center justify-center rounded-lg">
            <div className="absolute inset-0 -z-10 h-full w-full bg-[#2563EB] bg-[radial-gradient(#7ba0f2_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* {error && error?.message === "Username is required" && (
                <p className=" text-xl font-semibold ml-2 mt-2 text-[#2563EB] p-2">
                    Enter Your Hashnode username!
                </p>
            )} */}

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
                                            src="https://res.cloudinary.com/dvuazircp/video/upload/v1706302205/hashvid_x0pxxu.webm"
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
                                        onChange={(e) =>
                                            setInputValue(e.target.value)
                                        }
                                        className="border border-slate-400 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-transparent"
                                        placeholder="Enter username"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-[#2563EB] text-white rounded-md p-2"
                                    >
                                        {!loading
                                            ? "Generate Worth"
                                            : "Loading..."}
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
