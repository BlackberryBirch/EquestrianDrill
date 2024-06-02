import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { AngularFirestore, CollectionReference, Query } from '@angular/fire/compat/firestore';

export interface Routine {
  name: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
  uidFilter$: BehaviorSubject<string|null>;
  routine$: Observable<Routine[]>;
  selectedRoutine: Routine|null = null;

  constructor(private afs: AngularFirestore) {
    this.uidFilter$ = new BehaviorSubject<string|null>(null);
    this.routine$ = this.uidFilter$.pipe(
      switchMap((uid) => 
        this.afs.collection<Routine>('routine', ref => {
          let query : CollectionReference | Query = ref;
          query = query.where('creator_uid', '==', uid);
          return query;
        }).valueChanges()
      )
    );
  }

  create(name: string) {
    this.afs.collection('routine').add({name: name}).then(_ => {
      this.refresh()
    });
  }

  refresh() {
    this.uidFilter$.next(this.uidFilter$.value);
  }
}
