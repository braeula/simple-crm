import { ChangeDetectionStrategy, Component, OnDestroy, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../../src/models/user.class';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule,
    MatDialogActions,
    MatDialogTitle,
    MatButtonModule,
    MatDialogContent,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);

  user: User = new User();
  birthDate!: Date;

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user:', this.user);
    // this.firestore.collection('users').add(this.user)
    const usersCollection = collection(this.firestore, 'users');
    await addDoc(usersCollection, this.user.toJSON()).then((result: any)=>{
      console.log('Added:', result);      
    });

  }
}
