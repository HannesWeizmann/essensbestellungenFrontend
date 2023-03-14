import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { lastValueFrom, map, of, switchMap } from 'rxjs';
import { User } from '../user.model';

@Component({
  selector: 'app-assigned-users-form-field',
  templateUrl: './assigned-users-form-field.component.html',
  styleUrls: ['./assigned-users-form-field.component.scss']
})
export class AssignedUsersFormFieldComponent implements OnInit {
  // for two-way binding, the input and output properties have to follow a specific name schema:
  // input: <propertyName>
  // output: <propertyName>Change
  @Input() assignedUsers!: string[];
  @Output() assignedUsersChange = new EventEmitter<string[]>();
  assignedUsersExpanded: User[] = [];
  
  isAdministrator$ = this.userService.getUser().pipe(map((user) => {
    return user.isAdministrator();
  }))
  allUsers$ = this.isAdministrator$.pipe(switchMap((isAdmin) => {
    if (isAdmin) {
      return this.userService.getAllUsers()
    }
    return of([]);
  }));
  
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl('');

  userIdToEmail: Record<string, string> = {};

  constructor(private readonly userService: UserService) {
  }

  async ngOnInit() {
    this.assignedUsersExpanded = await Promise.all(this.assignedUsers.map((userId) => {
      return lastValueFrom(this.userService.getUser(userId));
    }));
  }

  assign(event: unknown) {
    const { value } = (event as MatAutocompleteSelectedEvent).option;
    this.assignedUsers.push(value._id);
    this.assignedUsersChange.emit(this.assignedUsers);
  }

  unassign(userId: string) {
    const idx = this.assignedUsers.findIndex(id => (id === userId));
    this.assignedUsers.splice(idx, 1);
    this.assignedUsersChange.emit(this.assignedUsers);
  }
}
