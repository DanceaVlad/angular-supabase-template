import { ChangeDetectionStrategy, Component, inject, linkedSignal, resource } from '@angular/core';
import { toast } from 'ngx-sonner';
import { HlmButtonImports } from '@spartan/button';
import { HlmInputImports } from '@spartan/input';
import { HlmLabelImports } from '@spartan/label';
import { HlmSeparatorImports } from '@spartan/separator';
import { HlmSpinnerImports } from '@spartan/spinner';

import { AuthService } from '../../../shared/services/auth.service';
import { SupabaseService } from '../../../shared/services/supabase.service';

@Component({
    selector: 'app-settings-profile',
    templateUrl: './profile.html',
    imports: [HlmButtonImports, HlmInputImports, HlmLabelImports, HlmSeparatorImports, HlmSpinnerImports],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsProfilePage {
    private readonly authService = inject(AuthService);
    private readonly supabase = inject(SupabaseService);

    protected readonly user = this.authService.user;

    protected readonly profile = resource({
        request: this.authService.user,
        loader: async ({ request: user }) => {
            if (!user) return null;
            const { data } = await this.supabase.client
                .from('profiles')
                .select('display_name')
                .eq('id', user.id)
                .single();
            return data;
        },
    });

    protected readonly displayName = linkedSignal(
        () => this.profile.value()?.display_name ?? '',
    );

    protected updateDisplayName(event: Event): void {
        this.displayName.set((event.target as HTMLInputElement).value);
    }

    protected async save(): Promise<void> {
        const userId = this.user()?.id;
        if (!userId) return;

        const { error } = await this.supabase.client
            .from('profiles')
            .update({
                display_name: this.displayName() || null,
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId);

        if (error) {
            toast.error(error.message);
            return;
        }

        toast.success('Profile updated');
    }
}
