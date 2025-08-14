import { Link } from "react-router";
import type { Route } from "./+types/music";

interface Music {
    link_mv: string;
    sum_comment: number;
    view: number;
    favorite: number;
    createdAt: string;
    updatedAt: string;
    _id: string;
    id_account: string;
    name_singer: string;
    slug_name_singer: string;
    src_music: string;
    image_music: string;
    time_format: string;
    seconds: number;
    name_music: string;
    slug_name_music: string;
    category: string;
    slug_category: string;
    subscribe: string;
    slug_subscribe: string;
    slug_alias: string;
}

export function meta({ loaderData, params }: Route.MetaArgs) {
    const music = (loaderData as { data?: Music | null } | undefined)?.data;
    const hasMusic = Boolean(music);
    const computedTitle = hasMusic ? `${(music as Music).name_music} - ${(music as Music).name_singer}` : "Kaito Music";
    const computedDescription = hasMusic ? `${(music as Music).name_music} - ${(music as Music).name_singer}` : "Kaito Music";
    return [
        { title: computedTitle },
        { name: "description", content: computedDescription },
        { name: "og:image", content: (music as Music | undefined)?.image_music ?? "" },
        { name: "og:title", content: hasMusic ? computedTitle : "" },
        { name: "og:description", content: hasMusic ? computedDescription : "" },
        { name: "og:url", content: (music as Music | undefined)?.slug_name_music ?? "" },
        { name: "og:type", content: "website" },
        { name: "og:site_name", content: "Kaito Music" },
        { name: "og:locale", content: "en_US" },
    ];
}
export async function loader(props: Route.ClientLoaderArgs) {
    const response = await fetch(`https://v2-api-kaito-music.vercel.app/api/music/get-music-name?_name=${props.params.id}`);
    const data = await response.json();
    return data;
}

export function HydrateFallback() {
    return <div>Loading...</div>;
}


export default function Home(props: Route.ComponentProps) {
    const music: Music | null | undefined = props.loaderData?.data as Music | null | undefined;
    if (!music) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Link to="/" className="text-blue-500">Home</Link>
                <h1>Music not found</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Link to="/" className="text-blue-500">Home</Link>
            <h1>{music.name_music}</h1>
            <p>{music.name_singer}</p>
            <img src={music.image_music} width={100} height={100} alt={music.name_music} />
            <audio src={music.src_music} controls />
        </div>
    );
}
