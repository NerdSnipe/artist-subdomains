import type { ArtistProfile, Product, LocalArtistResponse } from "@/types";

// Local preview data for Rocky Asbury — built from real content pulled from
// his GHL "My Profile" record (bio, quote, site copy, galleries, socials) and
// the ARTSDistrictUSA marketplace. Artwork images are placeholders in his
// actual bold pop-art / graffiti style until real photos are wired in from
// Google Drive or GHL media. "Crazy Cow #2" below is his real listed piece;
// the rest are stand-ins so the portfolio grid isn't empty.

const now = new Date().toISOString();

const artworks: { title: string; desc: string; medium: string; w: number; h: number; price: number; year: number; series: string[]; gallerySource?: string[] }[] = [
    {
        title: "Crazy Cow #2",
        desc: `If Crazy Cow #1 was the life of the party, Crazy Cow #2 is the one who just walked through the door and took over. Rocky Asbury moves the frame in tight on this 36" x 36" canvas, letting the Holstein fill every inch with unfiltered, grinning chaos. One eye ringed in red, one in electric green, a yellow triangle blazing between the horns — this cow has clearly been studying Basquiat. The wide red-outlined smile below a dark muzzle is rendered with the bold graphic confidence of classic pop art, set against a hard split of red and cyan that gives the whole composition the charged energy of a Roy Lichtenstein that took a wrong turn into a very fun alley. Smaller than its sibling — but somehow even bigger in the room.`,
        medium: "Acrylic on Canvas",
        w: 36,
        h: 36,
        price: 1875,
        year: 2024,
        series: ["Popular", "Icons & Pop"],
        gallerySource: ["ArtDistrictUSA", "Conrad West Gallery"],
    },
    { title: "Neon Muzzle", desc: "A companion piece in the same unfiltered, grinning chaos — bold outline work over a hard split of color.", medium: "Acrylic, Spray Paint on Canvas", w: 30, h: 40, price: 1650, year: 2024, series: ["Icons & Pop", "New Release"] },
    { title: "Hugs Ave", desc: "Layered street-art energy meets fine-art color theory — raw, joyful, and impossible to look away from.", medium: "Mixed Media on Canvas", w: 24, h: 30, price: 1200, year: 2023, series: ["Abstract Chaos"] },
    { title: "Static Bloom", desc: "Beautiful chaos in bloom form — drips, splatter, and hard-edged shape colliding on one canvas.", medium: "Acrylic, Wax Medium on Canvas", w: 40, h: 40, price: 2100, year: 2024, series: ["Abstract Chaos", "New Release"] },
    { title: "Vegas Grin", desc: "A love letter to the city that raised him — pop-color confidence with a graffiti backbone.", medium: "Acrylic, Crayon on Canvas", w: 36, h: 48, price: 2450, year: 2023, series: ["Popular"], gallerySource: ["ArtDistrictUSA", "Art Center Gallery"] },
    { title: "Garage Door #1", desc: "Named for where it all started. Thick outlines, primary color blocks, unapologetic and rule-free.", medium: "Acrylic on Wood", w: 30, h: 30, price: 1400, year: 2022, series: ["Teddy Series"] },
    { title: "Splatter Portrait", desc: "Part portrait, part explosion — the emotional depth of fine art fused with street-art grit.", medium: "Mixed Media on Canvas", w: 24, h: 36, price: 1550, year: 2023, series: ["Teddy Series", "Abstract Chaos"] },
    { title: "Loud Quiet", desc: "Proof that Rocky's chaos can whisper too — softer palette, same fearless hand.", medium: "Acrylic on Canvas", w: 20, h: 24, price: 950, year: 2022, series: ["Popular"] },
];

export const mockArtworks: Product[] = artworks.map((a, i) => {
    const slug = a.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const img = `/rocky-images/artwork-${(i % 8) + 1}.jpg`;
    // A couple of extra "detail shot" images per piece so the artwork detail page has a real
    // thumbnail gallery to show, not just one hero image — placeholders cycling the same pool.
    const detailImgs = [1, 2].map((offset) => `/rocky-images/artwork-${((i + offset * 3) % 8) + 1}.jpg`);
    return {
        id: `rocky-art-${i + 1}`,
        accountId: "rocky-asbury",
        title: a.title,
        slug,
        description: a.desc,
        artistName: "Rocky Asbury",
        artistSlug: "rocky-asbury",
        categoryId: "paintings",
        categoryName: "Paintings",
        categorySlug: "paintings",
        price: a.price,
        imageUrl: img,
        imageKey: null,
        images: [
            { id: `rocky-img-${i + 1}-0`, productId: `rocky-art-${i + 1}`, imageUrl: img, imageKey: img, displayOrder: 0, isPrimary: true, caption: "Full piece", createdAt: now, updatedAt: now },
            { id: `rocky-img-${i + 1}-1`, productId: `rocky-art-${i + 1}`, imageUrl: detailImgs[0], imageKey: detailImgs[0], displayOrder: 1, isPrimary: false, caption: "Detail", createdAt: now, updatedAt: now },
            { id: `rocky-img-${i + 1}-2`, productId: `rocky-art-${i + 1}`, imageUrl: detailImgs[1], imageKey: detailImgs[1], displayOrder: 2, isPrimary: false, caption: "In the studio", createdAt: now, updatedAt: now },
        ],
        dimensions: { width: a.w, height: a.h, depth: 2, unit: "inches" },
        yearCreated: a.year,
        isOriginal: true,
        status: "active",
        createdAt: now,
        updatedAt: now,
        medium: a.medium,
        isFramed: false,
        readyToHang: true,
        signedLocation: "front",
        salePrice: null,
        shippingPrice: 95,
        dominantColors: [
            { name: "Signal Red", hex: "#E62828" },
            { name: "Electric Cyan", hex: "#00D2B4" },
            { name: "Pop Yellow", hex: "#FFDC00" },
        ],
        series: a.series,
        gallerySource: a.gallerySource,
    };
});

