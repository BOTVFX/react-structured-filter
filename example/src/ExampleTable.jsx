var React = require('react');
var StructuredFilter = require('../../src/main');

require('../../src/react-structured-filter.css');

var ExampleData = require('./ExampleData');


class ExampleTable extends React.Component {

  state = {
      filter: [
            {
              category: 'Industry',
              operator: '==',
              value: 'Music',
            },
            {
              category: 'IPO',
              operator: '>',
              value: 'Dec 8, 1980 10:50 PM',
            },
          ],
  }


  getJsonData = (filterString, sortColumn, sortAscending, page, pageSize, callback) => {

    if (filterString==undefined) {
      filterString = "";
    }
    if (sortColumn==undefined) {
      sortColumn = "";
    }

    // Normally you would make a Reqwest here to the server
    var results = ExampleData.filter(filterString, sortColumn, sortAscending, page, pageSize);
    callback(results);
  }


  updateFilter = (filter) => {
    // Set our filter to json data of the current filter tokens
    this.setState({filter: filter});
  }


  getSymbolOptions = () => {
    return ExampleData.getSymbolOptions();
  }

  getSectorOptions = () => {
    return ExampleData.getSectorOptions();
  }

  getIndustryOptions = () => {
    return ExampleData.getIndustryOptions();
  }

  render = () => {
    return (
      <div>
        <StructuredFilter
          placeholder="Filter data..."
          options={[
            {category:"Symbol", type:"textoptions", options:this.getSymbolOptions},
            {category:"Name",type:"text"},
            {category:"Price",type:"number"},
            {category:"MarketCap",type:"number"},
            {category:"IPO", type:"date"},
            {category:"Sector", type:"textoptions", options:this.getSectorOptions},
            {category:"Industry", type:"textoptions", options:this.getIndustryOptions}
            ]}
          customClasses={{
            input: "filter-tokenizer-text-input",
            results: "filter-tokenizer-list__container",
            listItem: "filter-tokenizer-list__item"
          }}
          onChange={this.updateFilter}
          value={this.state.filter}
        />
      </div>
    )
  }
}
module.exports = ExampleTable;
