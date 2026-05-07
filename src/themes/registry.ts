import type { ThemeModule } from "@/themes/types";
import { galleryTheme } from "./gallery";
import { studioTheme } from "./studio";
import { marketTheme } from "./market";
import { artisanTheme } from "./artisan";
import { obsidianTheme } from "./obsidian";
import { emberTheme } from "./ember";
import { luminaryTheme } from "./luminary";

const registry: Record<string, ThemeModule> = {
    gallery: galleryTheme,
    studio: studioTheme,
    market: marketTheme,
    artisan: artisanTheme,
    obsidian: obsidianTheme,
    ember: emberTheme,
    luminary: luminaryTheme,
};

export function getThemeModule(key: string): ThemeModule {
    return registry[key] ?? registry.gallery;
}
