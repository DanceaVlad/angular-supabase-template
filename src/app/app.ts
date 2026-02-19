import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan/button';
import { HlmIconImports } from '@spartan/icon';

import { SupabaseService } from './shared/services/supabase.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    imports: [HlmButtonImports, HlmIconImports],
    providers: [provideIcons({ lucideChevronRight })],
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
