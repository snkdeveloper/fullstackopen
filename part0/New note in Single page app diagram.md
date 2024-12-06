```mermaid
    sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: the event handler creates a new note, adds it to the notes list  rerenders the note list on the page
    deactivate server

    
  
```
