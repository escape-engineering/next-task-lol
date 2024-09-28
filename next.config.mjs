/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        // https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${cham.id}.png
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ddragon.leagueoflegends.com",
                port: "",
                pathname: "/cdn/14.19.1/img/champion/**",
            },
        ],
    },
};

export default nextConfig;
