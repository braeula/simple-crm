import { Component, inject } from '@angular/core';
import { collection, Firestore, onSnapshot, Unsubscribe, doc } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  firestore: Firestore = inject(Firestore);
  private unsubscribe: Unsubscribe | undefined;

  userId: string | null = '';
  user: User = new User();
  error: string | null = null;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log('Got Id', this.userId);
      this.getUser();
    });
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe(); // Abo beenden, um Speicherlecks zu vermeiden
    }
  }

  // getUser() {
  //   const usersCollection = collection(this.firestore, 'users');
  //   onSnapshot(usersCollection, (snapshot) => {
  //     const user = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as Omit<User, 'id'> }));
  //     let currentUser = user.filter((user) => user.id === this.userId);
  //     this.user = currentUser;
  //     console.log('user:', user);

  //   }, (error) => {
  //     console.error(error);
  //   });
  // }

  getUser() {
    if (!this.userId) {
      this.error = 'Keine userId vorhanden';
      return;
    }

    const userDocRef = doc(this.firestore, `users/${this.userId}`);
    this.unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        // Erstelle ein User-Objekt mit den Daten aus Firestore
        const data = docSnapshot.data();
        this.user = new User({
          id: docSnapshot.id,
          firstName: data['firstName'] || '',
          lastName: data['lastName'] || '',
          birthDate: data['birthDate'] || 0,
          street: data['street'] || '',
          zipCode: data['zipCode'] || 0,
          city: data['city'] || ''
        });
        console.log('Geladener Benutzer:', this.user);
      } else {
        this.error = 'Benutzer nicht gefunden';
        this.user = new User();
      }
    }, (error) => {
      this.error = 'Fehler beim Laden des Benutzers: ' + error.message;
      console.error('Fehler:', error);
    });
  }

  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
