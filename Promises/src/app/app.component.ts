import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test001';

  // tslint:disable-next-line:typedef
  ajaxget(url): Promise<string> {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
    const promise = new Promise<string>((resolve, reject) => {
      xmlhttp.onreadystatechange = () => {
        const retVal = xmlhttp.responseText;
        if (retVal.length <= 0) {
          console.log('<=0');
        } else {
          console.log('>=1');
          // console.log(retVal);
          resolve(retVal);
        }
      };
    });
    return promise;
  }

  myPromise(arg: number): Promise<string> {
    return new Promise<string>((res, rej) => {
      res('Respose from promise : ' + arg);
    });
  }

  processData(data): void {
    console.log(data);
  }

  // tslint:disable-next-line:typedef
  me_clicked($event: MouseEvent) {
    console.log('............1');
    this.ajaxget('http://localhost:4201/')
      .then(data => {
        this.processData(data);
        return this.ajaxget('http://localhost:4202/');
      })
      .then(data => {
        this.processData(data);
        return this.ajaxget('http://localhost:4201/');
      })
      .then(data => console.log('3333: ' + data))
      .catch(err => console.log('ERROR: ' + err));
    console.log('............2');


    this.myPromise(1).then(data => {
      console.log(data);
      return data;
    })
      .then((data => {
        console.log(data + 1);
        return data;
      }));
    console.log('............3');
  }
}
