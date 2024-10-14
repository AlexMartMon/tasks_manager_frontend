import { Link } from "react-router-dom";


export default function NotFound() {
  return (
    <>
        <h1 className="font-black text-center text-4xl text-white">Page not found</h1>
        <p className="mt-10">
            May you would like to go back to {' '}
            <Link className="text-fuchsia-500 "
                to={'/'}
            >
                Projects
            </Link>
        </p>
    </>
  )
}
