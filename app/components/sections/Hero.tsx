import Image from "next/image";
import Link from "next/link";

// ZMIANA: Statyczny import zdjęcia (usuwa mignięcie przy ładowaniu)
// Upewnij się, że plik jest w public/images/momo.jpg
import momoImg from "../../../public/images/momo.jpg";

export default function Hero() {
    return (
        <section className="relative h-dvh w-full flex items-center justify-center pt-32 pb-12 overflow-hidden z-10">
            <div className="w-full max-w-7xl h-full flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 h-full">

                    {/* LEWA STRONA - ZDJĘCIE */}
                    <div className="md:col-span-6 h-full flex flex-col justify-start">
                        <div className="relative w-full max-w-[600px] aspect-4/5 rounded-[40px] overflow-hidden shadow-2xl shadow-primary-900/5 border border-white/40 bg-primary-200/50">
                            <Image
                                alt="Momo - Tatuażystka"
                                src={momoImg}
                                placeholder="blur"
                                fill
                                className="object-cover"
                                loading="eager"
                                fetchPriority="high"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                quality={90}
                            />
                        </div>
                    </div>

                    {/* PRAWA STRONA - TEKST */}
                    <div className="md:col-span-6 h-full flex flex-col justify-start items-center md:items-end">
                        <div className="w-full max-w-[600px] aspect-4/5 bg-white/30 backdrop-blur-md rounded-[40px] p-8 md:p-12 border-[0.5px] border-primary-950/25 shadow-sm shadow-primary-500/5 flex flex-col justify-start">

                            <div>
                                <h1 className="font-serif text-4xl md:text-5xl lg:text-5xl text-primary-950 leading-[1.1] mb-8">
                                    <span className="text-[#a85f6c] font-medium italic block mb-2">Serce na Dłoni</span>
                                    <span>Hej, jestem Momo</span>
                                </h1>

                                <div className="space-y-6 text-base md:text-lg text-primary-900 font-light leading-relaxed text-justify max-w-[440px]">
                                    <p>
                                        Wierzę, że Twoja skóra to płótno dla historii, które warto opowiedzieć.
                                        W moim studio w Bytomiu tworzę ilustracyjne tatuaże, gdzie precyzyjny
                                        detal spotyka się z głęboką, osobistą wrażliwością.
                                    </p>
                                    <p>
                                        Dla mnie tatuaż to proces szukania spójności – nie tylko z Twoją
                                        estetyką, ale przede wszystkim z tym, co nosisz w środku. Każda kreska
                                        jest przemyślana tak, by stać się Twoją integralną częścią.
                                    </p>
                                </div>

                                <div className="mt-10">
                                    <Link
                                        href="/moje-prace"
                                        className="relative inline-flex items-center justify-center px-10 py-4 bg-[#a85f6c] text-white rounded-2xl overflow-hidden transition-colors duration-300 ease-out hover:bg-[#8e4d59]"
                                        prefetch={false}
                                        aria-label="Zobacz moje prace - przejdź do portfolio"
                                    >
                                        <span className="relative z-10 uppercase tracking-widest text-sm font-medium">
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