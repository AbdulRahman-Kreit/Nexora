"use client"; 
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleAnimationComplete = () => {
    setTimeout(() => {
      router.push("/login");
    }, 2000); 
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#1a1a1a] p-24 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center w-fit"
      >
        <div className="flex flex-row relative pr-[230px]">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10" 
          >
            <Image 
              src='/assits/Asset_5.svg'
              alt="Nex part"
              width={300}
              height={300}
              priority
              className="h-auto"
            />
          </motion.div>

          <motion.div 
            initial={{ x: -100, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}    
            transition={{ 
              delay: 0.5, 
              duration: 0.8, 
              ease: "circOut" 
            }}
            className="absolute bottom-1 left-[270px] z-0"
          >
            <Image 
              src='/assits/Asset_7.svg'
              alt="ora part"
              width={260}
              height={50}
              priority
              className="h-auto"
            />
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          onAnimationComplete={handleAnimationComplete}
          className="mt-4 ml-[250px]"
        >
          <Image 
            src='/assits/Asset_6.svg'
            alt="Analytics part"
            width={280}
            height={300}
            priority
            className="h-auto"
          />
        </motion.div>
      </motion.div>
    </main>
  );
}