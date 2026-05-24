export interface ScanHistoryItem {
  id: string; // Unique scan key
  mode: 'single' | 'compare';
  urls: string[];
  repoNames: string[];
  timestamp: number;
  grade: string; // Overall health grade
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
    // Bring existing item to top of history
    const filtered = history.filter(h => h.id !== item.id);
    filtered.unshift({ ...item, timestamp: Date.now() });
    
    // Enforce scan history size limit
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
