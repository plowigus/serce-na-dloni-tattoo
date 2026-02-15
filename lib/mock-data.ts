import { HeroSection, NavigationConfig } from "@/types/cms";

export const mockNavData: NavigationConfig = {
    logo: {
        src: "/images/logo.svg", // Placeholder, ensure this file exists or update path
        alt: "Serce na Dłoni Logo",
    },
    links: [
        { label: "O nas", href: "#about" },
        { label: "Usługi", href: "#services" },
        { label: "Portfolio", href: "#portfolio" },
        { label: "Kontakt", href: "#contact" },
    ],
    cta: {
        label: "Umów wizytę",
        href: "https://booksy.com",
    },
};

export const mockHeroData: HeroSection = {
    heading: "Piękno, które masz w sercu.",
    subtext:
        "Profesjonalne studio tatuażu i kosmetologii, gdzie pasja spotyka się z delikatnością. Odkryj swoją naturę na nowo.",
    image: {
        src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2670&auto=format&fit=crop", // High-quality placeholder
        alt: "Delikatny portret w pastelowej estetyce",
        width: 600,
        height: 800,
    },
    ctaConfig: {
        label: "Zobacz nasze prace",
        href: "#portfolio",
    },
};
