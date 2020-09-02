import React, {Component, useState, useEffect} from 'react';
import logo from './logo.svg';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import 'bootstrap/dist/css/bootstrap.min.css';
const spawn = require('child_process').spawn;

//import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.winpercentagestate = {
      value: ""
    };
  };
  /*
  const [currentSum, setCurrentSum] = useState(0);
  const [clear, setClear]=useState(false);

  useEffect(()=>{
    document.querySelector('#result').value="";
  }, []);

  useEffect(()=> {
    if (clear){
      document.querySelector('#result').value = "";
    }
  });
  const Add=(e)=>{
    e.preventDefault();
    if (clear) setClear(false);
    let currentNum=document.querySelector("#num").value;
    if (currentNum=='')
    return;
    let sum = currentSum + parseInt(currentNum);
    setCurrentSum(sum);
    document.querySelector('#result').value=String(sum);
  }

  const Clear=(e)=>{
    e.preventDefault();
    console.log('sum:', currentSum);
    document.querySelector('form').reset();
    setClear(true);
    setCurrentSum(0);
  }
  */

  render () {
    const PredictWins=(e)=>{
      e.preventDefault();
      let p1=document.querySelector("#p1mmr").value;
      let p2=document.querySelector("#p2mmr").value;
      var m = 894.5134726042004;
      let num = 1/(1+(10**((p2-p1)/m)))*100;
      document.querySelector('#result1').value=(""+String(num.toFixed(3))+"%");
      document.querySelector('#result2').value=(""+String((100-num).toFixed(3))+"%");
    }
    const BestOf=(e)=>{
      e.preventDefault();
      const runs = 100000;
      var p1=document.querySelector("#p1mmr_2").value;
      var p2=document.querySelector("#p2mmr_2").value;
      var bo=document.querySelector("#bestof").value;
      if (bo < 1) {
        let res = "Invalid input.";
      }
      else {
        var m = 894.5134726042004;
        var prob = 1/(1+(10**((p2-p1)/m)));
        var resdict = {};
        for (var i = 0; i < runs; i++) {
          let i1 = 0;
          let i2 = 0;
          while (true) {
            let game = Number(Math.random() < prob);
            i1 = i1 + game;
            i2 = i2 + (1-game);
            if (Math.max(i1, i2) > (bo/2)) break;
          }
          var result = String(i1) + '-' + String(i2);
          if (resdict.hasOwnProperty(result)) {
            resdict[result] = resdict[result] + (100 / runs);
          }
          else {
            resdict[result] = 100/runs;
            };

        }
      // Sorting the output...
      var items = Object.keys(resdict).map(function(key) {
        return [key, resdict[key].toFixed(2)];
      });
      items.sort(function(first, second) {
        return second[1] - first[1];
      });

      var res = "Format: Player 1 - Player 2\n"
      //console.log(items);
      for (var variable in items) {
        if (items.hasOwnProperty(variable)) {
          //console.log(variable);
          res = res + items[variable][0]+': '+items[variable][1] + '%\n';
        }
      }
      document.querySelector('#result-bestof').value=(String(res));
      }
    }
    const balance_winrates_1=(e)=>{
      e.preventDefault();
      let p1=document.querySelector("#p1win").value;
      if (p1 == 0) {
        document.querySelector('#p2win').value=("");
      }
      else {
        document.querySelector('#p2win').value=(""+String((100-p1).toFixed(3)));
      }
    }
    const balance_winrates_2=(e)=>{
      e.preventDefault();
      let p2=document.querySelector("#p2win").value;
      if (p2 == 0) {
        document.querySelector('#p1win').value=("");
      }
      else {
        document.querySelector('#p1win').value=(""+String((100-p2).toFixed(3)));
      }
    }
    const MMRDiff=(e)=>{
      e.preventDefault();
      let perc = document.querySelector('#p1win').value/100;
      if (perc > 0.998 || perc < 0.002)
      {document.querySelector('#result_3').value= "MMR difference too large to be calculated."}
      else {
        var diff = (-Math.log((1-perc)/perc)/Math.log(10)) * 894.5134726042004;
        document.querySelector('#result_3').value=("MMR difference (P1 - P2): \n"+String(diff.toFixed(3)));
      }
    }
  return (
    <div className="App">
    <div className="container p-3 bg-dark text-white border">
    <h1>MMR Calculator</h1>
    <h5>Calculate win rates, best-of-ns, and more!</h5>
    </div>
    <div className="container p-3 border">
    <h5>Win percentage prediction:</h5>
    <form>
          <div class = "row pl-3">
          <div class = "col-*-* p-1">
          <input type="text" id="p1mmr" placeholder = "Player 1 MMR" />
          </div>
          <div class = "col-*-* p-1">
          <input type="text" id="p2mmr" placeholder = "Player 2 MMR" />
          </div>
          </div>
          <br/>
          <div class = "container pl-1"><p>Result:</p></div>
          <div class="row pl-3">
          <div class = "col-*-* p-1">
          <input type="textfield" id="result1" readOnly />
          </div>
          <div class = "col-*-* p-1">
          <input type="textfield" id="result2" readOnly />
          </div>
          </div>
          <div class = "container p-1">
          <button onClick={PredictWins}>Calculate</button>
          </div>
    </form>
    </div>
    <div className="container p-3 border">
    <h5>Best of...</h5>
    <form>
          <div class = "row pl-3">
          <div class = "col-*-* p-1">
          <input type="text" id="p1mmr_2" placeholder = "Player 1 MMR" />
          </div>
          <div class = "col-*-* p-1">
          <input type="text" id="p2mmr_2" placeholder = "Player 2 MMR" />
          </div>
          <div class = "col-*-* p-1">
          <input type="text" id="bestof" placeholder = "Best of ..." />
          </div>
          </div>
          <br/>
          <div class = "container p-1 color-white">
          <p>Result:</p>
          <textarea class="form-control" rows="11" cols="50" id="result-bestof" />
          </div>
          <div class = "container p-1">
          <button onClick={BestOf}>Calculate</button>
          </div>
    </form>
    </div>
    <div className="container p-3 border">
    <h5>Find MMR difference based on win %:</h5>
    <form>
          <div class = "row pl-3">
          <div class = "col-*-* p-1">
          <input type="text" id="p1win" onChange={balance_winrates_1} ref={(input)=> this.myinput = input} placeholder = "Player 1 Win %" />
          </div>
          <div class = "col-*-* p-1">
          <input type="text" id="p2win" onChange={balance_winrates_2} ref={(input)=> this.myinput = input} placeholder = "Player 2 Win %" />
          </div>
          </div>
          <br/>
          <div class = "container pl-1"><p>Result:</p></div>
          <div class="row pl-3">
          <div class = "col-*-* p-1">
          <textarea class="form-control" rows="3" cols="50" id="result_3" />
          </div>
          </div>
          <div class = "container p-1">
          <button onClick={MMRDiff}>Calculate</button>
          </div>
    </form>
    </div>
    <div className="container p-3 border bg-dark text-white">
    <p>Made by Will Z. Check out this project on <a href="https://github.com/wz-ml/MMR-Calculator-Sc2">Github</a>.</p>
    </div>
    </div>
  );
}
}
export default App;
