import { useEffect, useState } from "react";
import remove from "../assets/remove.png";
import { type SanityImage } from "../services/watches";
import { urlFor } from "../lib/sanity";

interface Props {
    name: string;
    id: string; 
    onRemove: (id: string) => void;
    image: SanityImage;
}

function CartItem({ id, name, image, onRemove }: Props) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (image && image.asset?._ref) {
            const url = urlFor(image).url();
            setImageUrl(url);
        }
    }, [image]);

    return (
        <div className="w-full flex flex-row justify-center items-center gap-4 px-2">
            <div onClick={() => onRemove(id)} className="cursor-pointer">
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