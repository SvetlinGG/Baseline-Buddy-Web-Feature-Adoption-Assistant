import { Component } from '@angular/core';
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
  code = '';
  type: 'css' | 'js' | 'html' = 'css';
  results: any[] = [];

  constructor(private analyzer: AnalyzerService) {}

  analyze(){
    this.analyzer.analyzeCode(this.type, this.code).subscribe(res => {
      this.results = res.results;
    });
  }
}
