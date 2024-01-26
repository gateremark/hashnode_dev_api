/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                custom: "-0.1rem 1.7rem 6.6rem -3.2rem rgba(0, 0, 0, 0.5)",
                customhover:
                    "-0.1rem 1.7rem 6.6rem -3.2rem rgba(0, 0, 0, 0.75)",
                "inside-page":
                    "inset 20rem 0px 5rem -2.5rem rgba(0, 0, 0, 0.25)",
            },
        },
    },
    plugins: [],
};
