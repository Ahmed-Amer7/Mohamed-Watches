import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useGetWatches } from "../../services/watches";
import { useEffect, useState } from "react";
import { PortableText } from '@portabletext/react';
import { urlFor } from "../../lib/sanity";

// === Toast Component ===
function Toast({ message }: { message: string }) {
    return (
        <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded shadow-md z-50 text-sm font-primary">
            {message}
        </div>
    );
}

// === PortableText Components ===
const components = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => {
      // Attempt to extract text content only for colon logic
      const plainText = Array.isArray(children)
        ? children.map((c) => (typeof c === 'string' ? c : '')).join('')
        : typeof children === 'string'
        ? children
        : '';

      if (!plainText.includes(':')) {
        return (
          <p className="font-primary font-extralight text-right mt-4">
            {children}
          </p>
        );
      }

      const [key, ...rest] = plainText.split(':');
      const value = rest.join(':').trim();

      return (
        <p className="text-right">
          <span className="font-primary">{key.trim()}:</span>{' '}
          <span className="font-primary font-extralight">{value}</span>
        </p>
      );
    },
  },
};

function WatchById() {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const { _id } = useParams();
    const { data: watches } = useGetWatches();

    const watch = watches?.find((watch) => watch._id === _id);

    const handleAddToCart = () => {
        if (!watch?._id) return;

        const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

        if (existingCart.includes(watch._id)) {
            setToastMessage("الساعة موجودة بالفعل في العلبة");
        } else {
            existingCart.push(watch._id);
            localStorage.setItem("cart", JSON.stringify(existingCart));
            setToastMessage("تم اضافة الساعة للعلبة");
        }

        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2000);
    };

    useEffect(() => {
        if (watch?.images?.length) {
            const urls = watch.images
                .filter((img) => img?.asset?._ref)
                .map((img) => urlFor(img).url());
            setImageUrls(urls);
            setSelectedImageUrl(urls[0]);
        }
    }, [watch]);

    const isAvailable = watch?.quantity && watch.quantity > 0;

    return (
        <div className="h-full w-full overflow-y-scroll bg-[#eeeeee] sm:p-5 relative">
            <Header />

            {/* Toast */}
            {toastVisible && <Toast message={toastMessage} />}

            {/* Main Image */}
            {selectedImageUrl && (
                <div className="w-full flex justify-center items-center mt-8">
                    <img
                        src={selectedImageUrl}
                        alt="Selected watch"
                        className="w-[180px] h-[200px] object-cover rounded shadow-md"
                    />
                </div>
            )}

            {/* Thumbnails */}
            <div className="w-full flex flex-row justify-center items-center mt-6 gap-4 flex-wrap">
                {imageUrls.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Thumbnail ${index + 1}`}
                        onClick={() => setSelectedImageUrl(url)}
                        className={`w-[60px] h-[70px] object-cover rounded cursor-pointer transition duration-200 ease-in-out ${
                            selectedImageUrl === url ? 'ring-2 ring-blue-500' : 'hover:opacity-80'
                        }`}
                    />
                ))}
            </div>

            {/* Title */}
            <div className="w-full flex justify-center items-center mt-4">
                <span className="font-primary">{watch?.title}</span>
            </div>

            {/* Watch Description */}
            <div dir="rtl" className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none mt-4 px-4">
                <PortableText value={watch?.body!} components={components} />
            </div>

            {/* Price and Order */}
            <div className="w-full flex flex-row mt-4">
                <div className="w-[70%] h-[80px] flex justify-around items-center">
                    <button
                        onClick={handleAddToCart}
                        disabled={!isAvailable}
                        className={`w-[200px] h-[70px] border-[1px] flex flex-col justify-center items-center transition-opacity duration-100 ${
                            isAvailable
                                ? 'bg-[#D9D9D9] cursor-pointer hover:opacity-90'
                                : 'bg-gray-300 cursor-not-allowed opacity-50'
                        }`}
                    >
                        <span className="font-primary text-[10px]">
                            {isAvailable ? "الساعة متوفرة" : "الساعة غير متوفرة"}
                        </span>
                        <span className="font-primary">اضف الى السلة</span>
                    </button>
                </div>
                <div className="w-[30%] h-[80px] flex flex-col justify-center items-end pr-4">
                    <span className="font-primary">السعر</span>
                    <span className="font-primary">${watch?.price.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}

export default WatchById;