export const mockArtistProfile: ArtistProfile = {
    id: "rocky-asbury-1",
    accountId: "rocky-asbury",
    firstName: "Rocky",
    lastName: "Asbury",
    displayName: "Rocky Asbury",
    email: "rockyasbury@ARTDistrictUSA.com",
    phone: "951-264-1952",
    profilePhoto: "/rocky-images/artwork-1.jpg",
    coverPhoto: "/rocky-images/artwork-4.jpg",
    streetAddress: "5969 Thistle Meadow Ave",
    city: "Las Vegas",
    state: "NV",
    zipCode: "89139",
    country: "United States",
    verified: true,
    // First words of Rocky's real GHL artist statement/site copy — curated on purpose so the
    // hero doesn't rely on the generic fallback logic (see getHeroHeadline in artist-api.ts).
    heroHeadline: "Beautiful Chaos",
    artStyle: "Contemporary Art",
    secondaryArtStyle: "Impressionism",
    medium: "Acrylic Paint",
    secondaryMedium: "Oil Paint",
    artisticMedium: "Acrylic on Canvas/Wood",
    acceptsCommissions: "Yes",
    priceRange: "$950 - $2,450",
    bio: "Some artists find their calling in a classroom. Rocky Asbury found his in a garage — surrounded by paint-splattered walls and the quiet determination of a father who wanted more time with his daughter. After two decades in a demanding career, it was a simple question from his three-year-old that changed everything. She wanted her dad home more. And just like that, Rocky walked away from everything familiar and stepped — with no formal training, no roadmap, and no rules — into one of the hardest careers imaginable.",
    artistStatement:
        "Art isn't about making a perfect painting — it's about creating a feeling. Being able to have people understand the message and relate it to their everyday lives — that's what I try to create.",
    artistTagline: "Contemporary Impressionist / Mixed-Media Artist",
    studioProcessDescription:
        "THE PAINTING PROCESS Rocky Asbury's studio looks exactly the way his paintings feel. Every wall is layered in years of overspray, drips, and color — a living archive of every canvas that has passed through the room. Dozens of spray cans line the floor. Shelves buckle under bottles of Golden acrylics, oil sticks, and brushes. There is no clean corner, no separation between working and living — every inch of the space is part of the art.",
    soldArtworksDescription:
        "Every painting tells a story — and found its home. While these original works are no longer available, they serve as inspiration for what's possible. Drawn to a particular piece? The colors, composition, or energy of any sold work can serve as the creative spark for a commissioned painting uniquely yours. Browse this gallery to discover what resonates, then let's collaborate to bring something just as powerful to life.",
    website: "https://www.rockyasburyart.com/",
    instagram: "https://www.instagram.com/artistrockyasbury/",
    facebook: "https://www.facebook.com/rocky.asbury.2025",
    tiktok: "https://www.tiktok.com/@artrock7",
    slug: "rocky-asbury",
    tier: "master",
    location: "Las Vegas, NV",
    description: "Contemporary Impressionist / Mixed-Media Artist — Las Vegas, NV. Founding artist of ArtDistrictUSA.",
    socialMedia: {
        instagram: "https://www.instagram.com/artistrockyasbury/",
        facebook: "https://www.facebook.com/rocky.asbury.2025",
        tiktok: "https://www.tiktok.com/@artrock7",
    },
    exhibitions: [],
    reviews: [],
    artworks: mockArtworks,
    carouselImages: [
        "/rocky-images/artwork-2.jpg",
        "/rocky-images/artwork-5.jpg",
        "/rocky-images/artwork-3.jpg",
        "/rocky-images/artwork-7.jpg",
    ],
    studioImages: [
        "/rocky-images/artwork-6.jpg",
        "/rocky-images/artwork-8.jpg",
        "/rocky-images/artwork-1.jpg",
        "/rocky-images/artwork-4.jpg",
        "/rocky-images/artwork-2.jpg",
        "/rocky-images/artwork-5.jpg",
    ],
    galleries: [
        {
            name: "Conrad West Gallery",
            address: "1201 S Commerce St",
            city: "Las Vegas",
            state: "NV",
            zip: "89102",
            url: "https://conradwestgallery.com/featured-artists/rocky-asbury-2/",
            photo: "/rocky-images/artwork-3.jpg",
        },
        {
            name: "Art Center Gallery",
            address: "104B The Shops Blvd",
            city: "Mission Viejo",
            state: "CA",
            zip: "92691",
            url: "https://www.shopartcenter.com/collections/rocky-asbury-art",
            photo: "/rocky-images/artwork-7.jpg",
        },
    ],
};

export const mockArtistData: LocalArtistResponse = {
    success: true,
    profile: mockArtistProfile,
    products: mockArtworks,
    meta: {
        totalProducts: mockArtworks.length,
        profileStyle: "anthem",
    },
};
