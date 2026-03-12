import { inject, Injectable, resource } from '@angular/core';

import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class ProfileService {
    private readonly authService = inject(AuthService);
    private readonly supabase = inject(SupabaseService);

    readonly profile = resource({
        loader: async () => {
            const user = this.authService.user();
            if (!user) return null;
            const { data } = await this.supabase.client
                .from('profiles')
                .select('display_name')
                .eq('id', user.id)
                .single();
            return data;
        },
    });

    async update(displayName: string): Promise<{ error: string | null }> {
        const userId = this.authService.user()?.id;
        if (!userId) return { error: 'Not authenticated' };

        const { error } = await this.supabase.client
            .from('profiles')
            .update({ display_name: displayName || null, updated_at: new Date().toISOString() })
            .eq('id', userId);

        if (error) return { error: error.message };

        this.profile.reload();
        return { error: null };
    }
}
