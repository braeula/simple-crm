import { Component, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../../src/models/user.class';
import { MatCardModule } from '@angular/material/card';
import { collection, Firestore, onSnapshot, Unsubscribe } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, MatCardModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  firestore: Firestore = inject(Firestore);
  private unsubscribe: Unsubscribe | undefined;
  user: User = new User();
  allUsers: any[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    const usersCollection = collection(this.firestore, 'users');
    onSnapshot(usersCollection, (snapshot) => {
      const changes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Received changes from DB', changes);
      this.allUsers = changes;

    }, (error) => {
      console.error('Error receiving changes:', error);
    });
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe(); // Abo beenden, um Speicherlecks zu vermeiden
    }
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent)
  }
}
