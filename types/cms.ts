export interface CMSImage {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

export interface NavigationLink {
    label: string;
    href: string;
}

export interface NavigationConfig {
    logo: CMSImage;
    links: NavigationLink[];
    cta: {
        label: string;
        href: string;
    };
}

export interface HeroSection {
    heading: string;
    subtext: string;
    image: CMSImage;
    ctaConfig: {
        label: string;
        href: string;
    };
}
