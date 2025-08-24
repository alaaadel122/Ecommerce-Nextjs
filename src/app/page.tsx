import Image from "next/image";
import Navbar from "./_components/Navbar";
import MainSlider from "./_components/MainSlider";
import FeaturedProduct from "./product/_components/FeaturedProduct";

export default function Home() {
  return (
    <div className="p-2 container mx-auto">
      <MainSlider/>
      <FeaturedProduct/>
    </div>
  );
}
