import Image from "next/image";
import Link from "next/link";


const Header = () => {
  return <nav className = "mx-auto py-2 px-4 flex justify-left">

        <Link href ={"/"} className = "flex items-center"></Link>
        <Image src = "/logo.png" width = "200" height = "200" alt = "logo" className="h-auto w-auto"/>

    </nav>;
  
};

export default Header;