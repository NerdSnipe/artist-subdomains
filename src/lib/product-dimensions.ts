import type { Product } from '@/types';

export interface EffectiveDimensions {
    width: number;
    height: number;
    depth?: number;
    unit: string;
}

/**
 * Returns the artwork's real physical dimensions, preferring the
 * authoritative sizes[0] ("Original") row and falling back to the
 * legacy dimensions field only when no sizes exist.
 */
export function getEffectiveDimensions(product: Pick<Product, 'sizes' | 'dimensions'>): EffectiveDimensions | null {
    const original = product.sizes?.[0];
    if (original && (original.width != null || original.height != null)) {
        return {
            width: original.width ?? 0,
            height: original.height ?? 0,
            depth: original.depth ?? undefined,
            unit: original.unit || 'inches',
        };
    }
    if (product.dimensions) {
        return {
            width: product.dimensions.width,
            height: product.dimensions.height,
            depth: product.dimensions.depth,
            unit: product.dimensions.unit,
        };
    }
    return null;
}
