import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Home Page" },
        { name: "description", content: "Home Page" },
    ];
}

export async function loader() {
    const response = await fetch("https://v2-api-kaito-music.vercel.app/api/music/top-views?_limit=50&_type=million");
    const { data } = await response.json();
    return data;
}
export function HydrateFallback() {
    return <div>Loading...</div>;
}


export default function Home(props: Route.ComponentProps) {

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {props.loaderData.map((item: any) => (
                    <Link
                        key={item._id}
                        to={`/${item.slug_name_music}`}
                        className="flex flex-col items-center justify-center"
                    >


                        {item.name_music}
                        <img src={item.image_music} width={100} height={100} alt={item.name_music} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
