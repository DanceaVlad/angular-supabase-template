import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
    protected readonly title = signal('angular-supabase-template');
}
