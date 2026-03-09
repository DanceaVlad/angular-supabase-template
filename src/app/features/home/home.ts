import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan/button';
import { HlmIconImports } from '@spartan/icon';

import { SupabaseService } from '../../shared/services/supabase.service';

@Component({
    selector: 'app-home',
    imports: [HlmButtonImports, HlmIconImports],
    providers: [provideIcons({ lucideChevronRight })],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <main class="container mx-auto px-4 py-8">
            <button hlmBtn size="icon" class="size-8">
                <ng-icon hlm size="sm" name="lucideChevronRight" />
            </button>
            @if (todos.isLoading()) {
                <p>Loading...</p>
            } @else if (todos.error()) {
                <p>Failed to load todos.</p>
            } @else {
                @for (todo of todos.value(); track todo.id) {
                    <p>{{ todo.title }}</p>
                } @empty {
                    <p>No todos yet.</p>
                }
            }
        </main>
    `,
})
export class HomePage {
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
