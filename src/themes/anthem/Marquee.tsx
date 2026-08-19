export default function Marquee({ items, speedSeconds = 22 }: { items: string[]; speedSeconds?: number }) {
    const doubled = [...items, ...items];
    return (
        <div className="overflow-hidden border-y-4 border-black bg-black">
            <div
                className="flex whitespace-nowrap py-3"
                style={{ animation: `anthem-marquee ${speedSeconds}s linear infinite` }}
            >
                {doubled.map((item, i) => (
                    <span
                        key={i}
                        className="mx-6 font-[family-name:var(--font-display)] uppercase tracking-wide text-[15px] text-[#FFDC00] flex items-center gap-6"
                    >
                        {item}
                        <span className="text-[#E62828]">✦</span>
                    </span>
                ))}
            </div>
            <style>{`
                @keyframes anthem-marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}
