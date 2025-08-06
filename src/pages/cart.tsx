import { useState } from "react";
import Header from "../components/Header";

import CartItem from "../components/CartItem";

function Cart() {
    const [name, setName] = useState("");
    const [isNameFocused, setIsNameFocused] = useState(false);

    const [phone, setPhone] = useState("");
    const [isPhoneFocused, setIsPhoneFocused] = useState(false);

    const [address, setAddress] = useState("");
    const [isAddressFocused, setIsAddressFocused] = useState(false);


    return (
        <div className="h-full w-full overflow-y-scroll bg-[#eeeeee] sm:p-5">

            {/* Headers */}

            <Header />

            {/* Title */}

            <div className="sm:mt-6 flex justify-center items-center">
                <span className="font-primary sm:text-[18px]">السلة</span>
            </div>

            {/* Items in Cart (TEMPORARY) */}

            <div className="w-full flex flex-col justify-center items-center mt-2">
                <CartItem name="Audemars Piguet Royal Oak Panda" />
                <CartItem name="Rolex Cosmograph Daytona Panda Dial" />
            </div>

            {/* Separator */}

            <div className="w-[250px] bg-black h-[2px] flex mx-auto mt-8"></div>

            {/* Inputs */}

            <div className="w-full flex flex-col gap-y-4 mt-10">
                <div className="w-full h-[60px] bg-[#D9D9D9] relative">
                    <input className="w-full h-full text-end p-4 font-primary font-light" value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setIsNameFocused(true)} onBlur={() => setIsNameFocused(false)} />
                    <span className={`absolute right-4 top-2 font-primary font-light ${isNameFocused || name.length > 0 ? "invisible" : ""}`}>الاسم</span>
                </div>
                <div className="w-full h-[60px] bg-[#D9D9D9] relative">
                    <input className="w-full h-full text-end p-4 font-primary font-light" value={phone} onChange={(e) => setPhone(e.target.value)} onFocus={() => setIsPhoneFocused(true)} onBlur={() => setIsPhoneFocused(false)} />
                    <span className={`absolute right-4 top-2 font-primary font-light ${isPhoneFocused || phone.length > 0 ? "invisible" : ""}`}>رقم الهاتف</span>
                </div>
                <div className="w-full h-[60px] bg-[#D9D9D9] relative">
                    <input className="w-full h-full text-end p-4 font-primary font-light" value={address} onChange={(e) => setAddress(e.target.value)} onFocus={() => setIsAddressFocused(true)} onBlur={() => setIsAddressFocused(false)} />
                    <span className={`absolute right-4 top-2 font-primary font-light ${isAddressFocused || address.length > 0 ? "invisible" : ""}`}>العنوان</span>
                </div>
            </div>

            {/* Button */}

            <div className="w-full flex justify-center mt-8">
                <div className="cursor-pointer w-[300px] h-[80px] bg-[#D9D9D9] flex justify-center items-center border-[1px] active:bg-[#AAAAAA] transition duration-200">
                    <span className="font-primary text-[20px]">تثبيت الطلب</span>
                </div>
            </div>
        </div>
    )
}

export default Cart;