import { Component, inject } from '@angular/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Firestore, getFirestore, doc, updateDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule,
    MatDialogActions,
    MatDialogTitle,
    MatButtonModule,
    MatDialogContent,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  firestore: Firestore = inject(Firestore);

  user: User | any;
  userId!: string | null;
  birthDate!: Date;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) { }

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
