import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalyzerService } from './services/analyzer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  code = signal<string>('');
  type = signal<'css' | 'js' | 'html'>('css');
  results = signal<any[]>([]);

  constructor(private analyzer: AnalyzerService) {}

  // analyze(): void {
  //   const results: { message: string; mdn: string }[] = [];
  //   const codeValue = this.code();
  //   const typeValue = this.type();
  // }
  analyze() {
    this.analyzer.analyzeCode(this.type(), this.code()).subscribe({
      next: (res) => {
        console.log('Response from backend:', res); 
        this.results.set(res.results);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}
