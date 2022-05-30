import { useState } from 'react';
import firebase from './firebaseConnection';
import './style.css';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  async function handleAdd(){
    await firebase.firestore().collection('posts')
    // .doc('12345')
    // .set({
    //   titulo: titulo,
    //   autor: autor
    // })
    .add({
      titulo: titulo,
      autor: autor
    })
    .then(()=>{
      console.log('Dados cadastrados com sucesso!');
      setTitulo('');
      setAutor('');
    })
    .catch((error)=>{
      console.log('Houve algum erro: '+error);
    })
  }

  async function buscaPost(){
    await firebase.firestore().collection('posts')
    .doc('123')
    .get()
    .then((snapshot)=>{
      setTitulo(snapshot.data().titulo);
      setAutor(snapshot.data().autor);
    })
    .catch(()=>{
      console.log("Deu algum erro");
    })
  }

  return (
    <div className="App">
      <h1>React.Js + Firebase :)</h1><br/>

    <div className='container'>
    <label>Titulo: </label>
    <textarea type="text" value={titulo} onChange={(e)=> setTitulo(e.target.value)}/>

    <label>Autor: </label>
    <input type="text" value={autor} onChange={ (e) => setAutor(e.target.value) }/>

    <button onClick={ handleAdd }>Cadastrar</button>
    <button onClick={ buscaPost }>Buscar Posts</button>

    </div>

    </div>
  );
}

export default App;
