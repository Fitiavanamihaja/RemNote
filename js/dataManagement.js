let notes = JSON.parse(localStorage.getItem("notes")) || [];
let currentNoteId = null;
let currentSortMethod = "date-desc";
let activeTagFilter = null;

// Generate a unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Save notes to localStorage
function saveNotes() {
  try {
    localStorage.setItem("notes", JSON.stringify(notes));
  } catch (error) {
    console.error("Error saving notes to localStorage:", error);
  }
}

// Create a new note
function createNote(title, content, tags) {
  const newNote = {
    id: generateId(),
    title: title || "Sans titre",
    content: content || "",
    tags: tags || [],
    createdAt: new Date().toISOString(),
  };
  notes.unshift(newNote);
  saveNotes();
  return newNote;
}

// Update an existing note
function updateNote(id, title, content, tags) {
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title: title || "Sans titre",
      content: content || "",
      tags: tags || [],
      updatedAt: new Date().toISOString(),
    };
    saveNotes();
    return notes[index];
  }
  return null;
}

// Delete a note
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
}

// Get all unique tags from notes
function getAllTags() {
  const allTags = new Set();
  notes.forEach((note) => {
    note.tags.forEach((tag) => allTags.add(tag));
  });
  return Array.from(allTags);
}

// Count notes with a specific tag
function countNotesByTag(tag) {
  return notes.filter((note) => note.tags.includes(tag)).length;
}

// Filter notes by search term and/or tag
function filterNotes(searchTerm, tag) {
  let filtered = [...notes];
  if (tag) {
    filtered = filtered.filter((note) => note.tags.includes(tag));
  }
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (note) =>
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term) ||
        note.tags.some((tag) => tag.toLowerCase().includes(term))
    );
  }
  return filtered;
}

// Sort notes by different criteria
function sortNotes(notesToSort, method) {
  const sorted = [...notesToSort];
  switch (method) {
    case "date-desc":
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case "date-asc":
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case "alpha":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }
  return sorted;
}

// Format date for display
function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Date inconnue";
  }
}

// Define appData
const appData = {
  notes,
  createNote,
  updateNote,
  deleteNote,
  getAllTags,
  countNotesByTag,
  filterNotes,
  sortNotes,
  formatDate,
  getCurrentNoteId: () => currentNoteId,
  setCurrentNoteId: (id) => {
    currentNoteId = id;
  },
  getCurrentSortMethod: () => currentSortMethod,
  setCurrentSortMethod: (method) => {
    currentSortMethod = method;
  },
  getActiveTagFilter: () => activeTagFilter,
  setActiveTagFilter: (tag) => {
    activeTagFilter = tag;
  },
};

// Export for module usage
export { appData };