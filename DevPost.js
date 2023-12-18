import {useState, useEffect, React} from 'react';
import './DevPost.css'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import firebaseApp from '../firebase';
import { getDatabase, ref, set, onValue } from "firebase/database";

const DevPost = () => {
  const [show_post_box, enablePost] = useState(0); 
  const [post_content, setPostContent] = useState();
  const [post_text, setPostText] = useState('');
  const [index, setIndex] = useState(0);
  const [posts, addPost] = useState([]);

  const postDisplay = () => {//setComponents(previousState => [...previousState, {
    addPost([]);
    if (post_content != null){
      Object.keys(post_content).map(i => {
        addPost(previousState => [...previousState, post_content[i].post_content]);
      });
    }
  }
  useEffect(()=>{
    const pullPosts = () => {
      const db = getDatabase(); // use ref to interact w data, second parameter is path to which we want to read and write from 
      const reference = ref(db, 'posts');
      const data_snatched = onValue(reference, (snapshot) => {
        const data = snapshot.val();
        setPostContent(data);
      });
      }
      pullPosts();
      postDisplay();
  }, []);

  // USER IS SUBMITTING => uploads post to firebase db
  const db = getFirestore(firebaseApp);
  function writePostData(like_num, reply_list, post_content, post_num){
    const db = getDatabase(); // use ref to interact w data, second parameter is path to which we want to read and write from 
    const reference = ref(db, 'posts/'+post_num);
    set(reference,{
      likes: like_num,
      post_content: post_content,
      replies: reply_list
    });
  }

  const handleSubmit = () => {
    writePostData(0, [null], post_text, index);
    setIndex(index+1);
    setPostText(''); // clear text in text box
    enablePost(0); // remove posting text box from screen
    postDisplay();
  }

  const RenderText = () => { // post text box HTML container
    if (show_post_box >= 1) {
      return (
        <form>
          <textarea
            type="text"
            name="title"
            value={post_text}
            className="postBox"
            onChange={(e) => setPostText(e.target.value)}
          />
          <br />
          <button type="button" onClick={handleSubmit}>
            Release
          </button>
          <button className="X" type="button" onClick={(e) => enablePost(0)}>X</button>
        </form>
      );
    }
  };




  return(
    <div className="pageContent">
      {/* USER IS POSTING => Posting Button */}
      <div>
        <h1> Feed </h1>
        <button onClick={(e) => enablePost(show_post_box+1)}> Post </button>
      </div>

      {RenderText(show_post_box)}

      <div className="posts">
        {posts.map((item, i) => (
          <p> {item} </p>))}
      </div>
    </div>
  );
};
  
export default DevPost;
  