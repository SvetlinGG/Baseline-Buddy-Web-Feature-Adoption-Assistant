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
  onCodeInput(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.code.set(value);
  }

  onTypeChange(event: Event) {
    const v = (event.target as HTMLSelectElement).value as 'html' | 'css' | 'js';
    this.type.set(v);
  }

  analyze() {
    console.log('👉 Sending:', { type: this.type(), code: this.code() });
    this.analyzer.analyzeCode(this.type(), this.code()).subscribe({
      next: (res) => {
        console.log('✅ Response:', res);
        this.results.set(res.results ?? []);
      },
      error: (err) => console.error('❌ Error:', err)
    });
  }
}


