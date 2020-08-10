import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../auth.service';


@Component({ 
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    // error = '';  used before in mat-error

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService
    ) { 
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
        username: new FormControl('', {
            validators: [Validators.required,]
          }),
        password: new FormControl('', {
            validators: [Validators.required, Validators.minLength(1)]
          })
        });
       
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }

    onSubmit() {

        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        else {
        this.loading = true;
        this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
         .subscribe(
            user  => {          
              this.router.navigate([this.returnUrl]);        
            },
            error  => {
             this.loading = false;       
          });
         }
        
        }
    
}