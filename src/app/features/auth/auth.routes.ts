import type { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: 'sign-in',
        loadComponent: () => import('./sign-in/sign-in').then((m) => m.SignInPage),
    },
    {
        path: 'sign-up',
        loadComponent: () => import('./sign-up/sign-up').then((m) => m.SignUpPage),
    },
    {
        path: 'sign-up/confirm',
        loadComponent: () => import('./sign-up/confirm/confirm').then((m) => m.SignUpConfirmPage),
    },
];
