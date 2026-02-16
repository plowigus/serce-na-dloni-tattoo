import Link from "next/link";
import Image from "next/image";

// Ikony Social Media (Stateless)
const IconFB = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const IconIG = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

export default function Navbar() {
    const linkStyle = "relative text-sm uppercase tracking-widest text-primary-800 hover:text-primary-950 transition-colors font-medium group py-2 whitespace-nowrap";
    const underlineStyle = "absolute left-0 bottom-0 w-0 h-[1px] bg-primary-950 transition-all duration-300 group-hover:w-full";

    return (

        <nav className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 py-6">
            <div className="mx-auto max-w-7xl rounded-2xl bg-white/30 backdrop-blur-md border-[0.5px] border-primary-950/25 shadow-sm shadow-primary-500/5 px-8 py-4 relative grid grid-cols-2 items-center">

                {/* LEWA STRONA */}
                <div className="flex items-center justify-end gap-12 z-30 pr-16">
                    <Link href="/" className={linkStyle} prefetch={false}>Home<span className={underlineStyle}></span></Link>
                    <Link href="/o-mnie" className={linkStyle} prefetch={false}>O mnie<span className={underlineStyle}></span></Link>
                    <Link href="/rezerwacja" className={linkStyle} prefetch={false}>Jak się umówić?<span className={underlineStyle}></span></Link>
                </div>

                {/* ŚRODEK (LOGO) */}
                {/* Zachowano sztywne wymiary kontenera z poprzedniej poprawki */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center w-32 h-48">
                    <Link href="/" className="block w-full h-full" prefetch={false} aria-label="Strona główna">
                        <Image
                            src="/logo.png"
                            alt="Serce na Dłoni Logo"
                            width={256}
                            height={96}
                            className="h-full w-full object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* PRAWA STRONA */}
                <div className="flex items-center justify-start gap-10 z-30 pl-16 w-full">
                    <Link href="/moje-prace" className={linkStyle} prefetch={false}>Moje prace<span className={underlineStyle}></span></Link>
                    <Link href="/kalendarz" className={linkStyle} prefetch={false}>Kalendarz<span className={underlineStyle}></span></Link>
                    <Link href="/kontakt" className={linkStyle} prefetch={false}>Kontakt<span className={underlineStyle}></span></Link>

                    <div className="h-4 w-px bg-primary-950/20 mx-2 hidden md:block ml-auto"></div>

                    <div className="flex items-center gap-4 text-primary-800 pr-12">
                        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-950 hover:scale-110 transition-all duration-300" aria-label="Instagram">
                            <IconIG className="w-5 h-5" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                        <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-950 hover:scale-110 transition-all duration-300" aria-label="Facebook">
                            <IconFB className="w-5 h-5" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}