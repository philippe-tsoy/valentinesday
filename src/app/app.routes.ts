import { Routes } from '@angular/router';
import { ValentinePageComponent } from './pages/valentine-page/valentine-page.component';
import { HangmanGameComponent } from './pages/hangman-game/hangman-game.component';

export const routes: Routes = [
    { path: 'home', component: HangmanGameComponent },
    { path: 'valentine-page', component: ValentinePageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
    { path: '**', redirectTo: '/home' } // Wildcard route for unknown paths
];
