import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
  isNavOpen = false;
  isDarkMode = true;

  ngOnInit() {
    // Check for saved theme preference or respect prefers-color-scheme
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (savedTheme) {
        this.isDarkMode = savedTheme === 'dark';
      } else {
        this.isDarkMode = prefersDark;
      }

      this.applyTheme(this.isDarkMode);
    }
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme(this.isDarkMode);

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
  }

  private applyTheme(isDark: boolean) {
    if (typeof window !== 'undefined') {
      const theme = isDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);

      // Force a reflow to ensure CSS variables update
      document.documentElement.style.setProperty('--color-bg', isDark ? '#0f172a' : '#f9fafb');
      document.documentElement.style.setProperty('--color-text', isDark ? '#e5e7eb' : '#111827');
      document.documentElement.style.setProperty('--color-primary', isDark ? '#38bdf8' : '#2563eb');
    }
  }

  closeNavOnClick() {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      this.isNavOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      this.isNavOpen = false;
    }
  }
}
