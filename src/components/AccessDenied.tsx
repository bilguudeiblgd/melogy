import { signIn } from 'next-auth/react'
import Link from "next/link";
import TextEdgy from './TextEdgy';

export default function AccessDenied () {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1>Access Denied</h1>
      <p>
        <Link href="/api/auth/login"
           onClick={(e) => {
           e.preventDefault()
           signIn()
        }}>You must be signed in to view this page</Link>
      </p>
      <Link className="mt-4 btn" href="/auth/signin">
          <TextEdgy className="text-center">Signin</TextEdgy>
        </Link>
    </div>
  )
}