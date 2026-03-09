import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButtonImports } from '@spartan/button';
import { SupabaseService } from '../../../shared/services/supabase.service';

@Component({
    selector: 'app-sign-up',
    imports: [HlmButtonImports, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <main
            class="container mx-auto flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4"
        >
            <div class="w-full max-w-sm space-y-6">
                <div class="space-y-1">
                    <h1 class="text-2xl font-semibold">Sign up</h1>
                    <p class="text-sm text-muted-foreground">Create your account</p>
                </div>
                <p class="text-sm text-muted-foreground">
                    Already have an account?
                    <a hlmBtn variant="link" class="px-0" routerLink="/auth/sign-in">Sign in</a>
                </p>
            </div>
        </main>
    `,
})
export class SignUpPage {
    private supabase: SupabaseService = inject(SupabaseService);
}
