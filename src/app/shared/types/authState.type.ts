import { type User } from '@supabase/supabase-js';
import { type AuthStatus } from '../enums/authStatus.enum';

export type AuthState =
    | { status: AuthStatus.LOADING }
    | { status: AuthStatus.AUTHENTICATED; user: User }
    | { status: AuthStatus.UNAUTHENTICATED };
