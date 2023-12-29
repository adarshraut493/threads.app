"use client" // used for client side rendering  because we are using a hook 
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname, } from 'next/navigation'; // to check whether the url is working or not 
function Bottombar(){
    
    const pathname = usePathname();
    return (
        <section className="bottombar">
            <div className="bottombar_container">
            {sidebarLinks.map((link) => {                //map function take 1 element at time or looping 
                    const isActive = (pathname.includes
                        (link.route) && link.route.length > 1) || pathname === link.route;  // > 1 means its not just home

                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`bottombar_link ${isActive && 'bg-primary-500'}`}
                        >
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                width={24}
                                height={24}
                            />
                            <p className="text-subtle-medium 
                            text-light-1  max-sm:hidden"> 
                            {link.label.split(/\s+/)[0] }</p>

                        </Link>

                    )
                })}
            </div>

        </section>
    )
}
export default Bottombar ;