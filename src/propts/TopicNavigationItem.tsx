import { Button, Text, Card } from '@mantine/core';

export function TopicNavigationItem({item, loadTopic}: {item: any, loadTopic: (id: string) => void}) {
    
    return <Card shadow="sm" padding="md" radius="md" withBorder key={item.id} >
        <Text>{item.name as string}</Text>
        <Text size="sm" c="dimmed">{item.description as string}</Text>
        <Button variant="light" color="blue" onClick={() => {
            loadTopic(item.id)           
        }}>
            Continue
        </Button>
    </Card>
}