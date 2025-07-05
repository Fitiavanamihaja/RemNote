import { appData } from './dataManagement.js';

document.addEventListener("DOMContentLoaded", function () {
  // Verify appData is available
  if (!appData) {
    console.error("appData est introuvable !");
    // Defer showToast until elements is defined
    const errorMessage = "Erreur : appData non chargé";
    setTimeout(() => showToast(errorMessage, "error"), 0);
    return;
  }

  // DOM Elements
  const elements = {
    notesContainer: document.getElementById("notes-container"),
    notesGrid: document.getElementById("notes-grid"),
    emptyState: document.getElementById("empty-state"),
    editorContainer: document.getElementById("editor-container"),
    viewContainer: document.getElementById("view-container"),
    noteTitle: document.getElementById("note-title"),
    noteContent: document.getElementById("note-content"),
    noteTagsInput: document.getElementById("note-tags"),
    noteTagsContainer: document.getElementById("note-tags-container"),
    tagsListContainer: document.getElementById("tags-list"),
    searchInput: document.getElementById("search-input"),
    notesCountElement: document.getElementById("notes-count"),
    markdownPreview: document.getElementById("markdown-preview"),
    deleteModal: document.getElementById("delete-modal"),
    toast: document.getElementById("toast"),
    toastMessage: document.getElementById("toast-message"),
    toastIcon: document.getElementById("toast-icon"),
    newNoteBtn: document.getElementById("new-note-btn"),
    emptyNewNoteBtn: document.getElementById("empty-new-note-btn"),
    saveNoteBtn: document.getElementById("save-note-btn"),
    cancelEditBtn: document.getElementById("cancel-edit-btn"),
    addTagBtn: document.getElementById("add-tag-btn"),
    sortDateDescBtn: document.getElementById("sort-date-desc"),
    sortDateAscBtn: document.getElementById("sort-date-asc"),
    sortAlphaBtn: document.getElementById("sort-alpha"),
    cancelDeleteBtn: document.getElementById("cancel-delete"),
    confirmDeleteBtn: document.getElementById("confirm-delete"),
    formatBoldBtn: document.getElementById("format-bold"),
    formatItalicBtn: document.getElementById("format-italic"),
    formatHeadingBtn: document.getElementById("format-heading"),
    formatListBtn: document.getElementById("format-list"),
    formatQuoteBtn: document.getElementById("format-quote"),
    viewTitle: document.getElementById("view-title"),
    viewDate: document.getElementById("view-date"),
    viewTags: document.getElementById("view-tags"),
    viewContent: document.getElementById("view-content"),
    editorTitleDisplay: document.getElementById("editor-title-display"),
    editorDateDisplay: document.getElementById("editor-date-display"),
    editNoteBtn: document.getElementById("edit-note-btn")
  };

  // Validate DOM elements
  for (const [key, element] of Object.entries(elements)) {
    if (!element) {
      console.error(`DOM element ${key} not found!`);
      showToast(`Erreur : Élément ${key} non trouvé`, "error");
    }
  }

  // Color schemes for tags
  const colorSchemes = [
    { light: "bg-red-100 text-red-800", dark: "bg-red-900 text-red-100" },
    { light: "bg-green-100 text-green-800", dark: "bg-green-900 text-green-100" },
    { light: "bg-yellow-100 text-yellow-800", dark: "bg-yellow-900 text-yellow-100" },
    { light: "bg-blue-100 text-blue-800", dark: "bg-blue-900 text-blue-100" },
    { light: "bg-indigo-100 text-indigo-800", dark: "bg-indigo-900 text-indigo-100" },
    { light: "bg-purple-100 text-purple-800", dark: "bg-purple-900 text-purple-100" },
    { light: "bg-pink-100 text-pink-800", dark: "bg-pink-900 text-pink-100" },
    { light: "bg-teal-100 text-teal-800", dark: "bg-teal-900 text-teal-100" },
    { light: "bg-orange-100 text-orange-800", dark: "bg-orange-900 text-orange-100" },
  ];

  const isDark = document.documentElement.classList.contains("dark");
  const randomScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
  const colorClass = isDark ? randomScheme.dark : randomScheme.light;

  // Render the notes grid
  function renderNotes() {
    try {
      const searchTerm = elements.searchInput?.value.trim() || "";
      const tagFilter = appData.getActiveTagFilter ? appData.getActiveTagFilter() : null;
      const filteredNotes = appData.filterNotes(searchTerm, tagFilter);
      const sortedNotes = appData.sortNotes(filteredNotes, appData.getCurrentSortMethod());
      if (elements.notesGrid) {
        elements.notesGrid.innerHTML = "";
      }
      if (sortedNotes.length === 0) {
        if (elements.notesGrid) elements.notesGrid.classList.add("hidden");
        if (elements.emptyState) elements.emptyState.classList.remove("hidden");
      } else {
        if (elements.notesGrid) elements.notesGrid.classList.remove("hidden");
        if (elements.emptyState) elements.emptyState.classList.add("hidden");
        sortedNotes.forEach((note) => {
          const noteCard = document.createElement("div");
          noteCard.className =
            "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden";
          noteCard.dataset.noteId = note.id;
          const contentPreview =
            note.content.length > 100
              ? note.content.substring(0, 100) + "..."
              : note.content;
          noteCard.innerHTML = `
            <div class="p-4">
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-medium text-lg text-gray-900 dark:text-gray-100">${note.title}</h3>
                <div class="flex">
                  <button class="edit-note-btn p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded !rounded-button whitespace-nowrap">
                    <div class="w-5 h-5 flex items-center justify-center">
                      <i class="ri-edit-line text-gray-900 dark:text-gray-100"></i>
                    </div>
                  </button>
                  <button class="delete-note-btn p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded !rounded-button whitespace-nowrap">
                    <div class="w-5 h-5 flex items-center justify-center">
                      <i class="ri-delete-bin-line text-gray-900 dark:text-gray-100"></i>
                    </div>
                  </button>
                </div>
              </div>
              <p class="text-gray-500 dark:text-gray-400 text-sm mb-3">${appData.formatDate(note.createdAt)}</p>
              <p class="text-gray-700 dark:text-gray-100 mb-3 whitespace-pre-line">${contentPreview.replace(/[#*_>-]/g, "")}</p>
              <div class="flex flex-wrap gap-1">
                ${note.tags.map((tag) => `<span class="${colorClass} text-xs px-2 py-1 rounded">#${tag}</span>`).join("")}
              </div>
            </div>
          `;
          noteCard.addEventListener("click", function (e) {
            if (!e.target.closest("button")) {
              openNoteInView(note.id);
            }
          });
          noteCard.querySelector(".edit-note-btn").addEventListener("click", function (e) {
            e.stopPropagation();
            openNoteInEditor(note.id);
          });
          noteCard.querySelector(".delete-note-btn").addEventListener("click", function (e) {
            e.stopPropagation();
            openDeleteModal(note.id);
          });
          if (elements.notesGrid) elements.notesGrid.appendChild(noteCard);
        });
      }
      if (elements.notesCountElement) elements.notesCountElement.textContent = sortedNotes.length;
    } catch (error) {
      console.error("Error rendering notes:", error);
      showToast(`Erreur lors du rendu des notes : ${error.message}`, "error");
    }
  }

  // Render all tags in the sidebar
  function renderTags() {
    try {
      const allTags = appData.getAllTags();
      const activeTag = appData.getActiveTagFilter ? appData.getActiveTagFilter() : null;
      if (elements.tagsListContainer) elements.tagsListContainer.innerHTML = "";
      allTags.forEach((tag) => {
        const tagCount = appData.countNotesByTag(tag);
        const tagElement = document.createElement("button");
        tagElement.className = `text-xs px-3 py-1.5 rounded-full flex items-center gap-1 !rounded-button whitespace-nowrap ${
          activeTag === tag
            ? "bg-primary text-white"
            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
        }`;
        tagElement.innerHTML = `
          <span>#${tag}</span>
          <span class="bg-white dark:bg-gray-800 bg-opacity-20 dark:bg-opacity-20 text-xs rounded-full w-5 h-5 inline-flex items-center justify-center text-gray-700 dark:text-gray-100">${tagCount}</span>
        `;
        tagElement.addEventListener("click", function () {
          if (activeTag === tag) {
            appData.setActiveTagFilter(null);
          } else {
            appData.setActiveTagFilter(tag);
          }
          renderTags();
          renderNotes();
        });
        if (elements.tagsListContainer) elements.tagsListContainer.appendChild(tagElement);
      });
    } catch (error) {
      console.error("Error rendering tags:", error);
      showToast(`Erreur lors du rendu des tags : ${error.message}`, "error");
    }
  }

  // Open a note in view mode
  window.openNoteInView = function (noteId) {
    try {
      const note = appData.notes.find((n) => n.id === noteId);
      if (!note) {
        console.error(`Note with ID ${noteId} not found`);
        showToast("Erreur : Note non trouvée", "error");
        return;
      }
      appData.setCurrentNoteId(noteId);
      if (elements.viewTitle) elements.viewTitle.textContent = note.title;
      if (elements.viewDate) elements.viewDate.textContent = `Créée le ${appData.formatDate(note.createdAt)}`;
      if (elements.viewTags) {
        elements.viewTags.innerHTML = note.tags
          .map((tag) => `<span class="${colorClass} px-2 py-1 rounded text-xs">#${tag}</span>`)
          .join("");
      }
      if (elements.viewContent) {
        if (typeof marked === "undefined") {
          console.error("Marked library is not loaded!");
          elements.viewContent.innerHTML = note.content || "";
        } else {
          elements.viewContent.innerHTML = DOMPurify ? DOMPurify.sanitize(marked.parse(note.content || "")) : marked.parse(note.content || "");
        }
      }
      if (elements.notesContainer) elements.notesContainer.classList.add("hidden");
      if (elements.editorContainer) {
        elements.editorContainer.classList.add("hidden");
        elements.editorContainer.classList.remove("flex");
      }
      if (elements.viewContainer) {
        elements.viewContainer.classList.remove("hidden");
        elements.viewContainer.classList.add("flex");
      }
    } catch (error) {
      console.error("Error opening note in view mode:", error);
      showToast(`Erreur lors de l'ouverture de la note : ${error.message}`, "error");
    }
  };

  // Open a note in the editor
  function openNoteInEditor(noteId) {
    try {
      const note = appData.notes.find((n) => n.id === noteId);
      if (!note) {
        console.error(`Note with ID ${noteId} not found`);
        showToast("Erreur : Note non trouvée", "error");
        return;
      }
      appData.setCurrentNoteId(noteId);
      if (elements.noteTitle) elements.noteTitle.value = note.title;
      if (elements.noteContent) elements.noteContent.value = note.content;
      if (elements.editorTitleDisplay) elements.editorTitleDisplay.textContent = "Modifier la note";
      if (elements.editorDateDisplay) elements.editorDateDisplay.textContent = `Créée le ${appData.formatDate(note.createdAt)}`;
      renderNoteTagsInEditor(note.tags);
      updateMarkdownPreview();
      if (elements.notesContainer) elements.notesContainer.classList.add("hidden");
      if (elements.viewContainer) {
        elements.viewContainer.classList.add("hidden");
        elements.viewContainer.classList.remove("flex");
      }
      if (elements.editorContainer) {
        elements.editorContainer.classList.remove("hidden");
        elements.editorContainer.classList.add("flex");
      }
    } catch (error) {
      console.error("Error opening note in editor:", error);
      showToast(`Erreur lors de l'ouverture de l'éditeur : ${error.message}`, "error");
    }
  }

  // Create a new note and open it in the editor
  function createNewNote() {
    try {
      console.log("Creating new note...");
      const newNote = appData.createNote("Nouvelle note", "", []);
      console.log("New note created:", newNote);
      appData.setCurrentNoteId(newNote.id);

      // Update editor fields
      if (elements.noteTitle) elements.noteTitle.value = newNote.title;
      if (elements.noteContent) elements.noteContent.value = "";
      renderNoteTagsInEditor([]);
      if (elements.editorTitleDisplay) elements.editorTitleDisplay.textContent = "Nouvelle note";
      if (elements.editorDateDisplay) {
        elements.editorDateDisplay.textContent = newNote.createdAt && appData.formatDate
          ? `Créée le ${appData.formatDate(newNote.createdAt)}`
          : "Créée maintenant";
      }

      // Update Markdown preview
      updateMarkdownPreview();

      // Update UI visibility
      if (elements.notesContainer) {
        elements.notesContainer.classList.add("hidden");
      } else {
        console.warn("notesContainer is undefined");
      }
      if (elements.editorContainer) {
        elements.editorContainer.classList.remove("hidden");
        elements.editorContainer.classList.add("flex");
      } else {
        console.warn("editorContainer is undefined");
      }
      if (elements.viewContainer) {
        elements.viewContainer.classList.add("hidden");
        elements.viewContainer.classList.remove("flex");
      } else {
        console.warn("viewContainer is undefined");
      }

      // Focus on title
      if (elements.noteTitle) {
        elements.noteTitle.focus();
      } else {
        console.warn("noteTitle is undefined");
      }

      // Update notes grid and tags
      renderNotes();
      renderTags();
      showToast("Note créée avec succès", "success");
    } catch (error) {
      console.error("Error creating new note:", error);
      showToast(`Erreur lors de la création de la note : ${error.message}`, "error");
      renderNotes();
      renderTags();
    }
  }

  // Save the current note
  function saveCurrentNote() {
    try {
      const noteId = appData.getCurrentNoteId();
      const title = elements.noteTitle?.value.trim() || "Sans titre";
      const content = elements.noteContent?.value.trim() || "";
      const tags = elements.noteTagsContainer
        ? Array.from(elements.noteTagsContainer.querySelectorAll(".tag-item")).map((tag) => tag.dataset.tag)
        : [];
      if (noteId) {
        appData.updateNote(noteId, title, content, tags);
        showToast("Note mise à jour avec succès", "success");
      } else {
        const newNote = appData.createNote(title, content, tags);
        appData.setCurrentNoteId(newNote.id);
        showToast("Note créée avec succès", "success");
      }
      renderNotes();
      renderTags();
      goToNotesList();
    } catch (error) {
      console.error("Error saving note:", error);
      showToast(`Erreur lors de l'enregistrement de la note : ${error.message}`, "error");
    }
  }

  // Return to the notes list view
  function goToNotesList() {
    if (elements.editorContainer) {
      elements.editorContainer.classList.add("hidden");
      elements.editorContainer.classList.remove("flex");
    }
    if (elements.viewContainer) {
      elements.viewContainer.classList.add("hidden");
      elements.viewContainer.classList.remove("flex");
    }
    if (elements.notesContainer) {
      elements.notesContainer.classList.remove("hidden");
    }
    appData.setCurrentNoteId(null);
  }

  // Render tags in the note editor
  function renderNoteTagsInEditor(tags) {
    try {
      if (elements.noteTagsContainer) {
        elements.noteTagsContainer.innerHTML = "";
        tags.forEach((tag) => addTagToEditor(tag));
      }
    } catch (error) {
      console.error("Error rendering note tags:", error);
      showToast(`Erreur lors du rendu des tags : ${error.message}`, "error");
    }
  }

  // Add a tag to the editor
  function addTagToEditor(tag) {
    if (!tag) return;
    const existingTags = elements.noteTagsContainer
      ? Array.from(elements.noteTagsContainer.querySelectorAll(".tag-item")).map((item) => item.dataset.tag)
      : [];
    if (existingTags.includes(tag)) return;
    const tagElement = document.createElement("div");
    tagElement.className = `tag-item ${colorClass} px-2 py-1 rounded flex items-center gap-1`;
    tagElement.dataset.tag = tag;
    tagElement.innerHTML = `
      <span>#${tag}</span>
      <button class="remove-tag-btn w-4 h-4 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full !rounded-button whitespace-nowrap">
        <i class="ri-close-line text-xs text-gray-900 dark:text-gray-100"></i>
      </button>
    `;
    tagElement.querySelector(".remove-tag-btn").addEventListener("click", function () {
      tagElement.remove();
    });
    if (elements.noteTagsContainer) elements.noteTagsContainer.appendChild(tagElement);
  }

  // Update the markdown preview
  function updateMarkdownPreview() {
    try {
      const content = elements.noteContent?.value || "";
      if (typeof marked === "undefined") {
        console.error("Marked library is not loaded!");
        if (elements.markdownPreview) elements.markdownPreview.innerHTML = content;
        return;
      }
      if (elements.markdownPreview) {
        elements.markdownPreview.innerHTML = DOMPurify ? DOMPurify.sanitize(marked.parse(content)) : marked.parse(content);
      }
    } catch (error) {
      console.error("Error updating markdown preview:", error);
      showToast(`Erreur lors de la mise à jour de l'aperçu Markdown : ${error.message}`, "error");
    }
  }

  // Open delete confirmation modal
  function openDeleteModal(noteId) {
    try {
      appData.setCurrentNoteId(noteId);
      if (elements.deleteModal) {
        elements.deleteModal.classList.remove("hidden");
        setTimeout(() => {
          const overlay = elements.deleteModal.querySelector(".modal-overlay");
          const container = elements.deleteModal.querySelector(".modal-container");
          if (overlay) overlay.classList.add("active");
          if (container) container.classList.add("active");
        }, 10);
      }
    } catch (error) {
      console.error("Error opening delete modal:", error);
      showToast(`Erreur lors de l'ouverture de la confirmation : ${error.message}`, "error");
    }
  }

  // Close delete confirmation modal
  function closeDeleteModal() {
    try {
      if (elements.deleteModal) {
        const overlay = elements.deleteModal.querySelector(".modal-overlay");
        const container = elements.deleteModal.querySelector(".modal-container");
        if (overlay) overlay.classList.remove("active");
        if (container) container.classList.remove("active");
        setTimeout(() => {
          elements.deleteModal.classList.add("hidden");
        }, 300);
      }
    } catch (error) {
      console.error("Error closing delete modal:", error);
      showToast(`Erreur lors de la fermeture de la confirmation : ${error.message}`, "error");
    }
  }

  // Delete the current note
  function deleteCurrentNote() {
    try {
      const noteId = appData.getCurrentNoteId();
      if (!noteId) {
        console.error("No note ID set for deletion");
        showToast("Erreur : Aucune note sélectionnée pour suppression", "error");
        closeDeleteModal();
        return;
      }
      const note = appData.notes.find((n) => n.id === noteId);
      if (!note) {
        console.error(`Note with ID ${noteId} not found`);
        showToast("Erreur : Note non trouvée", "error");
        closeDeleteModal();
        return;
      }
      appData.deleteNote(noteId);
      renderNotes();
      renderTags();
      showToast("Note supprimée avec succès", "success");
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting note:", error);
      showToast(`Erreur lors de la suppression de la note : ${error.message}`, "error");
      closeDeleteModal();
    }
  }

  // Show toast notification
  function showToast(message, type = "success") {
    try {
      if (!elements.toast || !elements.toastMessage || !elements.toastIcon) {
        console.error("Toast elements are missing");
        return;
      }
      elements.toastMessage.textContent = message;
      if (type === "success") {
        elements.toastIcon.className = "ri-check-line";
      } else if (type === "error") {
        elements.toastIcon.className = "ri-error-warning-line";
      } else if (type === "info") {
        elements.toastIcon.className = "ri-information-line";
      }
      elements.toast.classList.remove("hidden");
      elements.toast.classList.add("toast-enter");
      setTimeout(() => {
        elements.toast.classList.remove("toast-enter");
        elements.toast.classList.add("toast-exit");
        setTimeout(() => {
          elements.toast.classList.add("hidden");
          elements.toast.classList.remove("toast-exit");
        }, 300);
      }, 3000);
    } catch (error) {
      console.error("Error showing toast:", error);
    }
  }

  // Format text in the editor
  function formatText(type) {
    try {
      const textarea = elements.noteContent;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);
      let replacement = "";
      switch (type) {
        case "bold":
          replacement = `**${selectedText}**`;
          break;
        case "italic":
          replacement = `*${selectedText}*`;
          break;
        case "heading":
          replacement = `# ${selectedText}`;
          break;
        case "list":
          replacement = `- ${selectedText}`;
          break;
        case "quote":
          replacement = `> ${selectedText}`;
          break;
      }
      textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
      updateMarkdownPreview();
      textarea.focus();
      textarea.selectionStart = start + replacement.length;
      textarea.selectionEnd = start + replacement.length;
    } catch (error) {
      console.error("Error formatting text:", error);
      showToast(`Erreur lors du formatage du texte : ${error.message}`, "error");
    }
  }

  // Event Listeners
  if (elements.newNoteBtn) elements.newNoteBtn.addEventListener("click", createNewNote);
  if (elements.emptyNewNoteBtn) elements.emptyNewNoteBtn.addEventListener("click", createNewNote);
  if (elements.saveNoteBtn) elements.saveNoteBtn.addEventListener("click", saveCurrentNote);
  if (elements.cancelEditBtn) elements.cancelEditBtn.addEventListener("click", goToNotesList);
  if (elements.editNoteBtn) {
    elements.editNoteBtn.addEventListener("click", function () {
      const noteId = appData.getCurrentNoteId();
      if (noteId) {
        openNoteInEditor(noteId);
      } else {
        console.error("No note ID set for editing");
        showToast("Erreur : Aucune note sélectionnée pour modification", "error");
      }
    });
  }
  if (elements.addTagBtn) {
    elements.addTagBtn.addEventListener("click", function () {
      const tagValue = elements.noteTagsInput?.value.trim();
      if (tagValue) {
        tagValue.split(/\s+/).forEach((tag) => {
          tag = tag.replace(/^#/, "");
          if (tag) {
            addTagToEditor(tag);
          }
        });
        if (elements.noteTagsInput) elements.noteTagsInput.value = "";
      }
    });
  }
  if (elements.noteTagsInput) {
    elements.noteTagsInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        if (elements.addTagBtn) elements.addTagBtn.click();
      }
    });
  }
  if (elements.formatBoldBtn) elements.formatBoldBtn.addEventListener("click", () => formatText("bold"));
  if (elements.formatItalicBtn) elements.formatItalicBtn.addEventListener("click", () => formatText("italic"));
  if (elements.formatHeadingBtn) elements.formatHeadingBtn.addEventListener("click", () => formatText("heading"));
  if (elements.formatListBtn) elements.formatListBtn.addEventListener("click", () => formatText("list"));
  if (elements.formatQuoteBtn) elements.formatQuoteBtn.addEventListener("click", () => formatText("quote"));
  if (elements.sortDateDescBtn) {
    elements.sortDateDescBtn.addEventListener("click", function () {
      appData.setCurrentSortMethod("date-desc");
      renderNotes();
    });
  }
  if (elements.sortDateAscBtn) {
    elements.sortDateAscBtn.addEventListener("click", function () {
      appData.setCurrentSortMethod("date-asc");
      renderNotes();
    });
  }
  if (elements.sortAlphaBtn) {
    elements.sortAlphaBtn.addEventListener("click", function () {
      appData.setCurrentSortMethod("alpha");
      renderNotes();
    });
  }
  if (elements.searchInput) {
    elements.searchInput.addEventListener("input", function () {
      renderNotes();
    });
  }
  if (elements.noteContent) {
    elements.noteContent.addEventListener("input", updateMarkdownPreview);
  }
  if (elements.cancelDeleteBtn) elements.cancelDeleteBtn.addEventListener("click", closeDeleteModal);
  if (elements.confirmDeleteBtn) {
    elements.confirmDeleteBtn.addEventListener("click", function () {
      console.log("Confirm delete button clicked");
      deleteCurrentNote();
    });
  }

  // Initial render
  renderNotes();
  renderTags();
  updateMarkdownPreview();
});