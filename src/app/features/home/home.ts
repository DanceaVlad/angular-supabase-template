import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <main class="container mx-auto px-4 py-8">
            <p class="text-muted-foreground">Welcome home.</p>
        </main>
    `,
})
export class HomePage {}
