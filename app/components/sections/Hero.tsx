import Image from "next/image";
import Link from "next/link";
import momoImg from "../../../public/images/momo.jpg";
import SceneWrapper from "../ui/SceneWrapper";

export default function Hero() {
    return (
        <section className="relative h-dvh w-full flex items-center justify-center pt-32 pb-8 overflow-hidden z-10">
            <SceneWrapper />
            <div className="w-full max-w-7xl h-full flex flex-col justify-center">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 h-full items-center">

                    {/* LEWA STRONA - ZDJĘCIE */}
                    <div className="md:col-span-6 flex flex-col justify-center items-center md:items-start">
                        <div className="relative w-full aspect-square max-h-[calc(100dvh-180px)] rounded-[40px] overflow-hidden shadow-2xl shadow-primary-900/5 border border-white/40 bg-primary-200/50">
                            <Image
                                alt="Momo - Tatuażystka"
                                src={momoImg}
                                placeholder="blur"
                                fill
                                className="object-cover"
                                loading="eager"
                                fetchPriority="high"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                    {/* PRAWA STRONA - TEKST */}
                    <div className="md:col-span-6 flex flex-col justify-center items-center md:items-end">

                        <div className="w-full aspect-square max-h-[calc(100dvh-180px)] bg-white/30 backdrop-blur-md rounded-[40px] p-6 md:p-10 lg:p-12 border-[0.5px] border-primary-950/25 shadow-sm shadow-primary-500/5 flex flex-col justify-center">


                            <div className="flex flex-col justify-center h-full">
                                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-950 leading-[1.1] mb-4 md:mb-6 lg:mb-8">
                                    <span className="text-primary-950 font-medium italic block mb-2">Serce na Dłoni</span>
                                    <span className="text-primary-900">Hej, jestem Momo</span>
                                </h1>


                                <div className="space-y-3 md:space-y-4 lg:space-y-6 text-sm md:text-base lg:text-lg text-primary-900 font-light leading-relaxed text-justify max-w-[440px]">
                                    <p>
                                        Wierzę, że Twoja skóra to płótno dla historii, które warto opowiedzieć.
                                        W moim studio w Bytomiu tworzę ilustracyjne tatuaże, gdzie precyzyjny
                                        detal spotyka się z głęboką, osobistą wrażliwością.
                                    </p>
                                    <p className="hidden sm:block">
                                        Dla mnie tatuaż to proces szukania spójności – nie tylko z Twoją
                                        estetyką, ale przede wszystkim z tym, co nosisz w środku.
                                    </p>
                                </div>

                                <div className="mt-6 md:mt-8 lg:mt-10">
                                    <Link
                                        href="/moje-prace"
                                        className="relative inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 bg-primary-950 text-white rounded-2xl overflow-hidden transition-colors duration-300 ease-out hover:bg-[#8e4d59]"
                                        prefetch={false}
                                        aria-label="Zobacz moje prace - przejdź do portfolio"
                                    >
                                        <span className="relative z-10 uppercase tracking-widest text-xs md:text-sm font-medium">
                                            Zobacz moje prace
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}