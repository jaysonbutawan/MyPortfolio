import { Component } from '@angular/core';
import { NavbarComponent } from '../nav-bar/nav-bar';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, NavbarComponent, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

}
