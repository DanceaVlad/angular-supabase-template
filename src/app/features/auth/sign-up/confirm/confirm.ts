import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideMailCheck } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan/button';
import { HlmIconImports } from '@spartan/icon';

@Component({
    selector: 'app-sign-up-confirm',
    templateUrl: './confirm.html',
    imports: [HlmButtonImports, HlmIconImports, RouterLink],
    providers: [provideIcons({ lucideMailCheck })],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpConfirmPage {
    protected readonly email = input<string | null>(null);
}
