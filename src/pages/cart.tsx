import { useEffect, useState } from "react";
import Header from "../components/Header";
import CartItem from "../components/CartItem";
import { useGetWatches } from "../services/watches";

function Cart() {
    const [name, setName] = useState("");
    const [isNameFocused, setIsNameFocused] = useState(false);

    const [phone, setPhone] = useState("");
    const [isPhoneFocused, setIsPhoneFocused] = useState(false);

    const [address, setAddress] = useState("");
    const [isAddressFocused, setIsAddressFocused] = useState(false);

    const [email, setEmail] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    const { data: watches } = useGetWatches();

    const [cartItems, setCartItems] = useState<any[]>([]);

    const handlePlaceOrder = async () => {
        if (cartItems.length === 0) {
            alert("سلة التسوق فارغة. يرجى إضافة ساعات لإتمام الطلب.");
            return;
        }

        const invalidItem = cartItems.find(item => item.quantity <= 0);
        if (invalidItem) {
            alert(`العنصر "${invalidItem.title}" يحتوي على كمية غير صالحة. يرجى تعديلها قبل إتمام الطلب.`);
            return;
        }

        if (name.length <= 0) {
            alert(`املئ الاسم`);
            return;
        }

        if (email.length <= 0) {
            alert(`املئ الايميل`)
            return;
        }

        if (phone.length <= 0) {
            alert(`املئ رقم الهاتف`)
            return;
        }

        if (address.length <= 0) {
            alert(`املئ العنوان`)
            return;
        }

        const emailContent = `
            <h2>New Order</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Email:</strong> ${email}</p>
            <h3>Items:</h3>
            <ul>
            ${cartItems.map(item => `<li>${item.title} (Qty: ${item.quantity})</li>`).join("")}
            </ul>
        `;

        try {
            const response = await fetch("/.netlify/functions/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    to: email,
                    subject: "Order Confirmation",
                    htmlContent: emailContent,
                }),
            });

            const response2 = await fetch("/.netlify/functions/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    to: "mohamed.watches0@gmail.com",
                    subject: "Order Confirmation",
                    htmlContent: emailContent,
                }),
            });

            const data = await response.json();
            const data2 = await response2.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to send email");
            }

            if (!response2.ok) {
                throw new Error(data2.message || "Failed to send email");
            }

            alert("Order placed and email sent successfully!");

            localStorage.removeItem("cart");
            setCartItems([]);
            setName("");
            setPhone("");
            setAddress("");
            setEmail("");

        } catch (error: any) {
            console.error("Order placement error:", error);
            alert("Error placing order: " + (error.message || "Unknown error"));
        }
    };

    const handleRemove = (id: string) => {
        // Remove from localStorage
        const cartIds: string[] = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCart = cartIds.filter(cartId => cartId !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Update local state
        setCartItems((prev) => prev.filter(item => item._id !== id));
    };

    useEffect(() => {
        // Get cart IDs from localStorage
        const cartIds: string[] = JSON.parse(localStorage.getItem("cart") || "[]");

        if (watches && watches.length) {
            // Filter watches to only those in cart
            const itemsInCart = watches.filter(watch => cartIds.includes(watch._id));
            setCartItems(itemsInCart);
        }
    }, [watches]);

    return (
        <div className="h-full w-full overflow-y-scroll bg-[#eeeeee] sm:p-5">

            {/* Headers */}

            <Header />

            {/* Title */}

            <div className="sm:mt-6 flex justify-center items-center">
                <span className="font-primary sm:text-[18px]">السلة</span>
            </div>

            {/* Separator */}

            <div className="w-[200px] bg-black h-[2px] flex mx-auto mt-8"></div>

            {/* Items in Cart */}
            <div className="w-full flex flex-col justify-center items-center mt-2">
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <CartItem onRemove={handleRemove} key={item._id} image={item.images?.[0]} id={item._id} name={item.title} />
                    ))
                ) : (
                    <p className="font-primary text-center mt-4">السلة فارغة</p>
                )}
            </div>

            {/* Separator */}

            <div className="w-[200px] bg-black h-[2px] flex mx-auto mt-8"></div>

            {/* Inputs */}

            <div className="w-full flex flex-col gap-y-4 mt-10">
                <div className="w-full h-[60px] bg-[#D9D9D9] relative">
                    <input
                        className="w-full h-full text-end px-4 font-light text-[20px]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setIsNameFocused(true)}
                        onBlur={() => setIsNameFocused(false)}
                    />
                    <span className={`absolute right-4 top-2 font-primary font-light ${isNameFocused || name.length > 0 ? "invisible" : ""}`}>الاسم</span>
                </div>
                <div className="w-full h-[60px] bg-[#D9D9D9] relative">
                    <input
                        className="w-full h-full text-end px-4 font-light text-[20px]"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onFocus={() => setIsPhoneFocused(true)}
                        onBlur={() => setIsPhoneFocused(false)}
                    />
                    <span className={`absolute right-4 top-2 font-primary font-light ${isPhoneFocused || phone.length > 0 ? "invisible" : ""}`}>رقم الهاتف</span>
                </div>
                <div className="w-full h-[60px] bg-[#D9D9D9] relative">
                    <input
                        className="w-full h-full text-end px-4 font-light text-[20px]"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onFocus={() => setIsAddressFocused(true)}
                        onBlur={() => setIsAddressFocused(false)}
                    />
                    <span className={`absolute right-4 top-2 font-primary font-light ${isAddressFocused || address.length > 0 ? "invisible" : ""}`}>العنوان</span>
                </div>
                <div className="w-full h-[60px] bg-[#D9D9D9] relative">
                    <input
                        className="w-full h-[60px] text-end px-4 text-[20px] font-light"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setIsEmailFocused(true)}
                        onBlur={() => setIsEmailFocused(false)}
                    />
                    <span className={`absolute right-4 top-2 font-primary font-light ${isEmailFocused || email.length > 0 ? "invisible" : ""}`}>الايميل</span>
                </div>
            </div>

            {/* Button */}

            <div className="w-full flex justify-center mt-8">
                <div onClick={handlePlaceOrder} className="cursor-pointer w-[300px] h-[80px] bg-[#D9D9D9] flex justify-center items-center border-[1px] active:bg-[#AAAAAA] transition duration-200">
                    <span className="font-primary text-[20px]">تثبيت الطلب</span>
                </div>
            </div>
        </div>
    );
}

export default Cart;
