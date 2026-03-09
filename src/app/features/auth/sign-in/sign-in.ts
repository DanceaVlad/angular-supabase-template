import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { HlmButtonImports } from '@spartan/button';
import { HlmFieldImports } from '@spartan/field';
import { HlmInputImports } from '@spartan/input';

import { SupabaseService } from '../../../shared/services/supabase.service';
import { type SignInModel } from './signInModel.interface';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.html',
    imports: [HlmButtonImports, HlmInputImports, HlmFieldImports, RouterLink, FormField],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPage {
    private readonly supabase = inject(SupabaseService);
    private readonly router = inject(Router);

    protected readonly signInForm = form(signal<SignInModel>({ email: '', password: '' }), (f) => {
        required(f.email, { message: 'Email is required' });
        email(f.email, { message: 'Enter a valid email address' });
        required(f.password, { message: 'Password is required' });
    });

    protected readonly serverError = signal<string | null>(null);

    protected handleSubmit(event: Event): void {
        event.preventDefault();
        this.serverError.set(null);
        void submit(this.signInForm, async (f) => {
            const { email: emailVal, password } = f().value();
            const { error } = await this.supabase.client.auth.signInWithPassword({
                email: emailVal,
                password,
            });
            if (error) {
                this.serverError.set(error.message);
                return undefined;
            }
            await this.router.navigate(['/']);
            return undefined;
        });
    }
}
