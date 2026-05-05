import type { ThemeModule } from "@/themes/types";
import { galleryTheme } from "./gallery";
import { studioTheme } from "./studio";
import { marketTheme } from "./market";
import { artisanTheme } from "./artisan";

const registry: Record<string, ThemeModule> = {
    gallery: galleryTheme,
    studio: studioTheme,
    market: marketTheme,
    artisan: artisanTheme,
};

export function getThemeModule(key: string): ThemeModule {
    return registry[key] ?? registry.gallery;
}
