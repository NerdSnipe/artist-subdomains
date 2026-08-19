import type { ThemeModule } from "@/themes/types";
import { galleryTheme } from "./gallery";
import { studioTheme } from "./studio";
import { marketTheme } from "./market";
import { artisanTheme } from "./artisan";
import { obsidianTheme } from "./obsidian";
import { emberTheme } from "./ember";
import { luminaryTheme } from "./luminary";
import { vividTheme } from "./vivid";
import { noirTheme } from "./noir";
import { chronicleTheme } from "./chronicle";
import { anthemTheme } from "./anthem";

const registry: Record<string, ThemeModule> = {
    gallery: galleryTheme,
    studio: studioTheme,
    market: marketTheme,
    artisan: artisanTheme,
    obsidian: obsidianTheme,
    ember: emberTheme,
    luminary: luminaryTheme,
    vivid: vividTheme,
    noir: noirTheme,
    chronicle: chronicleTheme,
    anthem: anthemTheme,
};

export function getThemeModule(key: string): ThemeModule {
    return registry[key] ?? registry.gallery;
}

export const themeList: ThemeModule[] = Object.values(registry);
