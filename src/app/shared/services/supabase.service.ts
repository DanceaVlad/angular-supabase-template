import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

import type { Database } from '../../../database.types';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
    readonly client = createClient<Database>(
        environment.supabase.url,
        environment.supabase.publishableKey,
    );
}
