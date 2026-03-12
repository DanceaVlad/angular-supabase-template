import type { Routes } from '@angular/router';

export const settingsRoutes: Routes = [
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
    },
    {
        path: 'profile',
        loadComponent: () => import('./profile/profile').then((m) => m.SettingsProfilePage),
    },
    {
        path: 'account',
        loadComponent: () => import('./account/account').then((m) => m.SettingsAccountPage),
    },
    {
        path: 'security',
        loadComponent: () => import('./security/security').then((m) => m.SettingsSecurityPage),
    },
    {
        path: 'billing',
        loadComponent: () => import('./billing/billing').then((m) => m.SettingsBillingPage),
    },
];
