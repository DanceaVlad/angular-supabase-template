import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideMailCheck } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan/button';
import { HlmIconImports } from '@spartan/icon';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-sign-up-confirm',
    templateUrl: './confirm.html',
    imports: [HlmButtonImports, HlmIconImports, RouterLink],
    providers: [provideIcons({ lucideMailCheck })],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpConfirmPage {
    private readonly document = inject(DOCUMENT);

    protected readonly email: string | null =
        (this.document.defaultView?.history.state as { email?: string } | null)?.email ?? null;
}
