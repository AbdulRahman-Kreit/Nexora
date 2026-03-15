import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-center 
    p-24`}>
      <div className="flex flex-col items-center gap-2 mb-12 w-[350px] text-center">
        <Image 
          src='/assits/image_8.png'
          alt="A door image"
          width={300}
          height={300}
          priority
        />
        <h2 className="text-4xl mt-0 mb-6 font-semibold">
          Sign in or create a new account
        </h2>
      </div>
      <div className="flex gap-x-5">
        <Link className={`flex justify-center items-center gap-2 py-5 px-10 border 
        border-[#2d2d2d] rounded-md font-semibold hover:bg-[#1e1e1e] 
        transition duration-200 ease-in-out w-[300px]`}
        href="#">
          <img src="/assits/tabler-icon-brand-google.png" alt="Google icon" />
          Continue with Google
        </Link>
        <Link className={`flex justify-center items-center gap-2 py-5 px-10 border 
        border-[#2d2d2d] rounded-md font-semibold hover:bg-[#1e1e1e] 
        transition duration-200 ease-in-out w-[300px]`}
        href="#">
          <img src="/assits/tabler-icon-brand-apple.png" alt="Apple icon" />
          Continue with Apple
        </Link>
        <Link className={`flex justify-center items-center gap-2 py-5 px-10 border 
        border-[#2d2d2d] rounded-md font-semibold hover:bg-[#1e1e1e] 
        transition duration-200 ease-in-out w-[300px]`}
        href="#">
          <img src="/assits/tabler-icon-brand-windows.png" alt="Microsoft icon" />
          Continue with Microsoft
        </Link>
      </div>
      <p className="text-sm text-center mt-6 opacity-50">
        By continuing, you agree to our <Link className="underline" href='#'>Terms of Service</Link>, <Link className="underline" href='#'>Privacy Policy</Link> and <Link className="underline" href='#'>Data Protection Agreement</Link>
      </p>
    </main>
  );
}
