export interface ScanHistoryItem {
  id: string; // URL or combination of URLs
  mode: 'single' | 'compare';
  urls: string[];
  repoNames: string[];
  timestamp: number;
  grade: string; // for single, the grade; for compare, maybe the winner's grade or just 'N/A'
}

const HISTORY_KEY = 'repovitals_history';
const MAX_HISTORY = 5;

export function getHistory(): ScanHistoryItem[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.warn('Failed to parse scan history from localStorage', err);
    return [];
  }
}

export function addToHistory(item: Omit<ScanHistoryItem, 'timestamp'>): void {
  try {
    const history = getHistory();
    // Remove if already exists to move to top
    const filtered = history.filter(h => h.id !== item.id);
    filtered.unshift({ ...item, timestamp: Date.now() });
    
    // Keep only latest MAX_HISTORY
    const trimmed = filtered.slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch (err) {
    console.warn('Failed to save scan history to localStorage', err);
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (err) {
    console.warn('Failed to clear scan history from localStorage', err);
  }
}
