import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { useState, useEffect } from 'react';

let ydoc = new Y.Doc();
let messages = ydoc.getArray('messages');

//const provider = new WebrtcProvider('chat-room', ydoc, {
//    signaling: ['wss://localhost:3001']
//});

export function ChatRoom() {
   
    const [chat, setChat] = useState<any[]>([]);

    useEffect(() => {

        //provider.on('synced', () => {
        //    console.log('synced')
        //  })

          ydoc.on('update', (update, origin) => {
            console.log('update', update, origin)
            //if (origin !== 'doc1') {
            //  return
            //}
            Y.applyUpdate(ydoc, update)
          })

        messages.observe(() => {
            console.log('observe messages', messages, messages.toArray())
            setChat([...messages.toArray()])
        });
    }, []);

    const sendMessage = (msg: string) => {
        ydoc.transact( ()=> {
            messages.push([msg]);
        },'chat-room')
    }
    return (<>
        <div>
        { chat.map((msg, index) =>{
            return <p key={ index } > { msg } </p> 
        }) }
            < input 
                type='text' 
                onKeyDown={(e: any) => { 
                    if (e.key === 'Enter') {
                        sendMessage(e.target.value); 
                        e.target.value = ''; 
                    }
                }
        } />
        </div>
    </>)
 }
