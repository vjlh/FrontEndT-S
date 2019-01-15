import { Component, OnInit } from '@angular/core';
import { Idea, IdeaService } from '../idea.service';

@Component({
  selector: 'app-vista-principal',
  templateUrl: './vista-principal.component.html',
  styleUrls: ['./vista-principal.component.css']
})

export class VistaPrincipalComponent implements OnInit {

  ideas: Idea[];

  constructor(private ideaService: IdeaService) { }

  ngOnInit() {
      this.ideaService.getIdeas()
      .subscribe(ideas => this.ideas = ideas);
  }

  add(titulo: string, descripcion: string): void {
    titulo = titulo.trim();
    descripcion = descripcion.trim();
    let nombreIdeador: string = 'Autorcito';
    let idDesafio:number=0;

    if (!titulo || !descripcion ) { return; }
    this.ideaService.addIdea({titulo,descripcion,idDesafio,nombreIdeador} as Idea)
      .subscribe(idea => {
        this.ideas.push(idea);
      });
  }
  meGusta(idIdea:string) {
    this.ideaService.meGusta(idIdea).subscribe();
    this.ideaService.getIdeas()
      .subscribe(ideas => this.ideas = ideas);
  }
  filtrar(filtro:string){
    this.ideaService.filter(filtro)
      .subscribe(ideas => {this.ideas = ideas; console.log(this.ideas)});
  }
  order(criterio:string){
    this.ideaService.order(criterio)
      .subscribe(ideas => {this.ideas = ideas; console.log(this.ideas)});
  }
}
