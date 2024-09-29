/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        // https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${cham.id}.png
        // https://ddragon.leagueoflegends.com/cdn/14.19.1/img/spell/${spell.id}.png
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ddragon.leagueoflegends.com",
                port: "",
                pathname: "**",
            },
            // {
            //     protocol: "https",
            //     hostname: "ddragon.leagueoflegends.com",
            //     port: "",
            //     pathname: "/cdn/14.19.1/img/champion/**",
            // },
            // {
            //     protocol: "https",
            //     hostname: "ddragon.leagueoflegends.com",
            //     port: "",
            //     pathname: "/cdn/img/champion/splash/**_**.jpg",
            // },
            // {
            //     protocol: "https",
            //     hostname: "ddragon.leagueoflegends.com",
            //     port: "",
            //     pathname: "/cdn/14.19.1/img/spell/**.png",
            // },
        ],
    },
};

export default nextConfig;
