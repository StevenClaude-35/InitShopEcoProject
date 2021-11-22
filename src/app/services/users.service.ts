import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../model/result';
import { Users } from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user:Users;
  isAuth=false;
  userSubjet=new Subject<Users>();
  constructor(private http:HttpClient) { }

  emitUsers():void{
    this.userSubjet.next(this.user)
  }

  authentifier(newUser:Users){
    return new Promise(
      (resolve,reject)=>{
        const url=`${environment.API+'authentifier.php?'+environment.API_KEY}`+'&email='+newUser.email
        + '&password='+ newUser.password;

        this.http.get(url).subscribe(
          (data:Result)=>{
            if(data.status==200){
              this.user=data.result;
              this.isAuth=true;
              this.emitUsers();
              resolve(data.result);
            }else{
              console.log(data.result);
              reject(data.message);
            }
          },(error)=>{
            console.log('error'+ error);
            reject(false);
          }
        )
      }
    )
  }
  createUser(newUser:Users){
    return new Promise(
      (resolve,reject)=>{
        const url=`${environment.API+'createUsers.php?'+environment.API_KEY}`+'&email='+ newUser.email
        + '&password='+ newUser.password + '&sexe='+ newUser.sexe + '&firstname='+ newUser.firstname
        + '&lastname='+ newUser.lastname + '&dateBirth=' +newUser.dateBirth + '&pseudo='+ newUser.pseudo;

        this.http.get(url).subscribe(
          (data:Result)=>{
           if(data.status==200){
             this.user=data.args;
             this.isAuth=true;
             this.emitUsers();
            resolve(data.result);
           }else{
             reject(data.message);
           }
          },(error)=>{
            reject(error);
          }
        )
      }
    )
  }
  logout():void{
    this.user=null;
    this.isAuth=false;
    this.userSubjet=new Subject<Users>();
  }
}
