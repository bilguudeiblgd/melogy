import Navbar from "@/components/Navbar";
import React from "react";


interface SkeletonProps {
    showNavbar: boolean;
    darkTheme: boolean;
    children: React.ReactNode;
}

const Skeleton: React.FC<SkeletonProps> = ({showNavbar, darkTheme = false, children}) => {
    return (
        <>
            <div className={`${darkTheme && "bg-primary"}`}>
                <main className="container mx-auto px-2 md:px-10 h-screen">
                    {showNavbar && <Navbar darkTheme={darkTheme}/>}
                    {children}
                </main>

            </div>
        </>
    )
}
export default Skeleton