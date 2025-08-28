import MainSlider from "./_components/MainSlider";
import CategorySlider from "./category/_components/CategorySlider";
import FeaturedProduct from "./product/_components/FeaturedProduct";

export default function Home() {
  return (
    <div className="p-2 container mx-auto">
      <MainSlider/>
      <CategorySlider/>
      <FeaturedProduct/>
    </div>
  );
}
