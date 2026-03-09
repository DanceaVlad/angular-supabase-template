import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideMenu, lucideSettings } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan/button';
import { HlmIconImports } from '@spartan/icon';
import { HlmDropdownMenuImports } from '@spartan/dropdown-menu';

import { ThemeService } from './shared/services/theme.service';
import { type Theme } from './shared/types/theme.type';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    imports: [HlmButtonImports, HlmIconImports, HlmDropdownMenuImports, RouterOutlet, RouterLink],
    providers: [provideIcons({ lucideMenu, lucideSettings })],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
    private readonly themeService = inject(ThemeService);

    protected readonly theme = this.themeService.theme;

    protected setTheme(t: Theme): void {
        this.themeService.setTheme(t);
    }
}
