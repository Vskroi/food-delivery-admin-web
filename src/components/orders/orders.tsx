export const Orders = () => {
    return(
        <div className="block">
        <div className="w-9 h-9 relative rounded-full">
          <img className="w-9 h-9 rounded-full" src="" />
        </div>
        <div className="border-[2px] rounded-md w-[1171px] ">
          <div className="self-stretch p-4 border-b border-border-border-border inline-flex justify-between items-center">
            <div className="w-[485.20px] inline-flex flex-col justify-start items-start">
              <div className="w-48 justify-start text-text-text-foreground text-xl font-bold font-['Inter'] leading-7">
                Orders
              </div>
              <div className="justify-start text-text-text-muted-foreground text-xs font-medium font-['Inter'] leading-none">
                32 items
              </div>
            </div>
            <div className="flex justify-start items-center gap-3"></div>
          </div>
          <div className=" w-full self-stretch p-4 border-b border-border-border-border flex justify-start items-center justify-between ">
            <input type="checkBox" />
            <p className="justify-start text-text-text-foreground text-sm font-normal  leading-tight">
              №
            </p>
            <p className="justify-start text-text-text-muted-foreground text-sm font-medium leading-tight">Customer</p>
            <p className="justify-start text-text-text-muted-foreground text-sm font-medium leading-tight">Food</p>
            <p className="justify-start text-text-text-muted-foreground text-sm font-medium leading-tight">date</p>
            <div className="w-4 h-4 relative overflow-hidden">
              <div className="w-1.5 h-2.5 left-[4.67px] top-[2.67px] absolute outline outline-1 outline-offset-[-0.50px] outline-border-border-foreground"></div>
            </div>
            <p className="justify-start text-text-text-muted-foreground text-sm font-medium leading-tight">Total</p>
            <p className="justify-start text-text-text-muted-foreground text-sm font-medium leading-tight">Delivery Address</p>
            <p className="justify-start text-text-text-muted-foreground text-sm font-medium leading-tight">Delivery state</p>
          </div>
        </div>
      </div>
    )
}