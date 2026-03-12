import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HlmButtonImports } from '@spartan/button';
import { HlmInputImports } from '@spartan/input';
import { HlmLabelImports } from '@spartan/label';
import { HlmSeparatorImports } from '@spartan/separator';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-settings-profile',
    templateUrl: './profile.html',
    imports: [HlmButtonImports, HlmInputImports, HlmLabelImports, HlmSeparatorImports],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsProfilePage {
    protected readonly user = inject(AuthService).user;
}
