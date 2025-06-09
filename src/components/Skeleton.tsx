import Navbar from "@/components/Navbar";
import React from "react";


interface SkeletonProps {
    showNavbar: boolean;
    noContainer: boolean;
    maxWidth: string;
    children: React.ReactNode;
}

const Skeleton: React.FC<SkeletonProps> = ({showNavbar, noContainer = false, maxWidth = "2xl", children}) => {
    return (
        <>
            <div>
                {
                    noContainer ?
                        <main className={`h-screen`}>
                            <div className={`w-full container px-2 mx-auto md:px-10`}>
                                {showNavbar && <Navbar/>}
                            </div>
                            {children}
                        </main>
                        :
                        <main className={`container max-w-${maxWidth} px-2 md:px-10 mx-auto h-screen`}>
                            {showNavbar && <Navbar />}
                            {children}
                        </main>
                }


            </div>
        </>
    )
}
export default Skeleton