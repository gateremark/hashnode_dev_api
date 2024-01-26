import { toPng } from "html-to-image";
import { useRef, useState } from "react";

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
                className="flex flex-col items-center justify-center min-h-screen"
                ref={elementRef}
            >
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
            <div className="flex justify-center items-center">
                <button
                    className="bg-[#2563EB] text-white p-2 rounded-lg mt-2"
                    onClick={htmlToImageConvert}
                >
                    {loading ? "Loading..." : "Download"}
                </button>
            </div>
        </>
    );
};

export default ShowInfo;
