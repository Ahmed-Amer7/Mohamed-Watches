import { useEffect, useState } from "react";
import type { Category, SanityImage } from "../services/watches";
import { urlFor } from "../lib/sanity";
import { Link } from "react-router-dom";

interface Props {
    id: string;
    title: string;
    price: number;
    image: SanityImage;
    type: Category;
    range_filter: number[];
    watch_type_filter: string[];
}

function WatchComponent({ id, title, price, image, type, range_filter, watch_type_filter }: Props) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (image && image.asset?._ref) {
            const url = urlFor(image).url();
            setImageUrl(url);
        }
    }, [image]);

    if (price < range_filter[0] || price > range_filter[1]) {
        return null;
    }

    if (watch_type_filter.length > 0 && !watch_type_filter.includes(type)) {
        return null;
    }
    
    if (!imageUrl) return <div>Loading image...</div>;
    
    return (
        <Link to={`watch/${id}`} className="bg-white sm:h-[240px] sm:w-[98%] mx-auto flex flex-col gap-2 p-2 active:opacity-50 transition-opacity duration-100">
            <div className="sm:w-full sm:h-[400px] flex justify-center items-center">
                <img src={imageUrl} className="w-full h-[160px]" />
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-[10px] sm:h-[25px] font-primary font-light">{title}</span>
                <span className="text-[14px] sm:h-[20px] font-primary">${price.toLocaleString()}</span>
            </div>
        </Link>
    )
}

export default WatchComponent;