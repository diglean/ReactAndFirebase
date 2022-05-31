import { useState, useEffect } from 'react';
import firebase from './firebaseConnection';
import './style.css';

function App() {
  const [idPost, setIdPost] = useState('');
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([]);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

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

  async function editaPost(){
    await firebase.firestore().collection('posts')
    .doc(idPost)
    .update({
      titulo: titulo,
      autor: autor
    })
    .then(()=>{
      console.log('Dados atualizado')
      setIdPost('');
      setTitulo('');
      setAutor('');
    })
    .catch(()=>{
      console.log('Erro ao atualizar');
    })
  }

  async function excluirPost(id){
    await firebase.firestore().collection('posts')
    .doc(id)
    .delete()
    .then(()=>{
      alert('este post foi excluido')
    })
  }

  async function novoUsuario(){
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then((value)=>{
      console.log(value);
    })
    .catch((error)=>{
      if(error.code === 'auth/weak-password'){
        alert('Senha muito fraca!');
      }else if(error.code === 'auth/email-already-in-use'){
        alert('Email já utilizado');
      }
    })
  }

  return (
    <div className="App">
      <h1>React.Js + Firebase :)</h1><br/>

      <div className="container">
        <label>Email </label>
        <input type="text" value={email} onChange={ (e)=> setEmail(e.target.value)}/> <br/>
        <label>Senha </label>
        <input type="password" value={senha} onChange={ (e)=> setSenha(e.target.value)}/> <br/>

        <button onClick={ novoUsuario }>Cadastrar</button>
      </div>

    <div className='container'>
    <h2>Banco de dados</h2>
    <label>Id:</label>
    <input type="text" value={idPost} onChange={ (e)=> setIdPost(e.target.value)}/>

    <label>Titulo: </label>
    <textarea type="text" value={titulo} onChange={(e)=> setTitulo(e.target.value)}/>

    <label>Autor: </label>
    <input type="text" value={autor} onChange={ (e) => setAutor(e.target.value) }/>

    <button onClick={ handleAdd }>Cadastrar</button>
    <button onClick={ buscaPost }>Buscar Posts</button>
    <button onClick={ editaPost }>Editar</button><br/>

    <ul>
      {posts.map((post)=>{
        return(
          <li key={post.id}>
            <span> ID - {post.id}</span><br/>
            <span>Titulo: {post.titulo}</span><br/>
            <span>Autor: {post.autor}</span><br/>
            <button onClick={ ()=> excluirPost(post.id) }>Excluir post</button><br/><br/>
          </li>
        )
      })}
    </ul>

    </div>

    </div>
  );
}

export default App;
