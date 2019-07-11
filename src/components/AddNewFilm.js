import * as React from 'react';
export class AddNewFilm extends React.Component {
    constructor(state,props){       
        super(state,props);
    }
    showParam(event){
        event.preventDefault(); 
        if(this.props.newTitle==="" || this.props.newReleaseYear==="" || 
            this.props.newFormat==="" || 
             this.props.newSatrs===""){
                alert ("Не все поля заполнены!!!Заполните все поля")                
        }
        this.props.addNewParam(); 
    }
    render() {
        return (
            <div className="add-new-film" >
                <h4>Добавить новый фильм</h4>
                <form>
                    <input className="alert alert-primary" onChange={()=>this.props.handlerOnChangeNewFilm(event,"title")} value={this.props.newTitle} type="text" placeholder="Введите Title"></input>
                    <input className="alert alert-primary" onChange={()=>this.props.handlerOnChangeNewFilm(event,"releaseYear")} value={this.props.newReleaseYear} type="text" placeholder="Введите Release Year"></input>
                    <input className="alert alert-primary" onChange={()=>this.props.handlerOnChangeNewFilm(event,"format")} value={this.props.newFormat} type="text" placeholder="Введите Format"></input>
                    <input className="alert alert-primary" onChange={()=>this.props.handlerOnChangeNewFilm(event,"stars")} value={this.props.newSatrs} type="text" placeholder="Введите Stars через ',' "></input>
                    <button className="btn btn-primary"  onClick={()=>this.showParam(event,this.props.newFilmParam)}>Добавить</button>
                </form>                   
            </div>
            
           
        )
      
    }
}