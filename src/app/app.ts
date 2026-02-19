import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';

import { SupabaseService } from './core/supabase.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
    private readonly supabase = inject(SupabaseService);

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
