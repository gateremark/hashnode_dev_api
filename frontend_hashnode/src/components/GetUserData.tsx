import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

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
    const [username, setUsername] = useState("gateremark");
    const [inputValue, setInputValue] = useState(username);
    const { loading, error, data, refetch } = useQuery(GET_USER, {
        variables: { username },
    });

    if (loading) return <p className="text-center mt-6 text-lg">Loading...</p>;
    if (error)
        return (
            <p className=" text-xl font-semibold ml-2 mt-2">
                Error...{" "}
                <span className=" italic">localhost:4000 not found</span>{" "}
            </p>
        );

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setUsername(inputValue);
        refetch()
            .then(() => console.log("Refetching!"))
            .catch((err) => console.log(err));
    };

    console.log("data2: ", data);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center">
                <form action="" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="border-2 border-black p-2 rounded-md"
                        placeholder="Enter username"
                    />
                    <button
                        type="submit"
                        className="border-2 border-black p-2 rounded-md mt-2"
                    >
                        Submit
                    </button>
                </form>
            </div>

            <div className="flex flex-col items-center justify-center">
                <img
                    src={data.user.profilePicture}
                    alt="Profile"
                    className="rounded-full w-48 h-48"
                />
                <h1 className="text-2xl font-semibold mt-2">
                    {data.user.name}
                </h1>
                <p className="text-lg font-semibold mt-2">
                    {data.user.username}
                </p>
                <p className="text-lg font-semibold mt-2">
                    {data.user.bio.text}
                </p>
                <p className="text-lg font-semibold mt-2">
                    {data.user.followersCount}
                </p>
                <p className="text-lg font-semibold mt-2">
                    {data.user.followingsCount}
                </p>
                <p className="text-lg font-semibold mt-2">
                    {data.user.dateJoined}
                </p>
                <p className="text-lg font-semibold mt-2">{data.user.isPro}</p>
            </div>
        </div>
    );
}

export default User;