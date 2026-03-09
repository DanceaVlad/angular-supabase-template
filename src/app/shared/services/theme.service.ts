import { inject, Injectable, signal } from '@angular/core';

import { type Theme } from '../types/theme.type';
import { LocalStorageService } from './localStorage.service';

const STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private readonly storage = inject(LocalStorageService);
    private readonly _theme = signal<Theme>(
        (this.storage.get(STORAGE_KEY) as Theme | null) ?? 'system',
    );

    readonly theme = this._theme.asReadonly();

    constructor() {
        this.applyTheme(this._theme());
    }

    setTheme(theme: Theme): void {
        this._theme.set(theme);
        this.storage.set(STORAGE_KEY, theme);
        this.applyTheme(theme);
    }

    private applyTheme(theme: Theme): void {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = theme === 'dark' || (theme === 'system' && prefersDark);
        document.documentElement.classList.toggle('dark', isDark);
    }
}
