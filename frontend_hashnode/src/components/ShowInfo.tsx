import { toPng } from "html-to-image";
import { useRef, useState } from "react";
// import { Tilt } from "react-tilt";

const ShowInfo = ({ data }: any) => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(false);

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
        <>
            <div
                className="flex flex-col items-center justify-center w-[450px] h-[100vh] text-[#ffffff]"
                ref={elementRef}
            >
                <div
                    className="flex flex-col items-center justify-center h-full w-full m-1 text-center p-6 rounded-[30px]"
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
                                src={data.user.profilePicture}
                                alt="Profile"
                                className="rounded-full w-[310px] h-[310px] "
                            />
                        </div>
                        <div className=" z-10">
                            <div>
                                <h1 className="text-5xl mt-2 poor__font">
                                    {data.user.username}
                                </h1>
                            </div>

                            {/* <p className="text-lg font-semibold mt-2">
                        {data.user.bio.text}
                    </p> */}
                            <p className="text-lg font-semibold mt-2">
                                Followers: {data.user.followersCount}
                            </p>
                            <p className="text-lg font-semibold mt-2">
                                Following: {data.user.followingsCount}
                            </p>
                            <p className="text-lg font-semibold mt-2">
                                Date Joined: {data.user.dateJoined}
                            </p>
                            <p className="text-lg font-semibold mt-2">
                                {data.user.isPro}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <button
                className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white p-2 rounded-lg mt-2 absolute bottom-5 lg:bottom-1/2 lg:right-40"
                onClick={htmlToImageConvert}
            >
                {loading ? "Loading..." : "Download as Image"}
            </button>
        </>
    );
};

export default ShowInfo;
