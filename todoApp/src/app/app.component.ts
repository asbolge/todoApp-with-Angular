import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  enteredText:string='';
  isTextbarEmpty:boolean=true;
  isCategoryEmpty:boolean=true;


  isEmpty(value:string){
    
    if(value!=''){
      this.enteredText = value;
      this.isTextbarEmpty = false;
    }
    console.log(this.enteredText);
    console.log(this.isTextbarEmpty);
  };

  modifyCategory(){
    
    this.isCategoryEmpty=false;
    console.log(this.isCategoryEmpty);
  }

  addMission(){
    
  }

  missions=[
    {
      title: 'Study English',
      category: 'inProgress'
    },
    {
      title: 'Learn Angluar',
      category: 'upcoming'
    },
    {
      title: 'Learn React',
      category: 'upcoming'
    },
    {
      title: 'Learn Html',
      category: 'ready'
    },
    {
      title: 'Learn Algorithms',
      category: 'inProgress'
    },

  ];

  categories = [
    {
      title:'inProgress'
    },
    {
      title:'ready'
    },
    {
      title:'upcoming'
    }
  ]
}

