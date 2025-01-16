/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#000000",
				backgroundPrimary: "#ffffff",
				backgroundPrimaryHover: "#ede7f6",
			},
			fontFamily: {
				body: "Zoho Puvi",
			},
		},
	},
	plugins: [],
};

