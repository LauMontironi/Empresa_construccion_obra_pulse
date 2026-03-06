import { Component } from '@angular/core';
import { Footer } from '../../component/Shared/footer/footer';
import { Navbar } from '../../component/Shared/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [Footer, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
