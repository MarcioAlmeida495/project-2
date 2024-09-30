/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState, useMemo } from 'react';
import './App.css';
import { LoadingIcon } from './Components/Loading/LoadingIcon';
import p from 'prop-types'

var counter = 0;
var bool = false;

const Post = ({ post, fn }) => {
  console.log('filho Renderizou');
  return (
    <div className='post' key={post.id}>
      <h1 onClick={() => fn(post.title)} >{post.title}</h1>
      <p>{post.body}</p>
    </div>
    )
}

Post.propTypes = {
  post: p.shape({
    id: p.number,
    title: p.string,
    body: p.string,
  },
  ),
  fn: p.func,
}

function App () {
  const [Posts, setPosts] = useState([]);
  const [value, setValue] = useState('');
  const input = useRef(null);

  console.log('Pai renderizou', counter);
  counter++;
  bool = !bool;

  useEffect(() => {
    console.log(input.current);
    input.current.focus();
  }, [value])

  useEffect(()=>{
    bool ? console.log('tudo feito') : console.log('nada feito')

  },[counter])

  useEffect(()=>{
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response =>
        response.json()
          .then(Posts => {
            setPosts(Posts);
          })
      )
    }, 5000);

  },[]);

  const getTitle = (text) => {
    text ? setValue(text) : console.log('Nenhum Texto')
  }

  return (
    <div className="App">
      <input ref={input} type="search" value={value} onChange={(e) => setValue(e.target.value)} />
      {useMemo(()=>{
        return Posts.length > 0 &&
        Posts.map( post => {
          return (
            <Post key={post.id} post={post} fn={getTitle} />
          )}
        )
      }, [Posts])}

      {Posts.length <= 0 &&
        <LoadingIcon />
      }
    </div>
  )
}

export default App;
