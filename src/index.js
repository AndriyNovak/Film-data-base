import * as React from 'react';
import * as ReactDOM from 'react-dom';

import "./style/style.scss";
import {ShowInformFilm} from './components/ShowInformFilm';
import {AddNewFilm} from './components/AddNewFilm';

let responseText="";

class App extends React.Component {
    constructor(state,props){       
        super(state,props); 
        this.state = {           
            urlFile:"noURL",
            responseText:[],            
            arrObject:[],           
            inpSearchValue:"",           
            indexSearch:"",
            arrIndexSearch:[],
            newTitle:"",
            newReleaseYear:"",
            newFormat:"",
            newSatrs:"",            
                   
        }
    }
    componentWillMount(){
        if(this.state.arrObject!==[]){
            let json = localStorage.getItem('arrObject')
            this.setState({
                arrObject:JSON.parse(json)
            })
        }
    }
    handlerOnChangeLoad(event){
        this.setState({
            // urlFile:event.target.files[0].name    // альтернативний шлях до файлу для завантаження з компютера
            urlFile: `https://github.com/AndriyNovak/Film-data-base/blob/master/${event.target.files[0].name}` // шлях до файлу через github repositories
        })
    }
    handleSubmit(event){
        event.preventDefault();        
        this.requestGetInformFilm(this.state.urlFile)        
        if(responseText!=""){
            this.convertText(responseText)
        }  
    }
    convertText(responseText){
        let arrText;       
        for(let i = 0;i<responseText.length;i++){ 
            arrText = responseText.split("\n");                            
        }  
        for(let i = 0;i<responseText.length;i++){ 
            if(arrText.indexOf("")!==-1){
                arrText.splice(arrText.indexOf(""),1)
            }            
        }           
        let title = this.parsingFunction(0,4,arrText) ; 
        let releaseYear = this.parsingFunction(1,4,arrText) ;
        let format = this.parsingFunction(2,4,arrText) ;
        let stars = this.parsingFunction(3,4,arrText) ;
        let arrObj =[];
        this.decomposeElementArr(title).map((elem1,i1)=>{                               
            arrObj.push({
                "id":i1+1000,
                "title":elem1,
                "releaseYear":this.decomposeElementArr(releaseYear)[i1],
                "format": this.decomposeElementArr(format)[i1],
                "stars":this.decomposeElementArr(stars)[i1]
            })            
        })
        this.sortFunc(arrObj);        
        let arrFirstElem = arrObj[0].title[0].concat(arrObj[0].title[1]);
        arrObj[0].title = arrObj[0].title.splice(1,1);
        arrObj[0].title[0] = arrFirstElem;       
        this.setState({
            arrObject:arrObj
        })
    }
    sortFunc(arrObject){
        arrObject.sort(function(a, b){
            var nameA=a.title, nameB=b.title
            if (nameA < nameB) 
              return -1
            if (nameA > nameB)
              return 1
            return 0 
        })   
        return arrObject
    }
    parsingFunction(startCount,count,arrText){       
        let arrParam = [];       
        for(let i = startCount;i<arrText.length;i+=count){ 
            arrParam.push(arrText[i]);                
        }       
        return arrParam
    }
    decomposeElementArr(array){
        let arr= [];
        for(let j=0;j<array.length;j++){
            arr.push(array[j].split(":"));            
        }
        arr.map((el,i)=>{
            el.splice(0,1)
        })       
        return arr
    }
    
