import Navbar from "@/components/Navbar";
import React from "react";


interface SkeletonProps {
    showNavbar: boolean;
    darkTheme: boolean;
    noContainer: boolean;
    children: React.ReactNode;
}

const Skeleton: React.FC<SkeletonProps> = ({showNavbar, darkTheme = false, noContainer = false, children}) => {
    return (
        <>
            <div className={`${darkTheme && "bg-primary"}`}>
                {
                    noContainer ?
                        <main className={`h-screen`}>
                            <div className={`w-full container px-2 mx-auto md:px-10`}>
                                {showNavbar && <Navbar darkTheme={darkTheme}/>}
                            </div>
                            {children}
                        </main>
                        :
                        <main className={`container px-2 md:px-10 mx-auto h-screen`}>
                            {showNavbar && <Navbar darkTheme={darkTheme}/>}
                            {children}
                        </main>
                }


            </div>
        </>
    )
}
export default Skeleton