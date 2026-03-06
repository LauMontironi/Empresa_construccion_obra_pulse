import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

login(data: any) {
    console.log('Login request', data);
}

register(data: any) {
    console.log('Register request', data);
}

}