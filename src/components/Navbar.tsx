import React from 'react';
import {useSession} from "next-auth/react"

import Link from 'next/link';

interface NavbarProps {
    onSignIn: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    onLogOut: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const Navbar: React.FC<NavbarProps> = ({onSignIn, onLogOut}) => {
    const {data: session} = useSession()
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
                                      <img
                                          alt="Tailwind CSS Navbar component"
                                          src={`${session.user?.image}`}/>
                                  </div>
                              </div>
                              <ul
                                  tabIndex={0}
                                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                  <li>
                                      <a className="justify-between">
                                          Profile
                                          <span className="badge">New</span>
                                      </a>
                                  </li>
                                  <li><a>Settings</a></li>
                                  <li><a onClick={(e) => onLogOut(e)}>Logout</a></li>
                              </ul>
                          </div>
                      )
                      // The signin link redirects to login page /pages/auth/login.tsx
                      : <a onClick={onSignIn} className="btn btn-ghost">Login</a>
                  }
              </div>
          </div>
        </div>
    )

}

export default Navbar;