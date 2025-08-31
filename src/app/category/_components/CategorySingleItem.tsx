"use client"
import { motion } from "framer-motion"
import { CatergoriesInterface } from '@/app/category/typescript/categories.interface'
import Image from 'next/image'
import { fa } from "zod/v4/locales"
import { grtSpecificCategory } from "@/apis/spicificCategory"
import Link from "next/link"

export default  function CategorySingleItem({ category }: { category: CatergoriesInterface}) {
    
     return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }} // once: true = يشتغل مرة واحدة بس
      transition={{ duration: 1, ease: "easeOut" }}
      
    >
     <Link  href={`/category/${category._id}`} className="flex items-center gap-4 bg-white shadow rounded-xl p-4 min-w-[200px] hover:scale-[1.05] transition-transform">
      <Image
        src={category.image}
        alt={category.name}
        className="w-16 h-16 object-cover rounded-lg"
        width={50}
        height={50}
      />
      <div>
        <h3 className="font-semibold">{category.name}</h3>
      </div>
      </Link>
    </motion.div>
  )
}
