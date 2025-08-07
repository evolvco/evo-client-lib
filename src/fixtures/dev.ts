import { db } from "@/models/db"
import { Project, ProjectStatus, Task, FileInfo, Message, TaskStatus, TaskComment, TaskPriority, TaskType, Agent, AgentType } from "@/models/types"
import { DBRealm } from "dexie-cloud-addon"
import { faker } from '@faker-js/faker';

export async function dev() {
    console.log('-------dev-------')
    
    return 

    let _realms: DBRealm[] = [...Array(10).keys()].map(() => {
        return {
            realmId: `rlm-${faker.string.uuid()}`,
            name: faker.book.title(),
            represents: faker.word.words(10),
            owner: db.cloud.currentUser!.value!.userId as string,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    })

    let _projects: Project[] = [...Array(10).keys()].map((v, i) => {
        return {
            id: faker.string.uuid(),
            name: faker.science.chemicalElement().name,
            description: faker.word.words(10),
            tasks: [],
            realmId: _realms[i].realmId,
            status: [ProjectStatus.Active, ProjectStatus.Completed, ProjectStatus.OnHold][Math.floor(Math.random() * 3)],
            startDate: new Date(),
            endDate: new Date(),
            owner: db.cloud.currentUser!.value!.userId as string,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    })

    let _tasks: Task[] = [...Array(1000).keys()].map((v,i) => {
        return {
            id: faker.string.uuid(),
            title: faker.company.buzzPhrase(),
            description: faker.word.words(10),
            dueDate: new Date(),
            done: [true, false][Math.floor(Math.random() * 2)],
            status: [
                TaskStatus.NOT_STARTED,
                TaskStatus.IN_PROGRESS,
                TaskStatus.COMPLETED,
                TaskStatus.DEFERRED,
                TaskStatus.DECLINED,
                TaskStatus.NOT_COMPLETED,
                TaskStatus.WAITING
            ][Math.floor(Math.random() * 7)],
            priority: [
                TaskPriority.Low,
                TaskPriority.Medium,
                TaskPriority.High
            ][Math.floor(Math.random() * 3)],
            type: [
                TaskType.Task,
                TaskType.Call,
                TaskType.Email,
                TaskType.ListEmail,
                TaskType.Evo
            ][Math.floor(Math.random() * 5)],
            project: _projects[i%10].id,
            level: faker.number.int(100),
            //parentId: null,
            //children: [], //Tasks
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    })

    let _taskComments:TaskComment[] = [...Array(10000).keys()].map((v,i) => {
        let email = faker.internet.email()
        return {
            id: faker.string.uuid(),
            task: _tasks[i%1000].id as string,
            comment: faker.word.words(10),
            createdAt: new Date(),
            createdBy: email,
            createdByDetails: {
                name: faker.person.fullName(),
                email: email,
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName()
            }
        }
    })

    //backreference tasks to projects
    let prodTaaskMap: { [key: string]: string[] } = {}
    _tasks.forEach((t:Task) => {
        if(prodTaaskMap[t.project as string]){
            prodTaaskMap[t.project as string].push(t.id as string)
        }else{
            prodTaaskMap[t.project as string] = [t.id as string]
        }
    })
    _projects.forEach((p) => {
        p.tasks = prodTaaskMap[p.id as string]
    })

    let _messages: Message[] = [...Array(100).keys()].map((v,i) => {
        return {
            id: faker.string.uuid(),
            content: faker.word.words(10),
            role: [
                'user',
                'assistant',
                'system',
                'peer'
            ][Math.floor(Math.random() * 4)] as 'user' | 'assistant' | 'system' | 'peer',
            timestamp: new Date(),
            threadId: faker.string.uuid(),
            createdAt: new Date(),
            updatedAt: new Date(),
            senderId: faker.string.uuid(),
            reaction: [
                'like',
                'dislike'
            ][Math.floor(Math.random() * 2)] as 'like' | 'dislike',
        }
    })

    let _agents: Agent[] = [...Array(10).keys()].map((v,i) => {
        return {
            id: faker.string.uuid(),
            name: faker.music.artist(),
            description: faker.word.words(10),
            type: [
                'evo','local-llama','fastapi','ollama','openai','anthropic','gemma'
            ][Math.floor(Math.random() * 7)] as AgentType,
            endpoint: faker.internet.url(),
            systemPrompt: faker.word.words(10),
            parameters: {},
            files: [],
            history: _messages.filter((f,j)=>{
                if(j>=(i*10) && j<(i*10+10)) return true
            }).map((m)=>m.id),
            isLocal: true,
            isActive: true,
            isRunning: true,
            isPaused: false,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    })


    //persist the data      
    await db.transaction('rw', [db.realms, db.projects, db.tasks, db.taskComments, db.messages, db.agents], async()=>{
        await db.realms.bulkAdd(_realms)
        await db.projects.bulkAdd(_projects)
        await db.tasks.bulkAdd(_tasks)
        await db.taskComments.bulkAdd(_taskComments)
        await db.messages.bulkAdd(_messages)
        await db.agents.bulkAdd(_agents)
    })

    //let rawTasks = await db.tasks.toArray()
    //let taskRecords = await  db.tasks.populate(rawTasks)
    //let taskCommentsRecords = await db.taskComments.toArray()
    //let projectsRecords = await db.projects.toArray()
    //let realmsRecords = await db.realms.toArray()

    //console.log(123456789, taskRecords[0] )
    /*
    
    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
    
    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      
    
    */


}
