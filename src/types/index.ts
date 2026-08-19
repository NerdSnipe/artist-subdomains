export interface ProductImage {
    id: string;
    productId: string;
    imageUrl: string;
    imageKey: string;
    displayOrder: number;
    isPrimary: boolean;
    caption: string | null;
    createdAt: string;
    updatedAt: string;
    // Alias for template compatibility
    image?: string;
}

export interface Product {
    id: string;
    accountId: string;
    title: string;
    slug?: string;
    description: string;
    artistName: string;
    artistSlug?: string;
    categoryId: string | null;
    categoryName?: string;
    categorySlug?: string;
    price: number;
    // Legacy fields (still supported for backward compatibility)
    imageUrl: string | null;
    imageKey: string | null;
    // NEW: Multiple images support
    images: ProductImage[];
    dimensions: {
        width: number;
        height: number;
        depth?: number;
        unit: 'inches' | 'cm';
    } | null;
    yearCreated: number | null;
    isOriginal: boolean;
    status: 'active' | 'inactive' | 'sold';
    createdAt: string;
    updatedAt: string;
    // Additional optional fields for versatility
    medium?: string;
    image?: string;
    // Framing, signing, and pricing
    isFramed?: boolean;
    readyToHang?: boolean;
    signedLocation?: 'front' | 'back' | 'side' | null;
    salePrice?: number | null;
    shippingPrice?: number | null;
    dominantColors?: Array<{ name: string; hex: string }> | null;
    // Series/collection grouping (used for artwork filter chips, e.g. "Popular", "Icons & Pop")
    series?: string[];
    // Physical gallery locations this piece is also available through (badges on artwork cards)
    gallerySource?: string[];
    // Nested taxonomy relations from API
    mediums?: Array<{ medium: { id: string; name: string; slug: string } }>;
    styles?: Array<{ artStyle: { id: string; name: string; slug: string } }>;
    subjects?: Array<{ subject: { id: string; name: string; slug: string } }>;
    materials?: Array<{ material: { id: string; name: string; slug: string } }>;
}

export interface ArtistProfile {
    id: string;
    accountId?: string;
    firstName: string;
    lastName: string;
    displayName?: string;
    email: string;
    phone: string;
    profilePhoto?: string | null;
    profilePhotoKey?: string | null;
    streetAddress?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    languages?: string[];
    otherLanguages?: string | null;
    selectedPlan?: string;
    billingPeriod?: string;
    taxIdType?: string | null;
    taxId?: string | null;
    legalName?: string | null;
    verified?: boolean;
    artStyle?: string | null;
    secondaryArtStyle?: string | null;
    medium?: string | null;
    secondaryMedium?: string | null;
    widthRange?: string | null;
    heightRange?: string | null;
    acceptsCommissions?: string | null;
    priceRange?: string | null;
    experience?: string | null;
    bio?: string | null;
    bioFile?: string | null;
    bioFileKey?: string | null;
    bioPhoto?: string | null;
    bioPhotoKey?: string | null;
    website?: string | null;
    instagram?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    tiktok?: string | null;
    pinterest?: string | null;
    youtube?: string | null;
    linkedin?: string | null;
    slug?: string;
    dataConsent?: boolean;
    currentStep?: number;
    createdAt?: string;
    updatedAt?: string;
    // Additional fields for tier templates
    artisticMedium?: string;
    location?: string;
    tier?: 'standard' | 'studio' | 'gallery' | 'master';
    profileImage?: string;
    coverPhoto?: string;
    coverPhotoKey?: string;
    description?: string;
    socialMedia?: {
        instagram?: string;
        facebook?: string;
        linkedin?: string;
        twitter?: string;
        tiktok?: string;
        pinterest?: string;
        youtube?: string;
    };
    exhibitions?: {
        year: string;
        title: string;
        location: string;
        type?: 'solo' | 'group';
    }[];
    artworks?: Product[];

    // Elite Template Specific Data
    artistStatement?: string | null;
    artistTagline?: string | null;
    studioProcessDescription?: string | null;
    // Curated hero headline for statement-style hero sections (e.g. "Beautiful Chaos").
    // When absent, themes should derive a short fallback from artistStatement/description/bio.
    heroHeadline?: string | null;
    blogPosts?: { title: string; date: string; excerpt: string; imageUrl?: string | null; externalUrl?: string | null; source?: string | null; }[];
    book?: { title: string; description: string; imageUrl: string; publisher?: string; format?: string; isbn?: string; purchaseUrl?: string; purchaseLabel?: string; } | null;
    studioLocations?: { name?: string; address: string; city: string; state: string; zipCode?: string; directionsUrl?: string; }[];
    publications?: { year: string; title: string; publication?: string; }[];
    soldArtworks?: { id?: string; title: string; image: string; dimensions?: string | { width: number; height: number; depth?: number }; year?: string; price?: number; medium?: string; status?: string; }[];
    carouselImages?: string[];
    studioImages?: string[];
    socialImages?: string[];
    galleries?: { name: string; address?: string; link?: string; url?: string; photo?: string; images?: string[]; city?: string; state?: string; zip?: string; photoKey?: string }[];
    reviews?: { text: string; author: string; role?: string }[];
    events?: { title: string; date?: string; startDate?: string; endDate?: string; location: string; description?: string; image?: string; imageUrl?: string; url?: string; imageKey?: string }[];
    ghlLocationId?: string;
    // Configurable section copy (optional, with hardcoded fallbacks)
    studioSubtitle?: string | null;
    soldArtworksDescription?: string | null;
    commissionDescription?: string | null;
}

export interface Taxonomy {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    displayOrder: number;
    isActive: boolean;
    _count: {
        products: number;
    };
    createdAt: string;
    updatedAt: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ProductListResponse {
    success: boolean;
    products: Product[];
    pagination: Pagination;
}

export interface ProductDetailResponse {
    success: boolean;
    product: Product;
}

export interface TaxonomyListResponse {
    success: boolean;
    categories?: Taxonomy[];
    styles?: Taxonomy[];
    mediums?: Taxonomy[];
    materials?: Taxonomy[];
    subjects?: Taxonomy[];
    moods?: Taxonomy[];
}

export interface ArtistProfileResponse {
    success: boolean;
    profile: ArtistProfile;
}

export interface ArtistListResponse {
    success: boolean;
    artists: ArtistProfile[];
    pagination: Pagination;
}

export interface LocalArtistResponse {
    success: boolean;
    profile: ArtistProfile;
    products: Product[];
    meta: {
        totalProducts: number;
        profileStyle?: string;
    };
}

export interface FeaturedArtistProduct extends Product {
    artist: {
        accountId: string;
        displayName: string;
        slug: string | null;
        profilePhoto: string | null;
        city: string;
        state: string;
    };
}

export interface FeaturedArtistProductsResponse {
    success: boolean;
    products: FeaturedArtistProduct[];
    pagination: Pagination;
}
