import { useEffect, useState } from 'react'
import { useDisclosure,  } from '@mantine/hooks';
import { 
  AppShell, 
  Burger,
  Flex,
  Loader
} from '@mantine/core';
import logo from '@/assets/logo.png'
import {connect} from './models'
import { Notify, useNotify } from './ui/Notify';
import { Simple, TopicNavigation } from './propts';
import { ModelFactory } from '@lib/models';
import { ObjectId } from '@lib/models/ModelAdaptor.types';
import { ChatRoom } from './chat';

function App() {
  const [onav, { toggle:tnav }] = useDisclosure();
  const [oaside, { toggle:taside }] = useDisclosure();
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

  return (<AppShell
    header={{ height: 60 }}
    navbar={{
      width: 250,
      breakpoint: 'sm',
      collapsed: { mobile: !onav, desktop: !onav },
    }}
    aside={{
      width: 250,
      breakpoint: 'sm',
      collapsed: { mobile: !oaside, desktop: !oaside },
    }}
    padding="md"
  >
    <AppShell.Header 
      p="md" 
      style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}
    >
      <Burger
        opened={onav}
        onClick={tnav}
        size="sm"
      />
      <img src={logo} />
      <Burger
        opened={oaside}
        onClick={taside}
        size="sm"
      />
    </AppShell.Header>
    <AppShell.Navbar >
      <TopicNavigation loadTopic={loadTopic} />
    </AppShell.Navbar>
    <AppShell.Aside p="md">
      <ChatRoom />
    </AppShell.Aside>
      <AppShell.Main>
      <Notify open={!!n?.message.type} onClose={()=>n?.setMessage({})} title={n?.message.title} type={n?.message.type}>
        {n?.message.message}
        </Notify>
        <Flex direction="row">
          <Flex direction="column"  style={{flex:1}}>
            <Simple key={topic.id} topic={topic} />
          </Flex>
        </Flex>  
      </AppShell.Main> 
    </AppShell>)
}

export default App









