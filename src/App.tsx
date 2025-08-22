import { useEffect, useState } from 'react'
import { 
  Loader
} from '@mantine/core';
import {connect} from './models'
import { TriLayout, useNotify } from '@lib/ui';
import { Simple, TopicNavigation } from './propts';
import { ModelFactory } from '@lib/models';
import { ObjectId } from '@lib/types/models/ModelAdaptor.types';
import { ChatRoom } from './chat';

export function App() {
  const [loading, setLoading] = useState(true)
  const [topic, setTopic] = useState<Record<string, any>>({})

  const n = useNotify()

  useEffect(()=>{
    connect().then(()=>{
      setLoading(false)
    })
    .catch((e)=>{
      console.error(e)
      setLoading(false)
      n?.setMessage({
        message:e.message,
        type:'danger',
        title:'error'
      })
    })
  }, [])

  const loadTopic = async (id: string) => {
    try {
      const res: any = await ModelFactory.model('ctx_topic').findById(id as ObjectId)
      setTopic(res)
    } catch (e:any) {
      console.error(e)
      n?.setMessage({
        message:e.message,
        type:'danger',
        title:'error'
      })
    }
  }

  if(loading){
    return <Loader />
  }

  const leftPanel = <TopicNavigation loadTopic={loadTopic} />
  const rightPanel = <ChatRoom />

  return (<TriLayout 
    leftPanel={leftPanel} 
    rightPanel={rightPanel} 
  >
    <Simple key={topic.id} topic={topic} />
  </TriLayout>)
}
    
    
      









