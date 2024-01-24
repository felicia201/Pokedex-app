import { Component ,OnInit, inject} from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule, FormsModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit {
  pokemon: any[] = [];
  page = 1;
  totalPokemons: number = 0;
  selectedFilter: string | undefined; 
  searchText: string = '';
  types: { type: { name: string } }[] = [];

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.getPokemons();
  }
  

  selectType(type: string): void {
    this.selectedFilter = type;
    
  }

  getPokemons() {
    this.pokemonService.getPokemonList(10, this.page + 0)
      .subscribe((response: any) => {
        this.totalPokemons = response.count;
        response.results.forEach((result: any) => {
          this.pokemonService. getPokemonDetails(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemon.push(uniqResponse);
              console.log(this.pokemon);
            });
        });
      });
  }

   showDetails(pokemonName: string): void {
    this.router.navigate(['/pokemon-detail', pokemonName]);
  }
   


  filterPokemons(): any[] {
    let filteredPokemons = this.pokemon;

    if (this.searchText) {
      filteredPokemons = filteredPokemons.filter(p => p.name.toLowerCase().includes(this.searchText.toLowerCase()));
    }

    if (this.selectedFilter) {
      filteredPokemons = filteredPokemons.filter(p => p.types.some((t: any) => t.type.name === this.selectedFilter));
    }

    return filteredPokemons;
  }

  getPokemonTypes(): string[] {
  const types: string[] = [];

  this.pokemon.forEach(p => {
    p.types.forEach((t: any) => {
      const typeName = t.type.name;
      if (!types.includes(typeName)) {
        types.push(typeName);
      }
    });
  });

  return types;
} 

}
  

