import { inject, Injectable, resource } from '@angular/core';

import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class ProfileService {
    private readonly authService = inject(AuthService);
    private readonly supabase = inject(SupabaseService);

    readonly profile = resource({
        params: () => this.authService.user() ?? undefined,
        loader: async ({ params: user }) => {
            const { data } = await this.supabase.client
                .from('profiles')
                .select('display_name, bio, avatar_url')
                .eq('id', user.id)
                .single();
            return data;
        },
    });

    async update(displayName: string, bio: string): Promise<{ error: string | null }> {
        const userId = this.authService.user()?.id;
        if (!userId) return { error: 'Not authenticated' };

        const { error } = await this.supabase.client
            .from('profiles')
            .update({
                display_name: displayName || null,
                bio: bio || null,
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId);

        if (error) return { error: error.message };

        this.profile.reload();
        return { error: null };
    }

    async uploadAvatar(blob: Blob): Promise<{ error: string | null }> {
        const userId = this.authService.user()?.id;
        if (!userId) return { error: 'Not authenticated' };

        const path = `${userId}/avatar.jpg`;

        const { error: uploadError } = await this.supabase.client.storage
            .from('avatars')
            .upload(path, blob, { contentType: 'image/jpeg', upsert: true });

        if (uploadError) return { error: uploadError.message };

        const { data: urlData } = this.supabase.client.storage
            .from('avatars')
            .getPublicUrl(path);

        const { error: updateError } = await this.supabase.client
            .from('profiles')
            .update({ avatar_url: urlData.publicUrl, updated_at: new Date().toISOString() })
            .eq('id', userId);

        if (updateError) return { error: updateError.message };

        this.profile.reload();
        return { error: null };
    }
}
