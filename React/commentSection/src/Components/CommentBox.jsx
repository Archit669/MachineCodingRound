import React, { useEffect, useState } from "react";

function CommentBox({ data, addToReplies, deleteComment }) {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  const [isEdit, SetIsEdit] = useState(false);

  const handleEnter = (event) => {
    if (event.target.value && event.key == "Enter") {
      const newComment = {
        id: Date.now(),
        username: "@archit",
        comment: event.target.value,
        replies: [],
      };

      addToReplies(data.id, newComment, isEdit)
      setReplyValue("");
      setShowCommentBox(false);
      SetIsEdit(false);
    }
  };


  const handleEdit = ()=> {
    setShowCommentBox(true);
    SetIsEdit(true);
    setReplyValue(data.comment);
  }

  const handleDelete = () => {
    deleteComment(data.id);
  }


  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "20px 0px",
        }}
      >
        <img
          src="./avatar.jpg"
          alt="this is avatar image"
          style={{ height: "40px", width: "40px" }}
        />
        <div>
          <div style={{ color: "blue" }}>{data.username}</div>
          <div>{data.comment}</div>
        </div>
      </div>

      {!showCommentBox ? (
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setShowCommentBox(true)}>reply</button>
          <button onClick={()=> handleEdit()}>Edit</button>
          <button onClick ={()=> handleDelete()}>Delete</button>
        </div>
      ) : (
        <input
          style={{ marginLeft: "30px" }}
          type="text"
          value={replyValue}
          placeholder="write your reply.."
          onChange={(e) => setReplyValue(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}
        />
      )}

      {
        data.replies.map((data)=> {
            return (
                <div style={{marginLeft : "50px"}}>
                    <CommentBox data = {data} addToReplies={addToReplies} deleteComment={deleteComment}/>
                </div>
            )
        })
      }
    </div>
  );
}

export default CommentBox;
