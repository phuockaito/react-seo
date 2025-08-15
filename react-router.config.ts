import type { Config } from "@react-router/dev/config";

export default {
    // Config options...
    // Server-side render by default, to enable SPA mode set this to `false`
    ssr: true,
    async prerender() {
        const response = await fetch("https://v2-api-kaito-music.vercel.app/api/music/top-views?_limit=50&_type=million");
        const { data } = await response.json();
        const paths = data.map((item: any) => `/${item.slug_name_music}`);
        return ["/", ...paths];
    },
} satisfies Config;
