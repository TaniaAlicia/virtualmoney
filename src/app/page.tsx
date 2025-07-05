import LandingCard from '@/components/LandingCard';

import PublicLayout from '@/components/PublicLayout';

export default function HomePage() {
  return (
    <PublicLayout variant="landing">
      <main className="relative flex flex-col justify-between w-full grow p-5 bg-bg-mobile bg-cover bg-[top] bg-no-repeat md:p-14 xl:p-8 md:bg-bg-desktop md:bg-[40%_20%] min-h-[600px] md:min-h-[700px] xl:min-h-[720px]">
        {/* Texto principal */}
        <section className="w-4/5 py-6 pl-2 flex flex-col gap-5 md:w-1/2 md:pl-10 md:py-10 xl:pl-14 xl:pt-14 xl:max-w-[550px] z-20">
          <h1 className="text-white font-semibold text-[27px] leading-[30px] md:text-5xl md:leading-[50px] md:font-normal xl:font-normal md:pr-8">
            De ahora en <br />
            adelante, hacés <br />
            más con tu dinero
          </h1>
          <div className="w-1/6 border-t-4 border-green md:w-1/4 md:hidden" />
          <h3 className="block text-xl text-green md:text-[34px] md:inline xl:text-4xl">
            Tu nueva{" "}
            <span className="block font-bold md:inline">billetera virtual</span>
          </h3>
        </section>

        {/* Sección de tarjetas */}
        <section className="flex flex-col gap-5 z-20 mt-[-30px] md:flex-row md:justify-center md:gap-6 xl:px-32">
          <LandingCard
            title="Transferí dinero"
            paragraph="Desde Digital Money House vas a poder transferir dinero a otras cuentas, así como también recibir transferencias y nuclear tu capital en nuestra billetera virtual."
          />
          <LandingCard
            title="Pago de servicios"
            paragraph="Pagá mensualmente los servicios en 3 simples clicks. Fácil, rápido y conveniente. Olvidate de las facturas en papel."
          />
        </section>

        {/* Fondo verde decorativo */}
        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-green rounded-t-[20px] z-10 md:h-[434px] md:rounded-t-[30px] xl:h-1/4" />
      </main>
    </PublicLayout>
  );
}
