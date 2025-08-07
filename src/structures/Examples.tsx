import { Tabs } from "@mantine/core";
import { ExtractionExample } from "./ExtractionExample";
import { MathExample } from "./MathExample";
import { MarkupExample } from "./MarkupExample";

export function Examples() {
    return <Tabs defaultValue="first">
    <Tabs.List>
      <Tabs.Tab value="Steps">Steps</Tabs.Tab>
      <Tabs.Tab value="Extraction">Extraction</Tabs.Tab>
      <Tabs.Tab value="Markup">Markup</Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="Steps"><MathExample /></Tabs.Panel>
    <Tabs.Panel value="Extraction"><ExtractionExample /></Tabs.Panel>
    <Tabs.Panel value="Markup"><MarkupExample /></Tabs.Panel>
  </Tabs>
}