import LandingCard from "@/components/landing/LandingCard";
import BaseLayout from "@/components/generals/BaseLayout";
import { landingContent } from "@/data/landing";

export default function LandingPage() {
  const { hero, cards } = landingContent;

  return (
    <BaseLayout variant="landing">
      <main
        className="relative flex min-h-[600px] w-full grow flex-col justify-between bg-bg-mobile bg-cover bg-center bg-no-repeat 
        p-5 
        bg-[center_top_-60px]
        md:min-h-[700px] 
        md:bg-bg-tablet md:bg-[center_top_-80px] 
        xl:min-h-[720px] 
        xl:bg-bgDesktop xl:bg-[center_top_-130px]"
      >
       
        <section className="z-20 flex flex-col gap-5 pt-8 w-3/5 py-6 pl-1 pr-8 max-w-[450px] md:w-3/5 md:py-10 md:pr-2 md:pl-3 md:max-w-[1050px] xl:max-w-[550px] xl:pl-14 xl:pt-14 xl:pr-8">
          <h1 className="text-[29px] leading-[30px] text-white md:pr-8 md:text-5xl md:font-normal md:leading-[50px] xl:font-normal">
            {hero.title}
          </h1>
          <div className="w-1/6 border-t-4 border-green md:hidden md:w-1/4" />
          <h3 className="block text-xl text-green md:inline md:text-[34px] xl:text-4xl">
            {hero.subtitle.beforeBold}{" "}
            <span className="block font-bold md:inline">{hero.subtitle.bold}</span>
          </h3>
        </section>

       
        <section
          className="z-20 mt-[170px] md:mt-[30px] flex flex-col items-center gap-6 md:px-8 
          xl:flex-row xl:items-end xl:justify-center xl:gap-8 xl:px-36
        "
        >
          {cards.map((card, index) => (
            <LandingCard key={index} title={card.title} paragraph={card.paragraph} />
          ))}
        </section>

       
        <div
          className="absolute bottom-0 left-0 z-10 h-[30%] w-full rounded-t-[20px]
          bg-green 
          md:h-[320px] 
          lg:h-[260px] 
          xl:h-[160px] xl:rounded-t-[40px]
        "
        />
      </main>
    </BaseLayout>
  );
}
