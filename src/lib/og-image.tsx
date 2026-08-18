import { ImageResponse } from "next/og";
import type { ArtistProfile, Product } from "@/types";
import { getArtistName, getProductImageUrl } from "@/lib/artist-api";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

const BG = "linear-gradient(135deg, #16161a 0%, #26262e 100%)";

export function renderFallbackOgImage(label: string) {
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: BG,
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ fontSize: 48, color: "#f5f5f0" }}>{label}</div>
            </div>
        ),
        ogImageSize
    );
}

export function renderArtistOgImage(artist: ArtistProfile) {
    const name = getArtistName(artist);
    const photo = artist.profilePhoto;

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "80px",
                    background: BG,
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", maxWidth: "640px" }}>
                    <div style={{ fontSize: 28, letterSpacing: 6, color: "#c9a96e", textTransform: "uppercase" }}>
                        Original Artwork
                    </div>
                    <div style={{ fontSize: 72, color: "#f5f5f0", fontWeight: 600, marginTop: 24, lineHeight: 1.1 }}>
                        {name}
                    </div>
                    {artist.bio ? (
                        <div style={{ fontSize: 28, color: "#9a9aa2", marginTop: 28, lineHeight: 1.5 }}>
                            {artist.bio.slice(0, 120)}
                        </div>
                    ) : null}
                </div>
                {photo ? (
                    <img
                        src={photo}
                        width={360}
                        height={360}
                        style={{ borderRadius: "50%", objectFit: "cover", border: "6px solid #c9a96e" }}
                    />
                ) : null}
            </div>
        ),
        ogImageSize
    );
}

export function renderArtworkOgImage(product: Product, artistName: string) {
    const imgUrl = getProductImageUrl(product);

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    background: BG,
                    fontFamily: "sans-serif",
                }}
            >
                {imgUrl ? (
                    <img
                        src={imgUrl}
                        style={{ height: "100%", width: "560px", objectFit: "cover" }}
                    />
                ) : null}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "72px",
                    }}
                >
                    <div style={{ fontSize: 24, letterSpacing: 6, color: "#c9a96e", textTransform: "uppercase" }}>
                        {artistName}
                    </div>
                    <div style={{ fontSize: 56, color: "#f5f5f0", fontWeight: 600, marginTop: 20, lineHeight: 1.15 }}>
                        {product.title}
                    </div>
                    {product.medium ? (
                        <div style={{ fontSize: 26, color: "#9a9aa2", marginTop: 24 }}>{product.medium}</div>
                    ) : null}
                </div>
            </div>
        ),
        ogImageSize
    );
}
