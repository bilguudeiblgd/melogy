import React from 'react';
import {signIn, signOut, useSession} from "next-auth/react"

import Link from 'next/link';
import Image from "next/image";

const Navbar: React.FC = () => {
    const {data: session} = useSession()
    console.log(session?.user)
    return (
        <div className="w-full ">
          <div className="navbar w-full bg-transparent">
              <div className="flex-1">
                  <Link href="/" className="btn btn-ghost text-xl">Methology</Link>
              </div>
              <div className="flex-none">
                  {session ?
                      (
                          <div className="dropdown dropdown-end">
                              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                  <div className="w-10 rounded-full">
                                      <Image
                                          alt="Tailwind CSS Navbar component"
                                          src={`${session.user?.image}`}
                                          width={96}
                                          height={96}
                                      />
                                  </div>
                              </div>
                              <ul
                                  tabIndex={0}
                                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                  <li>
                                      <Link href={`/${session.user?.userHandle}`} className="justify-between">
                                          Profile
                                          <span className="badge">New</span>
                                      </Link>
                                  </li>
                                  <li><a onClick={(e) =>  signOut()}>Logout</a></li>
                              </ul>
                          </div>
                      )
                      // The signin link redirects to login page /pages/auth/login.tsx
                      : <a onClick={(e) => signIn()} className="btn btn-ghost">Login</a>
                  }
              </div>
          </div>
        </div>
    )

}

export default Navbar;