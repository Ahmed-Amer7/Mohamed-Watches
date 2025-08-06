import { useEffect, useState } from "react";
import remove from "../assets/remove.png";
import { useGetWatches, type SanityImage } from "../services/watches";
import { urlFor } from "../lib/sanity";

interface Props {
    name: string;
    image?: SanityImage;
}

function CartItem({ name }: Props) {
    let { data: watches } = useGetWatches();

    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (watches?.[0].images?.[0] && watches?.[0]?.images?.[0].asset?._ref) {
            const url = urlFor(watches?.[0].images?.[0]).url();
            setImageUrl(url);
        }
    }, [watches?.[0].images?.[0]]);

    return (
        <div className="w-full flex flex-row justify-center items-center gap-4 px-4">
            <div>
                <img src={remove} className="w-6 h-6" />
            </div>
            <div className="text-center w-[300px]">
                <span className="font-primary text-center text-[14px]">{name}</span>
            </div>
            <div className="h-[70px] w-[60px] flex justify-center items-center">
                <img src={imageUrl!} />
            </div>
        </div>
    )
}

export default CartItem;