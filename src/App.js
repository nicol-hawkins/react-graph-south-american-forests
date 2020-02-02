// import React from 'react';
import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
  
    this.state = {
      year: '2016',
      counter: 0,
      data:[],
      chosenCountries: [],
      availableCountries: [],
    }
};

  //fetch the data
  componentDidMount() {
    fetch('./data.json')
    .then(response => response.json())
    .then(
      
      (result) => {
        this.setState({
          data: result,  
          availableCountries: result,
        });
        console.log('Available countries: ', result)
      },
    )
  }

  //get the year
  updateYear = (ev) => {

    this.setState({
      year: ev.target.value },
      () => console.log('update year', this.state.year));
    
  }

  //toggle visibility of data, not really being used anymore//
  //keeping it here for reference//
  toggleInfo(index, label) {
      console.log('this is index', index);

      if(this.state.data[index].visible === true) {
        this.state.data[index].visible = false;
  
      } else {
          this.state.data[index].visible = true;

      } 
        this.setState({
        data: this.state.data,
      
      });
    }

  //add chosen countries to an array//
  onChooseCountry = (label) => {
    //duplicate the two arrays
    const chosenCountries = this.state.chosenCountries.slice();
    const availableCountries = this.state.availableCountries.slice();

    //retrieve country of choice
    const chosenCountry = availableCountries[label];

    //add to the chosen list
    chosenCountries.push(chosenCountry);

    //sorts the countries in alphabetical order so indices remain the same//
    chosenCountries.sort((a, b) => (a.label > b.label) ? 1 : -1);

    console.log('Chosen countries: ', chosenCountries)

    this.setState ({
      chosenCountries: chosenCountries,
      availableCountries: availableCountries,
      counter: this.state.counter + 1,
    });

  };
    
  //remove countries from available to chosen//
  removeCountry = (index) => {
    // Duplicate the two arrays we have to modify
    const chosenCountries = this.state.chosenCountries.slice();
    const availableCountries = this.state.availableCountries.slice();
    
    // Same as "add", but in reverse: Retrieve, add, then remove
    const chosenCountry = chosenCountries[index];

    availableCountries.push(chosenCountry);
    chosenCountries.splice(index, 1);

    //sorts the countries in alphabetical order--indices remain the same//
    availableCountries.sort((a, b) => (a.label > b.label) ? 1 : -1);

    console.log('Available countries', availableCountries)
    
    this.setState({
      availableCountries: availableCountries,
      chosenCountries: chosenCountries
    });

  };
  

render() {
  return (
    <div className="App">
     
      <section className="TitleBar">
        <div className="test">
        
            <h1>Percentage of Forest Land in <br></br>South American Countries: <span className="output"> {this.state.year} </span> </h1>
                

        <div className="yearChooser">
            <select onChange={this.updateYear} id="select" className="YearChooser-select">
                <option value="">Select Year</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
            </select>
  
       
        </div>
        </div>
    </section>

    

    <section className="MainContainer">
      <div className="CountryCheckbox">
        {/* generate a button for each object in the array of availableCountries */}
        {
        this.state.data.map((data, index) => (
          <button key={index}className="button-primary" onClick={() => {this.onChooseCountry(index);
          }}><span className="btn-content" tabindex="-1">
      </span>{data.label}</button>
         ))
        } 
      </div>
  
      <div className="BarChart" id="results">

          {/* original toggle js not being used. saving for reference */}
          {/* {
            this.state.data.map(data => (
            data.visible === true ? (
              
            <div key={data} className="bar--show bar" id={data.label} style={{height: data.percentage + "px"}}> 
              {data.label} = 
              {data.percentage} %
              {console.log('label: ',data.label, 'percentage: ', data.percentage)}
            </div>
            ) : (
                null
              )
            ))
          } */}

          {/* generate divs with remove button */}
          {
            this.state.chosenCountries.map((chosenCountry, index) => (
              <div className="bar--show bar" style={{height: chosenCountry.percentage + "%"}}>
                  
                <h3>{chosenCountry.label}</h3>
                <h4>{chosenCountry.percentage} %</h4>
                <button className="remove-btn" onClick={() => this.removeCountry(index)}>remove</button>

              </div>
            ))
          }
      </div>
    </section>       
  </div>

    
  );
}


}

export default App;
