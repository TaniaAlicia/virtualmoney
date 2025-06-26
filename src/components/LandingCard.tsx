interface LandingCardProps {
  title: string;
  paragraph: string;
}

export default function LandingCard({ title, paragraph }: LandingCardProps) {
  return (
    <div className="inline-flex flex-col justify-start items-start gap-2 p-5 w-full text-black bg-white rounded-[25px] md:p-[30px] md:gap-4 md:rounded-[30px] md:w-[597px] xl:h-[246px] xl:w-[500px]">
      <h3 className="w-full pb-3 pt-1 font-bold text-2xl border-b-2 border-green md:text-4xl">
        {title}
      </h3>
      <p className="text-sm font-medium md:text-xl">{paragraph}</p>
    </div>
  );
}
