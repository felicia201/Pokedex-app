import { Component } from '@angular/core';
import { OnInit, inject} from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit {
  poke: any;

  constructor(private route: ActivatedRoute, private router: Router,private location: Location, private pokemonService: PokemonService) { }

  goBack(): void {
  this.location.back();
}


ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const pokemonName = params.get('name');
    if (pokemonName) {
      this.pokemonService.getPokemonDetails(pokemonName)
        .subscribe((response: any) => {
          this.poke = response;
        });
    }
  });
}
 
}