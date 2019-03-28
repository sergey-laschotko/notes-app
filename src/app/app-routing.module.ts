import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesListComponent } from './notes-list/notes-list.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { EditNoteComponent } from './edit-note/edit-note.component';

const routes: Routes = [
  { path: "", component: NotesListComponent, pathMatch: "full" },
  { path: "create-note", component: CreateNoteComponent },
  { path: "edit-note", redirectTo: "/", pathMatch: "full" },
  { path: "edit-note/:id", component: EditNoteComponent },
  { path: "**", redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
