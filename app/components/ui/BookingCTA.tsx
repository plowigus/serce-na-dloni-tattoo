import Link from "next/link";

interface BookingCTAProps {
    label?: string;
    href?: string;
    className?: string; // Additional classes for positioning
}

export default function BookingCTA({
    label = "Umów wizytę",
    href = "https://booksy.com",
    className = "",
}: BookingCTAProps) {
    return (
        <Link
            href={href}
            className={`
        inline-flex items-center justify-center
        px-8 py-3 rounded-full
        bg-primary-500 text-white font-medium
        transition-all duration-300 ease-out
        hover:bg-primary-600 hover:scale-105 hover:shadow-lg hover:shadow-primary-300/50
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2
        ${className}
      `}
            aria-label={label}
        >
            {label}
        </Link>
    );
}
