import Navbar from "@/components/Navbar";
import React from "react";


interface SkeletonProps {
    showNavbar: boolean;
    children: React.ReactNode;
}

const Skeleton: React.FC<SkeletonProps> = ({showNavbar, children}) => {
    return (
        <>
            <main className="container mx-auto px-2 md:px-10 h-screen">
                {showNavbar && <Navbar/>}
                {children}
            </main>
        </>
    )
}
export default Skeleton