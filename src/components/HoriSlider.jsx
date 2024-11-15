import HoriCard from "./HoriCards";
import horiCardData from "../dataFile/horiCardData.json";

const HorizontalSlider = () => {
  return (
    <div className="mt-16">
      <p className="ml-8 text-lg font-semibold">Trending</p>
      <div className="overflow-x-auto flex whitespace-nowrap mx-8 py-4 scroll-smooth">
        <div className="flex gap-4">
          {horiCardData.map(({ id, image, label }) => (
            <HoriCard
              key={id}
              image={image}
              label={label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalSlider;
