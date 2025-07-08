interface LandingCardProps {
  title: string;
  paragraph: string;
}

export default function LandingCard({ title, paragraph }: LandingCardProps) {
  return (
    <div
      className="flex w-full flex-col items-start justify-start gap-2 rounded-[25px] bg-white p-5 text-black shadow-md 
      md:max-w-[540px] md:gap-4 md:rounded-[30px] 
      md:p-6 lg:max-w-[660px] 
      xl:h-[246px] xl:w-[560px] xl:max-w-none xl:p-7
    "
    >
      <h3 className="w-full border-b-2 border-green pb-3 pt-1 text-2xl font-bold md:text-3xl xl:text-4xl">
        {title}
      </h3>
      <p className="text-sm font-medium md:text-base xl:text-lg">{paragraph}</p>
    </div>
  );
}
