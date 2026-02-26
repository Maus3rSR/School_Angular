import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  templateUrl: './app.template.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly nomApplication = 'WishFlix';
}
