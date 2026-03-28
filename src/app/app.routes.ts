import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',                    // ← root "/" loads the hero
        loadComponent: () =>
          import('./modules/home/home-module').then(m => m.HomeComponent),
      },
      // When you need other pages later:
      // {
      //   path: 'books',
      //   loadComponent: () =>
      //     import('./features/books/book-list/book-list').then(m => m.BookList),
      // },
    ],
  },
  { path: '**', redirectTo: '' },   // ← catch-all fallback
];
