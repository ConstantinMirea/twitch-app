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
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {winnersList} from 'src/app/winners-list/winners-list'
@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private collection: any;
  // winners:any[]=[];
  constructor(private db:Firestore) {

  }
  // db = getFirestore();

  returnWinners() {
    return getDocs(collection(this.db, 'winners-list'));
  }

  updateWinners() {
    addDoc(collection(this.db, 'winners-list'), { data: 'test winner' }).then(() => {
      console.log('success');
    });
  }

  massUpdate() {
    const fullList = winnersList;
    fullList.forEach(element => {
      addDoc(collection(this.db, 'winners-list'), { data: element }).then(() => {
        console.log('success');
      });
    })
  }

}