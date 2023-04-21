import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { firstValueFrom, of } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { AppHttpClient } from '../shared/http-client.service';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let http: jasmine.SpyObj<AppHttpClient>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['hasAccessToken']);
    authService.hasAccessToken.and.returnValue(false);
    http = jasmine.createSpyObj('AppHttpClient', ['post']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: AppHttpClient, useValue: http },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login if user is authenticated', async () => {
    authService.hasAccessToken.and.returnValue(true);

    await component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should sign up user and navigate to login', async () => {
    http.post.and.returnValue(of({ User: 'test', msg: 'Success' }));

    await component.signUp();

    expect(http.post).toHaveBeenCalledWith(
      '/users/signup',
      component.userToSignUp,
      jasmine.objectContaining({ withCredentials: true })
    );
    expect(alert).toHaveBeenCalledWith('Success');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should show error message if sign up fails', async () => {
    const errorMessage = 'Server error';
    http.post.and.throwError(errorMessage);

    await component.signUp();

    expect(http.post).toHaveBeenCalledWith(
      '/users/signup',
      component.userToSignUp,
      jasmine.objectContaining({ withCredentials: true })
    );
    expect(alert).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.errorMessage).toEqual(errorMessage);
  });

  it('should navigate back to login', () => {
    component.navigateBack();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
