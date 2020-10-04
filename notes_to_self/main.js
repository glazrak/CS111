if (!localStorage.getItem("notes")){
    localStorage.setItem("notes",JSON.stringify([]));
}
var myNotes=JSON.parse(localStorage.getItem("notes"));
displayNotes();
function postNewNote(){
    var titleInput=$(".new-note-title");
    var contentInput=$(".new-note-content");
    var noteTitle=titleInput.val();
    var noteContent=contentInput.val();
    var noteDate=new Date();
    var note={};
    note.title=noteTitle;
    note.content=noteContent;
    note.date=noteDate;
    myNotes.push(note);
    localStorage.setItem("notes",JSON.stringify(myNotes));
    titleInput.val("");
    contentInput.val("");
    displayNotes();
}
function displayNotes(){
    $(".old-notes").html("");
    for (var i=myNotes.length-1;i>=0;i--){
        var note =myNotes[i];
        var noteTitle = note.title;
        var noteDate = note.date;
        var noteContent = note.content.replace(/\n/g,"<br>");
        var thisNote=$("<div>").addClass("note");
        var noteTitleDisplay = $("<h2>").addClass("note-title").text(noteTitle);
        var noteDateDisplay = $("<p>").addClass("note-date").text(noteDate);
        var noteContentDisplay = $("<p>").addClass("note-content").html(noteContent);
        
        thisNote.append(noteTitleDisplay);
        thisNote.append(noteDateDisplay);
        thisNote.append(noteContentDisplay);
        
        $(".old-notes").append(thisNote);
    }
}
function clearStorage(){
    localStorage.setItem("notes",JSON.stringify([]));
    $(".old-notes").html("");
}
$(".post-new-note").on("click",postNewNote);
$(".clear-notes").on("click",clearStorage);