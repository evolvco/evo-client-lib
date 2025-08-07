import { Badge, Flex, UnstyledButton, Tooltip } from "@mantine/core";
import { IconLayoutBottombarExpand, IconLayoutNavbarExpand } from "@tabler/icons-react";

export function Recap({ count, recap, setRecap }: { count: number, recap: boolean, setRecap: (recap: boolean) => void }) {

    if (!recap) {
        return <UnstyledButton  onClick={() => setRecap(true)}>
            <Tooltip label="Show Recap">
                <Flex justify="center" align="center">
                    <Badge>{count}</Badge>
                    <IconLayoutBottombarExpand />  
                </Flex>
            </Tooltip> 
        </UnstyledButton>
    }

    return <UnstyledButton  onClick={() => setRecap(false)}>
        <Tooltip label="Hide Recap">
            <Flex justify="center" align="center">
                <Badge>{count}</Badge>
                <IconLayoutNavbarExpand />  
            </Flex>
        </Tooltip> 
    </UnstyledButton>
}
