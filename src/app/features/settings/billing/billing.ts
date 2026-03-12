import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmButtonImports } from '@spartan/button';
import { HlmSeparatorImports } from '@spartan/separator';

@Component({
    selector: 'app-settings-billing',
    templateUrl: './billing.html',
    imports: [HlmButtonImports, HlmSeparatorImports],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsBillingPage {}
