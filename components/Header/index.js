import Link from "next/link"

const Header = () => {
    return (
        <div className="container-fluid w-100 bg-sky-500 text-white h-16">
            <Link href="/"> <h1 className="text-2xl font-bold text-center pt-3">SI Perpustakaan</h1></Link>
        </div>
    )
}

export default Header