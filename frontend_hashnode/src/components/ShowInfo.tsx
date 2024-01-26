const ShowInfo = ({ data }: any) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
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
};

export default ShowInfo;
