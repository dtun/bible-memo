# TinyBase Implementation for Verse Tracking

This document explains how verse reading tracking is implemented using TinyBase.

## Architecture Overview

### File Structure

```
├── constants/
│   └── TinyBase.ts          # Schema constants only
├── utils/
│   ├── tinybase.ts          # Store setup and persister
│   └── verse.ts             # Verse utility functions
├── hooks/
│   └── verse.ts             # Custom hooks for verse operations
├── components/
│   ├── TinyBaseProvider.tsx # Context provider
│   └── AllTheProviders.tsx  # Updated to include TinyBase
├── types/
│   └── index.ts            # TypeScript types
└── app/
    └── bible.tsx           # Updated to use TinyBase hooks
```

### Schema Design

**Table**: `verseReads`

- **Row ID**: `"${book}-${chapter}-${verse}"` (e.g., `"genesis-1-1"`)
- **Columns**:
  - `book`: string (book name)
  - `chapter`: number (chapter number)
  - `verse`: number (verse number)
  - `readStatus`: boolean (true = read, false = unread)
  - `timestamp`: number (when toggled)

### Key Hooks

- `useIsVerseRead(book, chapter, verse)` - Check if a verse is read
- `useToggleVerse(book, chapter)` - Toggle verse read status
- `useChapterReadVerses(book, chapter)` - Get set of read verse numbers for a chapter
- `useChapterProgress(book, chapter, totalVerses)` - Get chapter statistics
- `useMarkAllChapterRead(book, chapter, totalVerses)` - Mark all verses as read
- `useClearChapterRead(book, chapter)` - Clear all read verses in chapter

### Key Utilities

- `createVerseId(book, chapter, verse)` - Generate consistent verse identifiers
- `parseVerseId(verseId)` - Parse verse ID back to components

### Persistence

- **Web**: Uses localStorage via `createLocalPersister` (from `tinybase/persisters/persister-browser`)
- **Mobile**: Uses SQLite via `createExpoSqlitePersister` (from `tinybase/persisters/persister-expo-sqlite`)
  - Database: `bible-memo.db`
  - Mode: JSON (required for MergeableStore compatibility)
  - Table: `bible-memo`
- **Auto-save**: Changes are automatically persisted

### Benefits

1. **Persistent**: Reading progress survives app restarts
2. **Cross-platform**: Works on web and mobile
3. **Performant**: Efficient queries and updates
4. **Organized**: Clean separation of concerns by feature
5. **Extensible**: Easy to add new features like statistics

## File Organization Principles

- **Feature-based structure**: All verse-related code is grouped together
- **Separation by type**: Hooks in `hooks/`, utilities in `utils/`, constants in `constants/`
- **Single responsibility**: Each file has one clear purpose
- **Scalable**: Easy to add new features (e.g., `hooks/book.ts`, `utils/navigation.ts`)

## Usage in Components

```typescript
import {
  useChapterProgress,
  useToggleVerse,
  useIsVerseRead,
} from "@/hooks/verse";
import { createVerseId } from "@/utils/verse";

// In your component
const { readVerses, readCount, totalVerses, progressPercentage } =
  useChapterProgress(book, chapter, totalVerses);
const toggleVerse = useToggleVerse(book, chapter);
const isRead = useIsVerseRead(book, chapter, verse);

// Toggle a verse
toggleVerse(verseNumber);

// Generate a verse ID
const verseId = createVerseId(book, chapter, verse);
```

## Key Implementation Details

### Reactivity

- Uses `useTable()` to subscribe to all data changes in the table
- Individual verses use `useRow()` for granular reactivity
- Memoization with proper dependencies for performance

### Performance Optimizations

- `memo()` wrapper on VerseSquare components
- `useCallback()` for stable function references
- Efficient table queries with proper filtering

### State Management

- No local state - all data lives in TinyBase
- Automatic persistence across app sessions
- Cross-platform data synchronization
