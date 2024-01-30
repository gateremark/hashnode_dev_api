import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Tilt } from "react-tilt";

const ShowInfo = ({ data }: any) => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(false);

    const profilePicture = data.user.profilePicture;
    const username = data.user.username;
    const followers =
        data.user.followersCount > 1000
            ? (data.user.followersCount / 1000).toFixed(1) + "K"
            : data.user.followersCount;
    // const following = data.user.followingsCount;
    const isPro = data.user.isPro;
    const badges = data.user.badges;
    const posts = data.user.posts.edges;
    // const views = data.user.posts.nodes;

    //  FUNCTION TO CONVERT HTML TO IMAGE
    const htmlToImageConvert = () => {
        setLoading(true);
        try {
            if (elementRef.current) {
                toPng(elementRef.current, { cacheBust: false })
                    .then((dataUrl) => {
                        const link = document.createElement("a");
                        link.download = "hashnodedev.png";
                        link.href = dataUrl;
                        link.click();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        } catch (error) {
            console.error("Error converting to image:", error);
        }
    };
    return (
        <div className="md:grid md:grid-cols-2 w-full h-full grid-cols-1">
            {/* ------------------------------------- */}
            <div className=" flex flex-col items-center justify-center">
                <h1 className="text-6xl poor__font text-[#ffffff]">
                    {" "}
                    Latest Blogs
                </h1>
                <div className="grid grid-cols-2 p-4 gap-4">
                    {posts.map((p: any) => (
                        <div
                            key={p.node.title}
                            className="ag-courses_item h-fit bg-[#121212] rounded-3xl overflow-hidden w-full"
                            title={p.node.title}
                        >
                            <a
                                href={p.node.url}
                                className="ag-courses-item_link p-5 block overflow-hidden relative"
                                target="_blank"
                            >
                                <div
                                    className={`ag-courses-item_bg h-32 w-32 bg-[#cd3e94] z-10 absolute top-[-75px] right-[-75px] rounded-full transition-all duration-500 ease-in-out`}
                                ></div>

                                <div
                                    className="ag-courses-item_title overflow-hidden text-ellipsis font-bold text-[#ffffff] text-xl z-20 relative"
                                    style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: "2",
                                        WebkitBoxOrient: "vertical",
                                    }}
                                >
                                    {p.node.title}
                                </div>

                                <div className="ag-courses-item_date-box flex gap-1 pt-5 text-lg text-[#ffffff] z-20 relative">
                                    Published:
                                    <span className="ag-courses-item_date font-bold text-[#cd3e94] transition-colors duration-500 ease-in-out">
                                        {new Date(
                                            p.node.publishedAt
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* --------------------------------------- */}
            <Tilt
                className="flex flex-col items-center justify-center w-[450px] h-[100vh] text-[#ffffff] z-50"
                ref={elementRef}
            >
                <div
                    className="flex flex-col items-center justify-center h-full w-full text-center p-6 rounded-[30px]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, rgba(0, 198, 255, 0.6), rgba(0, 114, 255, 0.6)), url(backg.svg)",
                    }}
                >
                    <div
                        className="relative flex flex-col items-center h-full w-full p-2 text-center bg-[#0E1217] rounded-2xl overflow-hidden"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(14,18,23,0.9), rgba(14,18,23,0.7)), url(grid.svg)",
                        }}
                    >
                        <div className="absolute top-28 -right-10 rounded-full w-80 h-80 bg-[#66ACFF]">
                            <img
                                src={profilePicture}
                                alt="Profile"
                                className="rounded-full w-[310px] h-[310px] "
                            />
                        </div>
                        <div className=" z-10">
                            <div className="flex items-center mt-2 gap-20">
                                <img
                                    src="hashnode-icon.webp"
                                    alt="hashnode"
                                    className=" w-16 h-16 border border-slate-600 rounded-3xl p-3"
                                />

                                <h1 className="text-4xl acme__font flex items-center justify-center gap-1">
                                    @{username}
                                    {isPro ? (
                                        <RiVerifiedBadgeFill
                                            className="inline-block text-blue-500"
                                            size={30}
                                            title="Hashnode Pro User"
                                        />
                                    ) : (
                                        ""
                                    )}
                                </h1>
                            </div>

                            {/* <p className="text-lg font-semibold mt-2">
                                    {data.user.bio.text}
                                </p> */}
                            <div className="absolute bottom-28 left-5 flex flex-col text-start">
                                <p className="text-4xl font-semibold mt-2 flex flex-col justify-start">
                                    {followers}{" "}
                                    <span className=" font-normal text-2xl">
                                        followers
                                    </span>
                                </p>
                                {/* <p className="text-lg font-semibold mt-2">
                                        Following: {following}
                                    </p> */}
                                {/* <p className="text-lg font-semibold mt-2">
                                        Date Joined: {dateJoined}
                                    </p> */}
                                <p className="text-base mt-2">Badges</p>

                                <div className="flex gap-2">
                                    {badges.map((badge: any) => (
                                        <img
                                            key={badge.id}
                                            src={badge.image}
                                            alt={badge.name}
                                            className="w-10 h-10"
                                            title={badge.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Tilt>

            <button
                className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white p-2 rounded-lg mt-2 absolute bottom-5 right-1/2 lg:bottom-1/2 lg:right-10"
                onClick={htmlToImageConvert}
            >
                {loading ? "Loading..." : "Download DevCard"}
            </button>
        </div>
    );
};

export default ShowInfo;
