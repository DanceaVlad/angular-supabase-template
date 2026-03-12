import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmButtonImports } from '@spartan/button';
import { HlmInputImports } from '@spartan/input';
import { HlmLabelImports } from '@spartan/label';
import { HlmSeparatorImports } from '@spartan/separator';

@Component({
    selector: 'app-settings-security',
    templateUrl: './security.html',
    imports: [HlmButtonImports, HlmInputImports, HlmLabelImports, HlmSeparatorImports],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsSecurityPage {}
