import type { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home').then((m) => m.HomePage),
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
    },
    {
        path: 'settings',
        loadComponent: () =>
            import('./features/settings/settings-layout').then((m) => m.SettingsLayout),
        loadChildren: () =>
            import('./features/settings/settings.routes').then((m) => m.settingsRoutes),
    },
];
