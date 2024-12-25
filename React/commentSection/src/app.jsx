import { useState } from "preact/hooks";
import "./app.css";
import CommentBox from "./Components/CommentBox";

// sample data format

// const data = [
//   {
//     id: Date.now(),
//     username: "@architjain669",
//     comment: "hello i am archit",
//     replies: [
//       {
//         id: Date.now(),
//         username: "@jain432",
//         comment: "hello this is comment",
//         replies: [],
//       },
//     ],
//   },
//   {
//     id: Date.now(),
//     username: "@architjain669",
//     comment: "hello i am archit",
//     replies: [
//       {
//         id: Date.now(),
//         username: "@jain432",
//         comment: "hello this is comment",
//         replies: [],
//       },
//     ],
//   },
// ];

export function App() {
  const [commentData, setCommentData] = useState([]);
  const [comment, setComment] = useState("");
  
  const handleEnter = (event) => {
    if (event.target.value && event.key == "Enter") {
      const newComment = {
        id: Date.now(),
        username: "@archit",
        comment: event.target.value,
        replies: [],
      };

      setCommentData([...commentData, newComment]);
      setComment("");
    }
  };

  const addToReplies = (id, newComment, isEdit) => {

    const helper = (commentData, id, newComment) => {

      for (let idx = 0 ; idx < commentData.length ; idx++){
        if (commentData[idx].id === id){
          if (!isEdit) commentData[idx].replies.push(newComment);
          else commentData[idx].comment = newComment.comment;
          return;
        }else{
          helper(commentData[idx].replies, id, newComment )
        }
      }

    }

    helper(commentData, id, newComment, isEdit)
  }

  function deleteComment(id) {
    const helper = (comments, id) => {
      return comments
        .filter((comment) => comment.id !== id) 
        .map((comment) => ({
          ...comment,
          replies: helper(comment.replies, id), 
        }));
    };
  
    const newCommentData = helper(commentData, id);
    setCommentData(newCommentData);
  }
  

  return (
    <>
      <div>
        <input
          type="text"
          value={comment}
          placeholder="Leave a Comment..."
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}
        />
      </div>

      <div style={{ marginTop: "= {data}/>10px" }}>
        <div>
          {commentData.map((data) => {
            return (
              <CommentBox data = {data} addToReplies = {addToReplies} deleteComment={deleteComment}/>
            );
          })}
        </div>
      </div>
    </>
  );
}
