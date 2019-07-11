import * as React from 'react';
export class ShowInformFilm extends React.Component {
    constructor(state,props){       
        super(state,props);        
    }
   
    render() {        
        localStorage.setItem('arrObject', JSON.stringify(this.props.arrObject));
        return (
            <div className="info-film" >
                     {( this.props.arrIndexSearch) && 
                     this.props.arrIndexSearch.map((index,j)=>{
                         if(this.props.arrObject[index]!==undefined){
                            return (
                                <ul className="lists-search" key={j+"1abcde1"}>                           
                                    <li key={j+"1a1"}>Id: {this.props.arrObject[index].id}</li>
                                    <li key={j+"1b1"}>Title: {this.props.arrObject[index].title}</li>
                                    <li key={j+"1c1"}>Release Year: {this.props.arrObject[index].releaseYear}</li>
                                    <li key={j+"1d1"}>Format: {this.props.arrObject[index].format}</li>
                                    <li key={j+"1e1"}>Stars: {this.props.arrObject[index].stars}</li>
                                    <button className="btn btn-primary" onClick={()=>{this.props.removeFilm(this.props.arrObject,j)}}>Удалить</button>
                                </ul>   
                            )
                        }
                        
                     })
                            
                     }    
                     {(this.props.arrObject && this.props.inpSearchValue ==="") &&  this.props.arrObject.map((elem,i)=>{ 
                            return(
                                <ul className="lists" key={i+"abcd"}>
                                    <li  key={i+"e"}>Id: {elem.id}</li>
                                    <li  key={i+"a"}>Title: {elem.title}</li>
                                    <li key={i+"b"}>Release Year: {elem.releaseYear}</li>
                                    <li key={i+"c"}>Format: {elem.format}</li>
                                    <li key={i+"d"}>Stars: {elem.stars}</li>
                                    <button className="btn btn-primary" onClick={()=>{this.props.removeFilm(this.props.arrObject,i)}}>Удалить</button>
                                </ul>
                            )
                       
                    })
                }
                     
            </div>
        )
      
    }
}





