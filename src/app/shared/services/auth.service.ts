import { computed, inject, Injectable, signal } from '@angular/core';

import { SupabaseService } from './supabase.service';
import { type AuthState } from '../types/authState.type';
import { AuthStatus } from '../enums/authStatus.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly supabase = inject(SupabaseService);
    private readonly _state = signal<AuthState>({ status: AuthStatus.LOADING });

    readonly state = this._state.asReadonly();
    readonly user = computed(() => {
        const s = this._state();
        return s.status === AuthStatus.AUTHENTICATED ? s.user : null;
    });
    readonly isAuthenticated = computed(() => this._state().status === AuthStatus.AUTHENTICATED);
    readonly isLoading = computed(() => this._state().status === AuthStatus.LOADING);

    constructor() {
        void this.supabase.client.auth.getSession().then(({ data: { session } }) => {
            this._state.set(
                session
                    ? { status: AuthStatus.AUTHENTICATED, user: session.user }
                    : { status: AuthStatus.UNAUTHENTICATED },
            );
        });

        this.supabase.client.auth.onAuthStateChange((_event, session) => {
            this._state.set(
                session
                    ? { status: AuthStatus.AUTHENTICATED, user: session.user }
                    : { status: AuthStatus.UNAUTHENTICATED },
            );
        });
    }

    async signOut(): Promise<void> {
        await this.supabase.client.auth.signOut();
    }
}
