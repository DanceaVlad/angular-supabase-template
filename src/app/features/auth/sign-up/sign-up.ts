import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { email, form, FormField, minLength, required, submit } from '@angular/forms/signals';
import { HlmButtonImports } from '@spartan/button';
import { HlmFieldImports } from '@spartan/field';
import { HlmInputImports } from '@spartan/input';

import { SupabaseService } from '../../../shared/services/supabase.service';
import { type SignUpModel } from './signUpModel.interface';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.html',
    imports: [HlmButtonImports, HlmInputImports, HlmFieldImports, RouterLink, FormField],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpPage {
    private readonly supabase = inject(SupabaseService);
    private readonly router = inject(Router);

    protected readonly serverError = signal<string | null>(null);

    protected readonly signUpForm = form(
        signal<SignUpModel>({ email: '', password: '', confirmPassword: '' }),
        (f) => {
            required(f.email, { message: 'Email is required' });
            email(f.email, { message: 'Enter a valid email address' });
            required(f.password, { message: 'Password is required' });
            minLength(f.password, 8, { message: 'Password must be at least 8 characters' });
            required(f.confirmPassword, { message: 'Please confirm your password' });
        },
    );

    protected handleSubmit(event: Event): void {
        event.preventDefault();
        this.serverError.set(null);
        void submit(this.signUpForm, async (f) => {
            const { email: emailVal, password, confirmPassword } = f().value();
            if (confirmPassword !== password) {
                this.serverError.set('Passwords do not match');
                return undefined;
            }
            const { error } = await this.supabase.client.auth.signUp({
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
