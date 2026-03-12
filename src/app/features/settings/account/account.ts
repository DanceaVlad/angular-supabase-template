import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmButtonImports } from '@spartan/button';
import { HlmSeparatorImports } from '@spartan/separator';

@Component({
    selector: 'app-settings-account',
    templateUrl: './account.html',
    imports: [HlmButtonImports, HlmSeparatorImports],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsAccountPage {}
