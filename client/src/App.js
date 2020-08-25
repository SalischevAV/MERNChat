import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux'
import { AppendMessage, justJoined, isTyping, notTyping } from './redux/actions/chatActions';
import io from 'socket.io-client';
import { store } from './redux/store';

const socket = io();

socket.on('online', data => {
  console.log(data.description);
})

socket.on('joined', data => {
  store.dispatch(justJoined(data.success));
});
socket.on('typing', data => {
  store.dispatch(isTyping(data));
});
socket.on('chat', data => {
  store.dispatch(AppendMessage(data));
});
socket.on('no_typing', data => {
  store.dispatch(notTyping(data));
})

function App(props) {
  const [handle, setHandle] = useState('');
  const [textArea, setTextArea] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    socket.emit('online', { description: 'user._id: 1234567890' })
  }, []);

  const handleTyping = () => {
    socket.emit('typing', {
      'handle': handle,
    });
  };

  const noMoreTyping = () => {
    socket.emit('no_typing', {
      'handle': handle,
    });
  };

  const handleSubmit = (handle, message) => {
    if (handle === '' || message === '') {
      setError('Handle or message should not be null');
      return
    }
    setError('');
    socket.emit('chat', {
      'handle': handle,
      'message': message,
    })
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={props.logo} className='App-logo' />
      </header>
      <div id='main'>
        <div id='status'>
          {props.joined ? <em>You are connected</em> : <em>You were denied connection</em>}
        </div>
        <div id='message' className='container'>
          <h1><em><strong>Chat messages</strong></em></h1>
          {props.typist ? <h2>{props.typist} is typing</h2> : null}
          {props.messages.length === 0 ? <h3><em>No messages</em></h3> : null}
          {props.messages.map((item, index) => {
            return (
              <div key={index} className='row'>
                <span><strong>{item.handle}:</strong></span>&nbsp;
                <div>
                  {item.message}
                </div>
              </div>
            )
          })}
        </div>
        <div id='form'>
          <form>
            <fieldset>
              <label htmlFor='handleField'>Handle</label>
              <input type='text' id='handleField' placeholder='Handle' value={handle} onChange={(e) => setHandle(e.target.value)} />
              <label htmlFor='messageField'>Message</label>
              <input type='text' placeholder='type a message' id='messageField' value={textArea} onChange={(e) => {
                setTextArea(e.target.value);
                if (e.target.value !== '') {
                  handleTyping();
                } else {
                  noMoreTyping();
                }
              }} />
              <input className='button-primary' type='submit' value='send' onClick={e => {
                e.preventDefault();
                handleSubmit(handle, textArea);
                setTextArea('');
                noMoreTyping();
              }} />
            </fieldset>
          </form>
          {error ? <blockquote>
            <p><em>Error: {error}</em></p>
          </blockquote> : null}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state=>{
  const{messages, typist, joined} = state.chatReducer;
  return{
    messages,
    typist,
    joined,
  }
}


export default connect(mapStateToProps)(App);
