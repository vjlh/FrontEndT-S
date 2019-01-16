import { Component, OnInit } from '@angular/core';
import { Idea, Comentario, IdeaService } from '../services/idea.service';
import { Desafio, DesafioService } from '../services/desafio.service';

@Component({
    selector: 'app-vista-principal',
    templateUrl: './vista-principal.component.html',
    styleUrls: ['./vista-principal.component.css']
})

export class VistaPrincipalComponent implements OnInit {
    ideas: Idea[];
    idea: Idea;
    desafios: Desafio[];
    index: 0;
    index2: 0;

    constructor(private ideaService: IdeaService, private desafioService: DesafioService) { }

    ngOnInit() {
        this.ideaService.getIdeas()
        .subscribe(ideas => this.ideas = ideas);
        this.desafioService.getDesafios()
        .subscribe(desafios => this.desafios = desafios);

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

    addDesafio(titulo: string, descripcion: string, inicio: string, termino: string): void {
        titulo = titulo.trim();
        descripcion = descripcion.trim();
        inicio = inicio.trim();
        termino = termino.trim();
        if (!titulo || !descripcion || !inicio || !termino) { return; }
        this.desafioService.addDesafio({titulo,descripcion,inicio,termino} as Desafio)
        .subscribe(desafio => {
            this.desafios.push(desafio);
        });
    }

    seleccionarIdea(idea: Idea): void {
        this.idea = idea;
        console.log(this.idea);
    }

    addComentario(comentario:string, idIdea:string): void {
      let nombreIdeador: string = "Leandro";
      comentario = comentario.trim();

      if (!nombreIdeador || !comentario ) { return; }
      this.ideaService.addComentario({nombreIdeador,comentario} as Comentario,idIdea).subscribe();
    }
}
