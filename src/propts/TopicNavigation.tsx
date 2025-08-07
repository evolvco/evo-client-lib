import { Button, Stack, Text, Modal, TextInput, Flex } from '@mantine/core';
import { Records } from '@lib/models/ModelAdaptor.types';
import { ModelFactory } from '@lib/models';
import { useEffect, useState } from 'react';
import { useNotify } from '@/ui/Notify';
import { TopicNavigationItem } from './TopicNavigationItem';

export function TopicNavigation({ loadTopic }: { loadTopic: (id: string) => void }) {
    const [loading, setLoading] = useState(true)
    const [dialog, setDialog] = useState(false)
    const [mutate, setMutate] = useState(0)
    const [topic, setTopic] = useState<{ name: string, description: string }>({ name: '', description: '' })
    const [records, setRecords] = useState<Records | undefined>()
    const n = useNotify()

    useEffect(() => {
        ModelFactory.model('ctx_topic').find().then((records) => {
            setLoading(false)
            setRecords(records)
        })
            .catch((e) => {
                console.error(e)
                setLoading(false)
            })
    }, [mutate])

    if (loading) {
        return '...loading'
    }

    return (
        <div>
            <Stack p="md">
                <Button onClick={() => {
                    setDialog(true)
                    setTopic({ name: '', description: '' })
                }}>
                    <Text>New Topic</Text>
                </Button>
                {records?.map((item) => (
                    <TopicNavigationItem item={item} loadTopic={loadTopic} key={item.id} />
                ))}
            </Stack>
            <Modal
                opened={dialog}
                onClose={() => setDialog(false)}
                title="New Topic"
            >
                <Flex direction="column">
                    <TextInput
                        label="Name"
                        value={topic.name}
                        onChange={(e) => setTopic({ ...topic, name: e.target.value })}
                    />
                    <TextInput
                        label="Description"
                        value={topic.description}
                        onChange={(e) => setTopic({ ...topic, description: e.target.value })}
                    />
                </Flex>
                <Button disabled={topic.name.length === 0} onClick={async () => {
                    await ModelFactory.model('ctx_topic').create({
                        name: topic.name,
                        description: topic.description
                    })
                    setDialog(false)
                    setMutate(mutate + 1)
                    n?.setMessage({
                        message: `Topic ${topic.name} created`,
                        type: 'success',
                        title: 'success'
                    })
                }}>Create</Button>
            </Modal>
        </div>
    );
}