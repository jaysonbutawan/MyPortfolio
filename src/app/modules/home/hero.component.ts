import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroOrbComponent } from "./orb.component";



@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, HeroOrbComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent {

}
