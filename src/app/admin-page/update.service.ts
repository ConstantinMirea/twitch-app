import { Injectable } from '@angular/core';
import { getFirestore } from 'firebase/firestore';
import {
  Firestore,
  collectionData,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  docSnapshots,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { winnersList } from 'src/app/winners-list/winners-list';
import { gamesPlayed } from '../games-streamed/games-played';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private collection: any;
  // winners:any[]=[];
  constructor(private db: Firestore) {}
  // db = getFirestore();

  returnWinners() {
    return getDocs(collection(this.db, 'winners-list'));
  }

  returnGames() {
    return getDocs(collection(this.db, 'games-list'));
  }

  updateWinners(winner: string) {
    addDoc(collection(this.db, 'winners-list'), { data: winner })
      .then(() => {
        console.log('Success new winner has been added');
      })
      .catch((err) => console);
  }

  updateGames(game: string,image:string, link:string) {
    addDoc(collection(this.db, 'games-list'), { game: game, img:image, link:link })
      .then(() => {
        console.log('Success new game has been added');
      })
      .catch((err) => console);
  }

  massUpdate() {
    const fullList = winnersList;
    fullList.forEach((element) => {
      addDoc(collection(this.db, 'winners-list'), { data: element }).then(
        () => {
          console.log('success');
        }
      ).catch((err) => console.error(err));;
    });
  }

  massUpdateGames() {
    const fullList = gamesPlayed;
    fullList.forEach((element: any) => {
      addDoc(collection(this.db, 'games-list'), {
        game: element.title,
        img: element.img,
        link: element.link ? element.link : 'nolink',
      }).then(() => {
        console.log('success');
      }).catch((err) => console.error(err));;
    });
  }

  deleteWinner(winner: string) {
    console.log(winner);
    deleteDoc(doc(this.db, 'winners-list', winner))
      .then(() => {
        console.log('success');
      })
      .catch((err) => console.error(err));
  }
}
