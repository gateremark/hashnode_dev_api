import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

const GET_PUBLICATION = gql`
    query Query($host: String!) {
        publication(host: $host) {
            isTeam
            title
            about {
                markdown
            }
            posts(first: 10) {
                edges {
                    node {
                        title
                        brief
                        url
                    }
                }
            }
        }
    }
`;

function Publication() {
    const [host, setHost] = useState("gateremark.hashnode.dev");
    const { loading, error, data, refetch } = useQuery(GET_PUBLICATION, {
        variables: { host },
    });

    if (loading) return <p className="text-center mt-6 text-lg">Loading...</p>;
    if (error)
        return (
            <p className=" text-xl font-semibold ml-2 mt-2">
                Error...{" "}
                <span className=" italic">localhost:4000 not found</span>{" "}
            </p>
        );

    const handleInputChange = (event: any) => {
        setHost(event.target.value);
        refetch();
    };

    return (
        <div className="flex flex-col text-center gap-6">
            <input
                type="text"
                value={host}
                onChange={handleInputChange}
                className="my-2"
                placeholder="Enter host url"
            />
            <div className=" font-semibold text-2xl">
                {data.publication.title}
            </div>
            <div className=" text-lg">{data.publication.about.markdown}</div>
            <div className=" flex w-full gap-4 px-6 flex-wrap mt-6">
                {data.publication.posts.edges.map((post: any, index: any) => (
                    <div key={index}>
                        <h2 className="font-bold">{post.node.title}</h2>
                        <p>{post.node.brief}</p>
                        <a
                            href={post.node.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Read more
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Publication;
