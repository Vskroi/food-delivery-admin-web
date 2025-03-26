import { UpdateFood } from "./UpdateFood";


export const SelectedCategories = ({ food }: { food: Food }) => {
 
  return (
    <div className="w-[270.75px] h-[241px] rounded-[22px] border-[1px] bg-white border-[#E4E4E7] p-4">
      <div
        className="relative w-[238.75px] h-[129px] rounded-xl overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${food.image as string})` }}
      >
        <img
          className="w-full h-full object-cover opacity-0"
          src={food.image as string}
          alt={food.foodName as string}
        />

       <UpdateFood food={food}/>
      </div>
      <div className="self-stretch inline-flex flex-col justify-start items-start gap-2">
        <div className="self-stretch inline-flex justify-center items-center gap-2.5">
          <div className="flex-1 justify-start text-Tailwind-red---Text-color-500 text-sm font-medium leading-tight">
            {food.foodName}
          </div>
          <div className="justify-start text-text-text-foreground text-xs font-normal leading-none">
            ${food.price}
          </div>
        </div>
        <div className="self-stretch justify-start text-text-text-foreground text-xs font-normal leading-none">
          {food.ingerdiets}
        </div>
      </div>
    </div>
  );
};
