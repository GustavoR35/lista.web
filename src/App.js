import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import './App.css'

var arr = new Array();

function App() {
  const [task, SetTask] = useState([])


  useEffect(() => {
    fecthData();
  }, []);

  const fecthData = async () => {
    await axios("http://localhost:4003/findAluno", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log("Sucesso em fetch categoria!", response.data);
        SetTask(response.data);
      })
      .catch((error) => {
        console.log("Erro em fetch categoria!", error);
      });
  };


  const fecthAdd = async (data) => {
    await axios("http://localhost:4003/createAluno", {
      method: "POST", 
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log("Sucesso em fetch categoria!", response.data);
        fecthData();
      })
      .catch((error) => {
        console.log("Erro em fetch categoria!", error);
      });
  };

  const fecthDel = async (data) => {
    await axios("http://localhost:4003/deleteAluno", {
      method: "DELETE", 
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log("Sucesso em fetch categoria!", response.data);
        fecthData();
      })
      .catch((error) => {
        console.log("Erro em fetch categoria!", error);
      });
  };


  return (

    <div className='App'>
      <div>
        <label htmlFor="name">Tarefa</label>
        <br />
        <input type="text" id="name" />
      </div>

      <div>
        <label htmlFor="date">Date</label>
        <br />
        <input type="date" id="date" />
      </div>

      <div>
        <input type="button" id="btn" value={"Adicionar"} onClick={() => {

          var nameValue = document.querySelector("#name").value
          var dateValue = document.querySelector("#date").value

          dateValue = dateValue.replace(/-/g, "/")

          //arr.push({id: arr.length, name: nameValue, data: dateValue});
          // SetTask(new Array(arr));
          fecthAdd({ nome: nameValue })
          fecthData()
        }} />
      </div>

      <hr />

      <ul>
        {(task.length > 0) ? task.map((t) => (
          <li key={t.id}>
            <p>
              {t.id}
            </p>
            -
            <p>
              {t.nome}
            </p>

            <button onClick={() => {
              //console.log(t.id)
              fecthDel({id:t.id})
            }}>
              X
            </button>
          </li>
        )) : (
          <li>
            <p>
              Vazio
            </p>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
