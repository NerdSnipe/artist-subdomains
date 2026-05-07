import Image from "next/image";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function EmberAbout({ artist }: ThemePageProps) {
    const name = getArtistName(artist);

    return (
        <div style={{ backgroundColor: "#f7f3ee", fontFamily: "'Georgia', 'Times New Roman', serif" }}>

            {/* ── Bio + Photo ─────────────────────────────────────────── */}
            <section className="max-w-6xl mx-auto px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-14 items-start">
                    {/* Photo column */}
                    {(artist.bioPhoto || artist.profilePhoto) && (
                        <div className="md:col-span-2">
                            <div
                                className="relative aspect-[3/4] overflow-hidden"
                                style={{
                                    backgroundColor: "#ede8e1",
                                    padding: "1rem",
                                    boxShadow: "0 2px 16px rgba(44,41,37,0.08)",
                                }}
                            >
                                <div className="relative w-full h-full" style={{ backgroundColor: "#d9cfc5" }}>
                                    <Image
                                        src={(artist.bioPhoto ?? artist.profilePhoto)!}
                                        alt={name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Bio text */}
                    <div className={artist.bioPhoto || artist.profilePhoto ? "md:col-span-3" : "md:col-span-5"}>
                        {(artist.city || artist.state || artist.country) && (
                            <p className="text-xs tracking-widest uppercase mb-5" style={{ color: "#b5451b", letterSpacing: "0.14em" }}>
                                {[artist.city, artist.state, artist.country].filter(Boolean).join(", ")}
                            </p>
                        )}
                        <h1 className="font-serif leading-tight mb-8" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#2c2925" }}>
                            {name}
                        </h1>

                        {artist.bio && (
                            <div
                                className="text-base leading-loose whitespace-pre-line mb-10"
                                style={{ color: "#4a403a" }}
                            >
                                {artist.bio}
                            </div>
                        )}

                        {/* Artist statement — editorial treatment */}
                        {artist.artistStatement && (
                            <blockquote
                                className="border-l-4 pl-8 py-2 my-10"
                                style={{ borderColor: "#b5451b" }}
                            >
                                <p className="font-serif text-xl italic leading-loose" style={{ color: "#2c2925" }}>
                                    &ldquo;{artist.artistStatement}&rdquo;
                                </p>
                                <cite className="block mt-4 text-sm not-italic" style={{ color: "#8a7a6e" }}>
                                    &mdash; {name}, Artist Statement
                                </cite>
                            </blockquote>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Exhibitions Timeline ─────────────────────────────────── */}
            {artist.exhibitions && artist.exhibitions.length > 0 && (
                <section className="py-20 border-t" style={{ backgroundColor: "#ede8e1", borderColor: "#d9d0c4" }}>
                    <div className="max-w-4xl mx-auto px-8">
                        <div className="flex items-center gap-6 mb-14">
                            <h2 className="font-serif text-2xl whitespace-nowrap" style={{ color: "#2c2925" }}>
                                Exhibitions
                            </h2>
                            <div className="flex-1 h-px" style={{ backgroundColor: "#d4a5a5", opacity: 0.6 }} />
                        </div>

                        {/* Timeline */}
                        <div className="relative pl-6 border-l-2" style={{ borderColor: "#d9d0c4" }}>
                            {artist.exhibitions.map((ex, i) => (
                                <div key={i} className="relative mb-10 last:mb-0">
                                    {/* Terracotta dot */}
                                    <div
                                        className="absolute -left-[1.45rem] top-1.5 w-3 h-3 rounded-full border-2"
                                        style={{ backgroundColor: "#b5451b", borderColor: "#ede8e1" }}
                                    />
                                    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                                        <span className="font-serif text-lg font-medium" style={{ color: "#b5451b" }}>
                                            {ex.year}
                                        </span>
                                        {ex.type && (
                                            <span
                                                className="text-xs uppercase tracking-widest"
                                                style={{ color: "#a0907f", letterSpacing: "0.1em" }}
                                            >
                                                {ex.type}
                                            </span>
                                        )}
                                    </div>
                                    <p className="font-serif text-base mt-0.5" style={{ color: "#2c2925" }}>{ex.title}</p>
                                    {ex.location && (
                                        <p className="text-sm mt-0.5" style={{ color: "#8a7a6e" }}>{ex.location}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Publications ─────────────────────────────────────────── */}
            {artist.publications && artist.publications.length > 0 && (
                <section className="py-20 border-t" style={{ backgroundColor: "#f7f3ee", borderColor: "#d9d0c4" }}>
                    <div className="max-w-4xl mx-auto px-8">
                        <div className="flex items-center gap-6 mb-14">
                            <h2 className="font-serif text-2xl whitespace-nowrap" style={{ color: "#2c2925" }}>
                                Publications
                            </h2>
                            <div className="flex-1 h-px" style={{ backgroundColor: "#d4a5a5", opacity: 0.6 }} />
                        </div>
                        <div className="space-y-6">
                            {artist.publications.map((pub, i) => (
                                <div key={i} className="flex gap-8">
                                    <span className="font-serif text-sm w-12 shrink-0 pt-0.5" style={{ color: "#b5451b" }}>
                                        {pub.year}
                                    </span>
                                    <div>
                                        <p className="text-sm font-serif" style={{ color: "#2c2925" }}>{pub.title}</p>
                                        {pub.publication && (
                                            <p className="text-xs mt-0.5 italic" style={{ color: "#8a7a6e" }}>{pub.publication}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Gallery Representation ───────────────────────────────── */}
            {artist.galleries && artist.galleries.length > 0 && (
                <section className="py-20 border-t" style={{ backgroundColor: "#ede8e1", borderColor: "#d9d0c4" }}>
                    <div className="max-w-6xl mx-auto px-8">
                        <div className="flex items-center gap-6 mb-14">
                            <h2 className="font-serif text-2xl whitespace-nowrap" style={{ color: "#2c2925" }}>
                                Gallery Representation
                            </h2>
                            <div className="flex-1 h-px" style={{ backgroundColor: "#d4a5a5", opacity: 0.6 }} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {artist.galleries.map((g, i) => (
                                <div
                                    key={i}
                                    className="p-6"
                                    style={{
                                        backgroundColor: "#f7f3ee",
                                        boxShadow: "0 1px 4px rgba(44,41,37,0.06)",
                                    }}
                                >
                                    {g.photo && (
                                        <div className="relative aspect-video mb-4 overflow-hidden" style={{ backgroundColor: "#d9cfc5" }}>
                                            <Image
                                                src={g.photo}
                                                alt={g.name}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 640px) 100vw, 33vw"
                                            />
                                        </div>
                                    )}
                                    {(g.link || g.url) ? (
                                        <a
                                            href={g.link ?? g.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-serif text-base transition-opacity duration-200 hover:opacity-60"
                                            style={{ color: "#2c2925" }}
                                        >
                                            {g.name}
                                        </a>
                                    ) : (
                                        <p className="font-serif text-base" style={{ color: "#2c2925" }}>{g.name}</p>
                                    )}
                                    {(g.city || g.state) && (
                                        <p className="text-xs mt-1" style={{ color: "#8a7a6e" }}>
                                            {[g.city, g.state].filter(Boolean).join(", ")}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Events ───────────────────────────────────────────────── */}
            {artist.events && artist.events.length > 0 && (
                <section className="py-20 border-t" style={{ backgroundColor: "#f7f3ee", borderColor: "#d9d0c4" }}>
                    <div className="max-w-4xl mx-auto px-8">
                        <div className="flex items-center gap-6 mb-14">
                            <h2 className="font-serif text-2xl whitespace-nowrap" style={{ color: "#2c2925" }}>
                                Upcoming Events
                            </h2>
                            <div className="flex-1 h-px" style={{ backgroundColor: "#d4a5a5", opacity: 0.6 }} />
                        </div>
                        <div className="space-y-8">
                            {artist.events.map((event, i) => {
                                const eventImg = event.imageUrl ?? event.image ?? null;
                                const dateStr = event.startDate ?? event.date ?? null;
                                return (
                                    <div
                                        key={i}
                                        className="p-8 flex gap-8"
                                        style={{ backgroundColor: "#ede8e1" }}
                                    >
                                        {eventImg && (
                                            <div className="relative w-24 h-24 shrink-0 overflow-hidden" style={{ backgroundColor: "#d9cfc5" }}>
                                                <Image
                                                    src={eventImg}
                                                    alt={event.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="96px"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            {dateStr && (
                                                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#b5451b", letterSpacing: "0.1em" }}>
                                                    {dateStr}
                                                </p>
                                            )}
                                            <p className="font-serif text-base mb-1" style={{ color: "#2c2925" }}>{event.title}</p>
                                            <p className="text-sm mb-2" style={{ color: "#8a7a6e" }}>{event.location}</p>
                                            {event.description && (
                                                <p className="text-sm leading-relaxed" style={{ color: "#6b5f52" }}>{event.description}</p>
                                            )}
                                            {event.url && (
                                                <a
                                                    href={event.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-block mt-3 text-xs border-b pb-px transition-opacity duration-200 hover:opacity-60"
                                                    style={{ color: "#b5451b", borderColor: "#b5451b" }}
                                                >
                                                    Learn More &rarr;
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
