import { Component, inject } from '@angular/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Firestore, getFirestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [FormsModule,
    MatDialogActions,
    MatDialogTitle,
    MatButtonModule,
    MatDialogContent,
    MatInputModule,
    MatFormFieldModule,],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  firestore: Firestore = inject(Firestore);

  user: User | any;
  userId!: string | null;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) { }

  async saveUser() {
    const db = getFirestore(); // initialize Firestore
    const docRef = doc(db, `users/${this.userId}`);
    
    await updateDoc(docRef, this.user.toJSON()).then(() => {
      console.log('Updated:', this.user.toJSON());
    });
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
