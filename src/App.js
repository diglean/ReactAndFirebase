import { useState, useEffect } from 'react';
import firebase from './firebaseConnection';
import './style.css';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    async function loadPosts(){
      await firebase.firestore().collection('posts')
      .onSnapshot((doc)=>{
        let meusPosts = [];
        doc.forEach((item)=>{
          meusPosts.push({
            id: item.id,
            titulo: item.data().titulo,
            autor: item.data().autor
          })
        });

        setPosts(meusPosts);

      })
    }

    loadPosts();
  }, []);

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
    // await firebase.firestore().collection('posts')
    // .doc('123')
    // .get()
    // .then((snapshot)=>{
    //   setTitulo(snapshot.data().titulo);
    //   setAutor(snapshot.data().autor);
    // })
    // .catch(()=>{
    //   console.log("Deu algum erro");
    // })

    await firebase.firestore().collection('posts')
    .get()
    .then((snapshot)=>{
      let lista = [];
      snapshot.forEach((doc)=>{
        lista.push({
          id:doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        })
      })

      setPosts(lista);

    })
    .catch(()=>{
      console.log('Deu algum erro');
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
    <button onClick={ buscaPost }>Buscar Posts</button><br/>

    <ul>
      {posts.map((post)=>{
        return(
          <li key={post.id}>
            <span>Titulo: {post.titulo}</span><br/>
            <span>Autor: {post.autor}</span><br/><br/>
          </li>
        )
      })}
    </ul>

    </div>

    </div>
  );
}

export default App;
