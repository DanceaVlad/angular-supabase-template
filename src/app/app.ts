import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
    lucideMenu,
    lucideSettings,
    lucideUser,
    lucideCreditCard,
    lucidePalette,
    lucideSun,
    lucideMoon,
    lucideMonitor,
    lucideLogOut,
} from '@ng-icons/lucide';
import { toast } from 'ngx-sonner';
import { HlmButtonImports } from '@spartan/button';
import { HlmIconImports } from '@spartan/icon';
import { HlmDropdownMenuImports } from '@spartan/dropdown-menu';
import { HlmAvatarImports } from '@spartan/avatar';
import { HlmToasterImports } from '@spartan/sonner';

import { ThemeService } from './shared/services/theme.service';
import { type Theme } from './shared/types/theme.type';
import { AuthService } from './shared/services/auth.service';
import { AuthStatus } from './shared/enums/authStatus.enum';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    imports: [
        HlmButtonImports,
        HlmIconImports,
        HlmDropdownMenuImports,
        HlmAvatarImports,
        HlmToasterImports,
        RouterOutlet,
        RouterLink,
    ],
    providers: [
        provideIcons({
            lucideMenu,
            lucideSettings,
            lucideUser,
            lucideCreditCard,
            lucidePalette,
            lucideSun,
            lucideMoon,
            lucideMonitor,
            lucideLogOut,
        }),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
    private readonly themeService = inject(ThemeService);
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    protected readonly authState = this.authService.state;
    protected readonly theme = this.themeService.theme;
    protected readonly AuthStatus = AuthStatus;

    protected setTheme(t: Theme): void {
        this.themeService.setTheme(t);
    }

    protected async signOut(): Promise<void> {
        await this.authService.signOut();
        await this.router.navigate(['/']);
        toast.success('Signed out successfully');
    }
}
