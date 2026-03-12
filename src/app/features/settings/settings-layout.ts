import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-settings-layout',
    templateUrl: './settings-layout.html',
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsLayout {
    protected readonly navItems = [
        { label: 'Profile', route: '/settings/profile' },
        { label: 'Account', route: '/settings/account' },
        { label: 'Security', route: '/settings/security' },
        { label: 'Billing', route: '/settings/billing' },
    ] as const;
}
