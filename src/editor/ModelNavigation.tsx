import {  Button, Group, Stack, Text } from '@mantine/core';
import { Records } from '@lib/models/ModelAdaptor.types';
import { ModelFactory } from '@lib/models';
import { useEffect, useState } from 'react';

export function ModelNavigation() {
  const [loading, setLoading] = useState(true)
  const [records, setRecords] = useState<Records | undefined>()

  useEffect(() => {
    ModelFactory.meta().find().then((records) => {
      setLoading(false)
      setRecords(records)
    })
      .catch((e) => {
        console.error(e)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return '...loading'
  }

  const items = records?.map((item) => (
    <Button
      onClick={(event) => {
        event.preventDefault()
      }}
      key={item.id}
    >
      {item.name as string}
    </Button>
  ));

  return (
    <div>
      <Group p="md">
        <Text>Models</Text>
      </Group>
      <Stack p="md">
        {items}
      </Stack>
    </div>
  );
}