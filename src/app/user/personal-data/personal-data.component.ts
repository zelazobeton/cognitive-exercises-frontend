import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PortfolioDto} from '../../shared/model/portfolio-dto';
import {loggedUserSelector, portfolioSelector} from '../state/user.selectors';
import {Store} from '@ngrx/store';
import {UserState} from '../state/user.reducer';
import {updateAvatarAction} from '../state/user.actions';
import {LoggedUserDto} from '../../shared/model/logged-user-dto';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css'],
})
export class PersonalDataComponent implements OnInit {
  public fileName: string;
  public profileImage: File;
  public loading: boolean;
  public portfolioDto$: Observable<PortfolioDto>;
  public loggedUser$: Observable<LoggedUserDto>;

  constructor(private store: Store<UserState>) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.portfolioDto$ = this.store.select(portfolioSelector);
    this.loggedUser$ = this.store.select(loggedUserSelector);
  }

  onSubmit(): void {
    this.loading = true;
    const formData = new FormData();
    formData.append('avatar', this.profileImage);
    this.store.dispatch(updateAvatarAction({avatarForm: formData}));
    this.loading = false;
  }

  public onImageChange(fileName: string, profileImage: File): void {
    this.fileName = fileName;
    this.profileImage = profileImage;
  }
}