    requestGetInformFilm(pass){        
        var req = new XMLHttpRequest();
            req.open('GET', pass, false);           
            req.onreadystatechange = function() {
            if (req.readyState == 4) {
                if(req.status == 200) {                   
                    responseText = req.responseText                                
                    return responseText                 
                }
            }
            };
             req.send(null); 
    }
  // --------------------for Search------------------------  
    handlerOnChangeSearch(event){
        let indexArrTitle = [];
        let indexArrStars = [];       
        this.state.arrObject.map((elem1,i1)=>{
            if( (elem1.title[0]).toLowerCase().indexOf((event.target.value).toLowerCase())!==-1){
                indexArrTitle.push(i1)
                this.setState({
                    indexSearch:i1,
                    arrIndexSearch:indexArrTitle,
                    inpSearchValue:event.target.value
                })
                if(event.target.value===""){
                    this.setState({
                        indexSearch:"",
                        arrIndexSearch:[],
                        inpSearchValue:""
                    })
                }
            }
            
            if( (elem1.stars[0].toLowerCase().indexOf((event.target.value).toLowerCase())!==-1)){
                indexArrStars.push(i1)
                this.setState({
                    indexSearch:i1,
                    arrIndexSearch:indexArrStars,
                    inpSearchValue:event.target.value
                })
                if(event.target.value===""){
                    this.setState({
                        indexSearch:"",
                        arrIndexSearch:[],
                        inpSearchValue:""
                    })
                }
            }
           
        })
    }
    // --------------------for Add New Film------------------------
    handlerOnChangeNewFilm(event,propertyName){ 
        if(propertyName==="title"){
            this.setState({ 
                newTitle: event.target.value                                  
            }); 
        }
        if(propertyName==="releaseYear"){
            this.setState({ 
                newReleaseYear: event.target.value                    
            }); 
        }
        if(propertyName==="format"){
            this.setState({ 
                newFormat: event.target.value                    
            });
        }
        if(propertyName==="stars"){
            this.setState({ 
                newSatrs: event.target.value                    
            }); 
        }
    }
    addNewParam(){ 
        let counter = 1
        let id = this.state.arrObject.length+1001 ;              
        this.state.arrObject.map((el,j)=>{                   
            if(el.id == id){
                counter = counter+1;
                    id = id + counter;                        
            }  
        })
        if(this.state.newTitle && this.state.newReleaseYear && 
            this.state.newFormat && 
             this.state.newSatrs  ){
               this.setState({                    
                    arrObject:[
                        {
                            "id":id,
                            "title":[this.state.newTitle],
                            "releaseYear":[this.state.newReleaseYear],
                            "format":[this.state.newFormat],
                            "stars":[this.state.newSatrs]
                        },
                        ...this.state.arrObject
                    ],
                    newTitle:"",
                    newReleaseYear:"",
                    newFormat:"",
                    newSatrs:""                   
               }); 
              
           }  
    }
    removeFilm(arrObject,index){         
        arrObject.splice(index,1);
        localStorage.setItem('arrObject', JSON.stringify(arrObject));       
        if(arrObject!==[]){
            let json = localStorage.getItem('arrObject')
            this.setState({
                arrObject:JSON.parse(json)
            })
        }
    }
    // -----------------------------------------------------------
    render() {
        return (
            <div className="main-wrap" >
                <header>
                    <form className="form-load-info"> 
                        <input  type="file"  onChange={()=>this.handlerOnChangeLoad(event)}/> 
                        <button  className="btn btn-primary" onClick={()=>this.handleSubmit(event)}>Загрузить</button>
                        
                    </form>

                    <AddNewFilm
                    handlerOnChangeNewFilm={this.handlerOnChangeNewFilm.bind(this)}                
                    arrObject={this.state.arrObject}
                    addNewParam={this.addNewParam.bind(this)}                   
                    newTitle={this.state.newTitle}
                    newReleaseYear={this.state.newReleaseYear}
                    newFormat={this.state.newFormat}
                    newSatrs={this.state.newSatrs}
                    sortFunc={this.sortFunc.bind(this)}
                />
                    <form className="form-search">
                        <input className="alert alert-primary search" onChange={()=>this.handlerOnChangeSearch(event)}  type="text" placeholder="Название фильма или имя актера"></input>
                       
                    </form>
                   

                </header>
                <ShowInformFilm                   
                    arrObject={this.state.arrObject}
                    inpSearchValue={this.state.inpSearchValue}                  
                    indexSearch={this.state.indexSearch}
                    arrIndexSearch={this.state.arrIndexSearch}                  
                    removeFilm={this.removeFilm.bind(this)}
                />
                
            </div>
            
           
        )
      
    }
}




ReactDOM.render(<App/>, document.getElementById('root'));