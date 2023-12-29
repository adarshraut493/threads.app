"use client" // used for client side rendering  because we are using a hook 
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher, SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";

import { usePathname, useRouter, } from 'next/navigation'; // to check whether the url is working or not 

function LeftSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const { userId } = useAuth();
    return (
        <section className="custom-scrollbar leftsidebar">
            <div className="flex  flex-1 flex-col gap-6 px-6">

                {sidebarLinks.map((link) => {                //map function take 1 element at time or looping 
                    const isActive = (pathname.includes
                        (link.route) && link.route.length > 1) || pathname === link.route;  // > 1 means its not just home

                        if(link.route === '/profile') link.route = `${link.route}/${userId}`

                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
                        >
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                width={24}
                                height={24}
                            />
                            <p className="text-light-1 max-lg:hidden"> {link.label}</p>

                        </Link>

                    )
                })}

            </div>

            <div className="mt-10 px-6">

                <SignOutButton signOutCallback={() => router.push('/sign-in')}>



                    <div className="flex cursor-pointer gap-4 p-4">
                        <Image
                            src="/assets/logout.svg"
                            alt="logout"
                            width={24}
                            height={24}
                        />

                        <p className="text-light-2 max-lg:hidden">Logout</p>
                    </div>

                </SignOutButton>

            </div>

        </section>
    )
}
export default LeftSidebar;