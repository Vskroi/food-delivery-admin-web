export const Navigation = () => {
  return (
    <div>
      <div className="flex">
        <img src="../Navigation/Screenshot.svg" />
        <div className="h-11 flex-col justify-center items-start inline-flex">
          <div className="text-zinc-950 text-lg font-semibold  leading-7">
            NomNom
          </div>
          <div className="self-stretch text-zinc-500 text-xs font-normal  leading-none">
            Swift delivery
          </div>
        </div>
      </div>
      <div>
        <div className="h-10 px-6 py-2 rounded-full justify-start items-center gap-2.5 inline-flex">
          <img src="../Navigation/DashboardIcon.svg" alt="" />
          <div className="text-zinc-950 text-sm font-medium leading-tight">
            Food menu
          </div>
        </div>
      </div>
    </div>
  );
};
