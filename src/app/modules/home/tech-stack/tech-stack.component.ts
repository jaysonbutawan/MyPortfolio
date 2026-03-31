import {
  Component,
  OnInit,
  OnDestroy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subject, takeUntil, catchError, of } from 'rxjs';

interface TechIcon {
  name: string;
  iconClass: string;
  color: string;
}

// What your API returns — just the name
interface ApiTech {
  name: string;
}

@Component({
  selector: 'app-tech-stack-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.css',
})
export class TechStackBarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  techIcons = signal<TechIcon[]>([]);
  isLoading = signal(true);
  isPaused = signal(false);

  // ============================================================
  // ICON REGISTRY — maps a tech name to its Devicon class + color.
  // Keys are LOWERCASE so matching is case-insensitive.
  // Add new entries here when you adopt a new tool.
  // ============================================================
  private iconRegistry: Record<string, { iconClass: string; color: string }> = {
    'html':           { iconClass: 'devicon-html5-plain',             color: '#e34f26' },
    'html5':          { iconClass: 'devicon-html5-plain',             color: '#e34f26' },
    'css':            { iconClass: 'devicon-css3-plain',              color: '#1572b6' },
    'css3':           { iconClass: 'devicon-css3-plain',              color: '#1572b6' },
    'javascript':     { iconClass: 'devicon-javascript-plain',        color: '#f7df1e' },
    'js':             { iconClass: 'devicon-javascript-plain',        color: '#f7df1e' },
    'typescript':     { iconClass: 'devicon-typescript-plain',        color: '#3178c6' },
    'ts':             { iconClass: 'devicon-typescript-plain',        color: '#3178c6' },
    'angular':        { iconClass: 'devicon-angular-plain',           color: '#dd0031' },
    'react':          { iconClass: 'devicon-react-original',          color: '#61dafb' },
    'vue':            { iconClass: 'devicon-vuejs-plain',             color: '#4fc08d' },
    'vuejs':          { iconClass: 'devicon-vuejs-plain',             color: '#4fc08d' },
    'nextjs':         { iconClass: 'devicon-nextjs-plain',            color: '#8a94a8' },
    'nuxtjs':         { iconClass: 'devicon-nuxtjs-plain',           color: '#00dc82' },
    'svelte':         { iconClass: 'devicon-svelte-plain',            color: '#ff3e00' },
    'php':            { iconClass: 'devicon-php-plain',               color: '#777bb4' },
    'laravel':        { iconClass: 'devicon-laravel-original',        color: '#ff2d20' },
    'mysql':          { iconClass: 'devicon-mysql-plain',             color: '#4479a1' },
    'postgresql':     { iconClass: 'devicon-postgresql-plain',        color: '#336791' },
    'postgres':       { iconClass: 'devicon-postgresql-plain',        color: '#336791' },
    'mongodb':        { iconClass: 'devicon-mongodb-plain',           color: '#47a248' },
    'redis':          { iconClass: 'devicon-redis-plain',             color: '#dc382d' },
    'sqlite':         { iconClass: 'devicon-sqlite-plain',            color: '#003b57' },
    'git':            { iconClass: 'devicon-git-plain',               color: '#f05032' },
    'github':         { iconClass: 'devicon-github-original',         color: '#8a94a8' },
    'gitlab':         { iconClass: 'devicon-gitlab-plain',            color: '#fc6d26' },
    'docker':         { iconClass: 'devicon-docker-plain',            color: '#2496ed' },
    'kubernetes':     { iconClass: 'devicon-kubernetes-plain',        color: '#326ce5' },
    'nodejs':         { iconClass: 'devicon-nodejs-plain',            color: '#339933' },
    'node':           { iconClass: 'devicon-nodejs-plain',            color: '#339933' },
    'node.js':        { iconClass: 'devicon-nodejs-plain',            color: '#339933' },
    'express':        { iconClass: 'devicon-express-original',        color: '#8a94a8' },
    'expressjs':      { iconClass: 'devicon-express-original',        color: '#8a94a8' },
    'npm':            { iconClass: 'devicon-npm-original-wordmark',   color: '#cb3837' },
    'yarn':           { iconClass: 'devicon-yarn-plain',              color: '#2c8ebb' },
    'tailwind':       { iconClass: 'devicon-tailwindcss-original',    color: '#06b6d4' },
    'tailwindcss':    { iconClass: 'devicon-tailwindcss-original',    color: '#06b6d4' },
    'bootstrap':      { iconClass: 'devicon-bootstrap-plain',         color: '#7952b3' },
    'sass':           { iconClass: 'devicon-sass-original',           color: '#cc6699' },
    'scss':           { iconClass: 'devicon-sass-original',           color: '#cc6699' },
    'less':           { iconClass: 'devicon-less-plain-wordmark',     color: '#1d365d' },
    'figma':          { iconClass: 'devicon-figma-plain',             color: '#f24e1e' },
    'vscode':         { iconClass: 'devicon-vscode-plain',            color: '#007acc' },
    'vs code':        { iconClass: 'devicon-vscode-plain',            color: '#007acc' },
    'python':         { iconClass: 'devicon-python-plain',            color: '#3776ab' },
    'java':           { iconClass: 'devicon-java-plain',              color: '#007396' },
    'csharp':         { iconClass: 'devicon-csharp-plain',            color: '#239120' },
    'c#':             { iconClass: 'devicon-csharp-plain',            color: '#239120' },
    'go':             { iconClass: 'devicon-go-original-wordmark',    color: '#00add8' },
    'golang':         { iconClass: 'devicon-go-original-wordmark',    color: '#00add8' },
    'rust':           { iconClass: 'devicon-rust-original',           color: '#dea584' },
    'swift':          { iconClass: 'devicon-swift-plain',             color: '#f05138' },
    'kotlin':         { iconClass: 'devicon-kotlin-plain',            color: '#7f52ff' },
    'dart':           { iconClass: 'devicon-dart-plain',              color: '#0175c2' },
    'flutter':        { iconClass: 'devicon-flutter-plain',           color: '#02569b' },
    'firebase':       { iconClass: 'devicon-firebase-plain',          color: '#ffca28' },
    'aws':            { iconClass: 'devicon-amazonwebservices-original', color: '#ff9900' },
    'azure':          { iconClass: 'devicon-azure-plain',             color: '#0078d4' },
    'linux':          { iconClass: 'devicon-linux-plain',             color: '#fcc624' },
    'ubuntu':         { iconClass: 'devicon-ubuntu-plain',            color: '#e95420' },
    'nginx':          { iconClass: 'devicon-nginx-original',          color: '#009639' },
    'apache':         { iconClass: 'devicon-apache-plain',            color: '#d22128' },
    'wordpress':      { iconClass: 'devicon-wordpress-plain',         color: '#21759b' },
    'graphql':        { iconClass: 'devicon-graphql-plain',           color: '#e10098' },
    'redux':          { iconClass: 'devicon-redux-original',          color: '#764abc' },
    'rxjs':           { iconClass: 'devicon-rxjs-plain',              color: '#b7178c' },
    'jest':           { iconClass: 'devicon-jest-plain',              color: '#c21325' },
    'webpack':        { iconClass: 'devicon-webpack-plain',           color: '#8dd6f9' },
    'vite':           { iconClass: 'devicon-vitejs-plain',            color: '#646cff' },
    'postman':        { iconClass: 'devicon-postman-plain',           color: '#ff6c37' },
    'jira':           { iconClass: 'devicon-jira-plain',              color: '#0052cc' },
    'confluence':     { iconClass: 'devicon-confluence-plain',        color: '#172b4d' },
    'slack':          { iconClass: 'devicon-slack-plain',             color: '#4a154b' },
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTechStack();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadTechStack(): void {
    // Your API returns: [{ "name": "TailwindCSS" }, { "name": "CSS" }, ...]
    // Or with full data: [{ "name": "Tailwind", "iconClass": "...", "color": "..." }]
    this.http
      .get<ApiTech[]>('/api/tech-stack')
      .pipe(
        takeUntil(this.destroy$),
        catchError(() => {
          // Fallback: use all icons from registry
          return of(this.getDefaultIcons());
        })
      )
      .subscribe((apiTechs) => {
        const icons = this.mapToIcons(apiTechs);
        this.techIcons.set(icons);
        this.isLoading.set(false);
      });
  }

  /**
   * Maps API response to full TechIcon objects using the registry.
   * If the API returns just { name: "TailwindCSS" },
   * it looks up "tailwindcss" in the registry and returns the full icon data.
   */
  private mapToIcons(apiTechs: ApiTech[]): TechIcon[] {
    return apiTechs
      .map((tech) => {
        const key = tech.name.toLowerCase().trim();
        const match = this.iconRegistry[key];

        if (match) {
          return {
            name: tech.name,
            iconClass: match.iconClass,
            color: match.color,
          };
        }

        // No match found — return a generic code icon
        return {
          name: tech.name,
          iconClass: 'devicon-devicon-plain',
          color: '#8a94a8',
        };
      });
  }

  /** Returns a default set of icons when API is unavailable */
  private getDefaultIcons(): ApiTech[] {
    return [
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'Angular' },
      { name: 'PHP' },
      { name: 'Laravel' },
      { name: 'MySQL' },
      { name: 'Git' },
      { name: 'Node.js' },
      { name: 'Docker' },
      { name: 'TailwindCSS' },
      { name: 'Sass' },
      { name: 'PostgreSQL' },
      { name: 'GitHub' },
      { name: 'VS Code' },
      { name: 'Figma' },
      { name: 'Bootstrap' },
      { name: 'npm' },
    ];
  }

  onMarqueeEnter(): void {
    this.isPaused.set(true);
  }

  onMarqueeLeave(): void {
    this.isPaused.set(false);
  }
}
