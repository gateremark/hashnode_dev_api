interface NavProps {
    title: string;
}

const Nav = ({ title }: NavProps) => {
    return (
        <div className="h-32 sm:h-fit md:h-40 lg:h-44 xl:h-48 bg-black text-white flex justify-center items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            <h1 className="p-4 font-light flex flex-col gap-2 items-center md:block">
                {title}
            </h1>
        </div>
    );
};

export default Nav;
