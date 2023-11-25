import {useState, React} from 'react';
import './DevPost.css'

const DevPost = () => {
    // w link: https://code.visualstudio.com/docs/nodejs/reactjs-tutorial
    const [input_data, setInputData] = useState(''); // manages values of post text
    const [reply_data, setReplyData] = useState(''); // stores reply text data
    const [show_input, enableInput] = useState(0); // manages whether posting textbox is shown or not
    const [show_reply, enableReply] = useState(-1); // manages whether reply box is open or not
    const [show_replies, enableReplies] = useState(-1);
    const [components, setComponents] = useState([]); // manages post history, eventually will connect to database
    const [index, setIndex] = useState(0); // manages index of post

  
    const handleSubmit = () => { // when post submitted
      setComponents(previousState => [...previousState, {
            "postContent": input_data,
            "likes": 0,
            "replyContent": [],
            "index": index
            }]
        ); // append to history of previous posts
      setIndex(index+1);
      setInputData(''); // clear current_post manager
      enableInput(0); // remove posting text box from screen
    };
    
    const handleReplySubmit = (id) => {
        const temp = components[id]["replyContent"];
        components[id]["replyContent"] = [...temp, reply_data];
        setReplyData('');
        enableReply(-1);
    }

    const showReplies = (id) => {
        enableReplies(id);
    }
    const hideReplies = () => {
        enableReplies(-1);
    }
    const Agwee = () => { // show posting text box
      enableInput(1);
    };
    
    const DisAgwee = () => {
        enableInput(0);
    }
  
    const handleChange = (event) => { // update current value of post text
      setInputData(event.target.value);
    };

    const handleRepChange = (event) => {
      setReplyData(event.target.value);
    }


    const updateLikes = (id) => {
        components[id]["likes"] +=1;
        console.log(components[id]["likes"]);
    }

    const ReplyContainer = (props) => {
        return(
            <p className="replies"> {props.text} </p>
        );
    }
    const PostSubmitted = (props) => { // posted post HTML ontainer
        const myIndex = props.eleIndex;
        const myArr = components[myIndex];
        const myLikes = myArr["likes"];
        if (show_reply !== myIndex && show_replies !== myIndex){
            return(
                <div>
                    <p> {props.text} </p>
                    <button type="button" onClick={(e) => updateLikes(myIndex)}> Likes {myLikes} </button>
                    <button type="button" onClick={(e) => enableReply(myIndex)}> Reply </button>
                    <button type="button" onClick={(e) => showReplies(myIndex)}> See Replies </button>
                </div>
            );
        }
        else if (show_reply !== myIndex && show_replies === myIndex){
            console.log(components[myIndex]["replyContent"]);
            return(
                <div>
                    <p> {props.text} </p>
                    {myArr["replyContent"].map((item, i) => (
                    <ReplyContainer key={i} text={item} eleIndex={myIndex} />
                    ))}
                    <button type="button" onClick={(e) => updateLikes(myIndex)}> Likes {myLikes} </button>
                    <button type="button" onClick={(e) => enableReply(myIndex)}> Reply </button>
                    <button type="button" onClick={(e) => hideReplies(myIndex)}> Hide Replies </button>
                </div>
                
            );
        }
        else {
            return(
                <div>
                    <p> {props.text} </p>
                    <textarea
                        type="text"
                        name="title"
                        value={reply_data}
                        className="postBox replyBox"
                        onChange={(e) => handleRepChange(e)}
                    />
                    <button type="button" onClick={(e) => handleReplySubmit(myIndex)}> Submit </button>

                </div>
            );
        }
      }
    
    const RenderText = () => { // post text box HTML container
      if (show_input === 1) {
        return (
          <form>
            <textarea
              type="text"
              name="title"
              value={input_data}
              className="postBox"
              onChange={(e) => handleChange(e)}
            />
            <br />
            <button type="button" onClick={handleSubmit}>
              Release
            </button>
            <button className="X" type="button" onClick={DisAgwee}>X</button>
          </form>
        );
      }
    };
  
    return (
      <div className="pageContent">
        <div className="webIntro">
            <h3> Your Feed lmao </h3>
            <button onClick={Agwee}> Post </button>
        </div>
        {RenderText(show_input)}
        <div className="posts">
            {components.map((item, i) => (
            <PostSubmitted key={i} text={item["postContent"]} eleIndex={item["index"]} />
            ))}
        </div>
      </div>
    );
  };
  
export default DevPost;
  
