import { ChangeDetectionStrategy, Component, computed, inject, isDevMode } from '@angular/core';
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
    lucideTerminal,
    lucideUserX,
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
import { SupabaseService } from './shared/services/supabase.service';
import { ProfileService } from './shared/services/profile.service';

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
            lucideTerminal,
            lucideUserX,
        }),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
    private readonly themeService = inject(ThemeService);
    private readonly authService = inject(AuthService);
    private readonly profileService = inject(ProfileService);
    private readonly supabase = inject(SupabaseService);
    private readonly router = inject(Router);

    protected readonly authState = this.authService.state;
    protected readonly theme = this.themeService.theme;
    protected readonly AuthStatus = AuthStatus;
    protected readonly isDevMode = isDevMode();
    protected readonly userInitials = computed(() => {
        const displayName = this.profileService.profile.value()?.display_name?.trim();
        if (displayName) {
            const parts = displayName.split(/\s+/);
            if (parts.length >= 2) {
                return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
            }
            return displayName.slice(0, 2).toUpperCase();
        }
        return (this.authService.user()?.email ?? '').slice(0, 2).toUpperCase();
    });

    protected setTheme(t: Theme): void {
        this.themeService.setTheme(t);
    }

    protected async signOut(): Promise<void> {
        await this.authService.signOut();
        await this.router.navigate(['/']);
        toast.success('Signed out successfully');
    }

    protected async devSignIn(): Promise<void> {
        const credentials = { email: 'danceavlad@proton.me', password: 'cacado13' };

        const { error } = await this.supabase.client.auth.signInWithPassword(credentials);

        if (error) {
            const { error: signUpError } = await this.supabase.client.auth.signUp(credentials);
            if (signUpError) {
                toast.error(signUpError.message);
                return;
            }
            const { error: retryError } =
                await this.supabase.client.auth.signInWithPassword(credentials);
            if (retryError) {
                toast.error(retryError.message);
                return;
            }
        }

        await this.router.navigate(['/']);
        toast.success('Signed in successfully');
    }

    protected async devDeleteUsers(): Promise<void> {
        const response = await this.supabase.client.functions.invoke<Record<string, never>>('dev-delete-users');
        if (response.error) {
            toast.error('Failed to delete users');
            return;
        }
        toast.success('All users deleted');
    }
}
