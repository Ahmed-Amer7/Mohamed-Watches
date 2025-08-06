import { Link } from "react-router-dom";

import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import cart from "../assets/cart.png";

function Header() {
    return (
        <div className="flex flex-row justify-between items-center">
            <div className="cursor-pointer">
                <Link to="/" className="sm:text-[16px] font-primary">Mohamed Watches</Link>
            </div>
            <div className="flex flex-row sm:gap-4">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src={facebook} className="sm:w-5 sm:h-5 cursor-pointer" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src={twitter} className="sm:w-5 sm:h-5 cursor-pointer" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src={instagram} className="sm:w-5 sm:h-5 cursor-pointer" />
                </a>
            </div>
            <Link to="/cart" className="cursor-pointer">
                <img src={cart} className="sm:w-8 sm:h-8" />
            </Link>
        </div>
    )
}

export default Header;