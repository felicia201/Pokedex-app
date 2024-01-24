import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';


export const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'pokemon-detail/:name', component: PokemonDetailComponent },
  { path: '', redirectTo: '/pokemon-list', pathMatch: 'full' },
];