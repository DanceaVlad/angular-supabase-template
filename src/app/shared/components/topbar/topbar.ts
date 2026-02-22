import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideLogIn, lucideMenu, lucideSettings } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan/button';
import { HlmIconImports } from '@spartan/icon';

@Component({
    selector: 'app-topbar',
    imports: [HlmButtonImports, HlmIconImports],
    providers: [provideIcons({ lucideMenu, lucideLogIn, lucideSettings })],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'block',
    },
    template: `
        <header
            class="bg-background border-border flex h-14 items-center border-b px-4"
            role="banner"
        >
            <nav class="flex w-full items-center" aria-label="Main navigation">
                <button
                    hlmBtn
                    variant="ghost"
                    size="icon-sm"
                    type="button"
                    aria-label="Toggle sidebar"
                    (click)="sidebarToggle.emit()"
                >
                    <ng-icon hlm name="lucideMenu" size="sm" />
                </button>

                <div class="flex-1" aria-hidden="true"></div>

                <div class="flex items-center gap-2">
                    <button hlmBtn variant="default" size="sm" type="button">
                        <ng-icon hlm name="lucideLogIn" size="sm" />
                        Sign in
                    </button>
                    <button
                        hlmBtn
                        variant="ghost"
                        size="icon-sm"
                        type="button"
                        aria-label="Settings"
                    >
                        <ng-icon hlm name="lucideSettings" size="sm" />
                    </button>
                </div>
            </nav>
        </header>
    `,
})
export class Topbar {
    readonly sidebarToggle = output<void>();
}
