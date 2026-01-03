import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';

function Footer() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    return (
        // "mt-auto" ensures footer stays at bottom even if content is short
        // "rounded-t-3xl" gives the playful curved top edge
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded-t-3xl mt-auto shadow-inner">
            
            {/* Social Media Section */}
            <div className="grid grid-flow-col gap-6">
                
                <a className="btn btn-ghost btn-circle text-3xl text-blue-600 hover:bg-blue-100 hover:scale-110 transition-all duration-300">
                    <BsFacebook />
                </a>
                
                <a className="btn btn-ghost btn-circle text-3xl text-pink-500 hover:bg-pink-100 hover:scale-110 transition-all duration-300">
                    <BsInstagram />
                </a>
                
                <a className="btn btn-ghost btn-circle text-3xl text-blue-700 hover:bg-blue-100 hover:scale-110 transition-all duration-300">
                    <BsLinkedin />
                </a>
                
                <a className="btn btn-ghost btn-circle text-3xl text-sky-400 hover:bg-sky-100 hover:scale-110 transition-all duration-300">
                    <BsTwitter />
                </a>
            </div>

            {/* Copyright Text */}
            <div>
                <p className="font-bold text-lg text-primary opacity-80">
                    Copyright © {year} - All rights reserved
                </p>
                <p className="text-sm font-medium text-secondary">
                    🚀 Learning made fun!
                </p>
            </div>
        </footer>
    );
}

export default Footer;