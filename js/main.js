/**
 * Main Entry Point
 * Imports and initializes all site modules.
 */
import { initTheme } from './modules/theme.js';
import { initTerminal } from './modules/terminal.js';
import { initNavigation, initDownloads } from './modules/navigation.js';
import { initProjects } from './modules/projects.js';

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // console.log('Initializing Modules...');
    initTheme();
    // initTerminal(); // Disabled: Switched to Game Menu Hero
    initNavigation();
    initDownloads();
    initProjects();
    // console.log('Modules Initialized.');
});
