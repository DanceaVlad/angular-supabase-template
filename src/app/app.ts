import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronRight, lucideMenu, lucideSettings } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan/button';
import { HlmIconImports } from '@spartan/icon';
import { HlmDropdownMenuImports } from '@spartan/dropdown-menu';

import { SupabaseService } from './shared/services/supabase.service';
import { ThemeService } from './shared/services/theme.service';
import { type Theme } from './shared/types/theme.type';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    imports: [HlmButtonImports, HlmIconImports, HlmDropdownMenuImports],
    providers: [provideIcons({ lucideChevronRight, lucideMenu, lucideSettings })],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
    private readonly supabase: SupabaseService = inject(SupabaseService);
    private readonly themeService = inject(ThemeService);

    protected readonly theme = this.themeService.theme;

    protected setTheme(t: Theme): void {
        this.themeService.setTheme(t);
    }

    protected readonly todos = resource({
        loader: async () => {
            const { data, error } = await this.supabase.client
                .from('todos')
                .select('id, created_at, title')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        },
    });
}
