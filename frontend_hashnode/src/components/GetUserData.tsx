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
    // if (error)
    //     return (
    //         <p className=" text-xl font-semibold ml-2 mt-2">
    //             Error...{" "}
    //             <span className=" italic">localhost:4000 not found</span>{" "}
    //         </p>
    //     );

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setUsername(inputValue);
        refetch()
            .then(() => console.log("Refetching!"))
            .catch((err) => console.log(err));
    };

    // console.log("data2: ", data);
    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg">
            <div className="absolute inset-0 -z-10 h-full w-full bg-[#2563EB] bg-[radial-gradient(#7ba0f2_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {loading && (
                <div className="flex justify-center items-center h-screen absolute z-20">
                    {" "}
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#ffffff]"></div>
                </div>
            )}
            {error && error?.message === "Username is required" && (
                <p className=" text-xl font-semibold ml-2 mt-2 text-[#2563EB] p-2">
                    Enter Your Hashnode username!
                </p>
            )}

            {error && error?.message !== "Username is required" && (
                <p className=" text-xl font-semibold ml-2 mt-2 text-[#2563EB] p-2">
                    User not found!
                </p>
            )}

            {data ? (
                <ShowInfo data={data} />
            ) : (
                <>
                    <div className="flex flex-col items-center justify-center">
                        <form
                            action=""
                            onSubmit={handleSubmit}
                            className=" flex flex-col w-full p-6 gap-4"
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
                                className="bg-[#2563EB] text-white rounded-md p-2"
                            >
                                Generate Worth
                            </button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

export default User;
