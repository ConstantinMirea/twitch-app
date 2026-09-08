import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(private db: Firestore) {}

  returnWinners() {
    return getDocs(collection(this.db, 'winners-list'));
  }

  returnGames() {
    return getDocs(collection(this.db, 'games-list'));
  }

  updateWinners(winner: string): void {
    addDoc(collection(this.db, 'winners-list'), { data: winner })
      .then(() => {
        console.log('Success: new winner has been added');
      })
      .catch((err) => console.error('Error adding winner:', err));
  }

  updateGames(game: string, image: string, link: string): void {
    addDoc(collection(this.db, 'games-list'), { game, img: image, link })
      .then(() => {
        console.log('Success: new game has been added');
      })
      .catch((err) => console.error('Error adding game:', err));
  }

  deleteWinner(winnerId: string): void {
    deleteDoc(doc(this.db, 'winners-list', winnerId))
      .then(() => console.log('success: winner deleted'))
      .catch((err) => console.error('Error deleting winner:', err));
  }

  deleteGame(gameId: string): void {
    deleteDoc(doc(this.db, 'games-list', gameId))
      .then(() => console.log('success: game deleted'))
      .catch((err) => console.error('Error deleting game:', err));
  }
}
