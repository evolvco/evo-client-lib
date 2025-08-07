import { Table } from 'dexie';

export interface LocalUser {
    id?: string;
    email: string;
    name: string;
    avatar?: string;
    bio?: string;
    role?: string;
    firstName: string;
    lastName: string;
    phone?: string;
    title?: string;
    type?: string;
    status?: string;
    projects?: string[];
    tasks?: string[];
    comments?: string[];
    files?: string[];
    settings?: {
        userId: string;
        settings: Record<string, any>;
    };
    allowAddById?: boolean;
    profileId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    roles: string[];
}

export type UserStatus = 'active' | 'inactive' | 'deleted'
export type UserRole = 'admin' | 'user' | 'guest'
export type UserWithCount = LocalUser & { count: number }

export interface UserPreference {
    id?: string;
    userId: string;
    preference: string;
    description: string;
    value: string;
    type: string;
    subType: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Profile {
    id?: string;
    userId?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    type?: string;
    status?: string;
    projects?: string[];
    tasks?: string[];
    comments?: string[];
    files?: string[];
    avatar?: string;
    phone?: string;
    title?: string;
    bio?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Agent Types
export interface Agent {
    id?: string;
    name: string;
    description: string;
    type: AgentType;
    endpoint: string;
    systemPrompt: string;
    parameters: Record<string, any>;
    files: FileInfo[]|string[];
    history: Message[]|string[];
    isLocal: boolean;
    isActive: boolean;
    isRunning: boolean;
    isPaused: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type AgentStatus = 'active' | 'inactive' | 'paused' | 'deleted'

export type AgentType = 'evo' | 'local-llama' | 'fastapi' | 'ollama' | 'openai' | 'anthropic' | 'gemma'

export type AgentState = {
    agents: Agent[];
    selectedAgent: Agent | null;
    selectAgent: (agent: Agent | null) => void;
};

export type AgentAction = {
    type: 'SELECT_AGENT';
    payload: Agent | null;
};

export type AgentReducer = (state: AgentState, action: AgentAction) => AgentState;

export type AgentContextType = AgentState & {
    selectAgent: (agent: Agent | null) => void;
};

export type AgentProviderProps = {
    children: React.ReactNode;
};

export type AgentContext = React.Context<AgentContextType>;

export type AgentProvider = React.Provider<AgentContextType>;

export interface AgentRequest {
    threadId: string;
    agentId: string;
    message: string;
    role: "user" | "assistant";
    context?: string;
    history?: { role: "user" | "assistant"; content: string }[];
    files?: FileInfo[];
}

export interface AgentMessage {
    threadId: string;
    agentId: string;
    role: "assistant" | "user";
    content?: string;
    reader?: ReadableStreamDefaultReader<Uint8Array>;
    stream?: boolean;
}

export interface AgentStep {
    id?: string;
    agentId: string;
    name: string;
    description: string;
    type: string;
    status: string;
    error: string;
    endpoint: string;
    systemPrompt: string;
    commands: string[];
    tools: Tool[];
    parameters: Record<string, any>;
    files: FileInfo[];
    history: Message[];
    isActive: boolean;
    isRunning: boolean;
    isPaused: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface AgentFlow {
    id?: number;
    nodes: any[]
    edges: any[]
}

export declare enum ExtensionTypeEnum {
    Assistant = 'assistant',
    Conversational = 'conversational',
    Inference = 'inference',
    Model = 'model',
    SystemMonitoring = 'systemMonitoring',
    HuggingFace = 'huggingFace',
}

export interface ClassificationResult {
    documentType: string;
    confidence: number;
    categories: string[];
    metadata: {
        classifiedAt: string;
        model: string;
        [key: string]: any;
    };
}

export interface ApiKey {
    id?: string;
    name: string;
    key: string;
    secret: string;
    createdAt: Date;
}

export interface Credential {
    id?: string;
    name: string;
    credentialName: string;
    value: string;
    encryptedData: string;
    createdAt: Date;
}

export interface CredentialType {
    id?: string;
    name: string;
    description: string;
    createdAt: Date;
}

export interface Completion {
    id?: string;
    name: string;
    description: string;
    createdAt: Date;
}

export interface Command {
    id?: string;
    name: string;
    content: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Prompt {
    id?: string;
    name: string;
    content: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}

// Chat Types
export interface Chat {
    id?: string;
    title: string;
    createdAt: Date;
}

export interface ChatMessage {
    id?: string
    content: string
    threadId: string
    senderId: string
    receiverId: string
    status: 'sending' | 'sent' | 'delivered' | 'read' | 'queued' | 'failed'
    role: 'user' | 'assistant' | 'system' | 'peer'
    timestamp: Date
    createdAt: Date
    updatedAt: Date
    attachments?: ChatAttachment[]
}

export interface ChatAttachment {
    id: string
    messageId: string
    chatMessageId: string
    fileName: string
    fileType: string
    fileSize: number
    blobId: string
    localPath?: string
    status: 'uploading' | 'downloaded' | 'pending' | 'failed'
    createdAt: Date
    updatedAt: Date
}

export interface FileBlob {
    id: string
    data: Blob
    hash: string
    createdAt: Date
    updatedAt: Date
}

export interface ChatThread {
    id: string
    title: string
    participantIds: string[]
    type: 'direct' | 'group'
    lastMessageAt?: Date
    messages: ChatMessage[]
    createdAt: Date
    updatedAt: Date
}

export interface ChatParticipant {
    id: string
    threadId: string
    userId: string
    lastSeenAt: Date
    status: 'online' | 'offline'
    lastDeliveredMessageId?: string
    lastReadMessageId?: string
    createdAt: Date
    updatedAt: Date
}

export interface MessageQueue {
    id: string
    messageId: string
    receiverId: string
    retryCount: number
    nextRetryAt?: Date
    status: 'pending' | 'retrying' | 'failed'
    createdAt: Date
    updatedAt: Date
}

export interface ChatState {
    threads: ChatThread[];
    currentThread: ChatThread | null;
    isLoading: boolean;
    error: string | null;

    createThread: (config: EndpointConfig) => Promise<void>;
    loadThreads: () => Promise<void>;
    selectThread: (threadId: string) => Promise<void>;
    sendMessage: (content: string) => Promise<void>;
    clearError: () => void;
}

export interface EndpointConfig {
    type: EndpointType;
    url?: string;
    apiKey?: string;
    model?: string;
    defaultPayload?: Record<string, any>;
}

export type EndpointType = 'openai' | 'fastapi' | 'llamacpp';

export interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system' | 'peer';
    content: string;
    timestamp: Date;
    threadId: string;
    createdAt: Date;
    updatedAt: Date;
    senderId?: string;
    reaction?: 'like' | 'dislike';
}

export interface Thread {
    id?: string
    title: string
    messages: Message[]
    lastUsedAgentId?: string
    lastUsedAgent?: Agent
    lastMessageAt: Date
    agentId?: string
    createdAt: Date
    updatedAt: Date
}

export interface ThreadMessage {
    id?: string;
    threadId: string;
    messageId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface DocumentStore {
    id?: string;
    name: string;
    description: string;
    loaders: string[];
    whereUsed: string[];
    status: string;
    vectorStoreConfig: string;
    embeddingConfig: string;
    recordManagerConfig: string;
    tags: string[];
    resources: {
        id: string;
        type: 'link' | 'document' | 'note';
        title: string;
        content: string;
        url?: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Tool {
    id?: string;
    name: string;
    description: string;
    color: string;
    iconSrc: string;
    schema: string;
    function: string;
    query: string;
    parameters: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UpsertHistory {
    id?: string;
    name: string;
    result: string;
    createdAt: Date;
    date: Date;
}

export interface UpsertResult {
    id?: string;
    name: string;
    result: string;
}

// Comment Types
export interface Comment {
    id?: string;
    messageId?: string;
    taskId?: string;
    comment: string;
    createdAt: Date;
}

// Document and File Types
export interface Document {
    id: string;
    name: string;
    content: string;
    vectorized: boolean;
    type: string | null;
    size: number | null;
    contactId: string | null;
    link: string | null;
    path: string | null;
    text: string | null;
    documentTypeId: string | null;
    documentSubTypeId: string | null;
    bucketName: string | null;
    expirationDate: Date | null;
    completedDate: Date | null;
    notes: string | null;
    initialReview: DocumentInitialReview | null;
    workId: string | null;
    workStatus: string | null;
    embedding?: Float32Array;
    metadata?: Record<string, any>;
    chunks?: DocumentChunk[];
    createdAt: Date;
    updatedAt: Date;
}

export interface DocumentWithRelations extends Document {
    markdown: string | null;
    textract: string | null;
    folderId: string | null;
}

export interface DocumentType {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    createdById: string;
    updatedAt: Date;
    lastModifiedById: string;
    documentSubTypes: DocumentSubType[];
    documents: Document[];
}

export interface DocumentSubType {
    id: string;
    documentTypeId: string;
    documentType: DocumentType;
    name: string;
    description: string;
    createdAt: Date;
    createdById: string;
    updatedAt: Date;
    lastModifiedById: string;
    documents: Document[];
}

export enum DocumentInitialReview {
    NOT_NEEDED = 'NOT_NEEDED',
    DUPLICATE = 'DUPLICATE'
  }

export interface DocumentChunk {
    id?: number;
    documentId: string;
    content: string;
    embedding?: Float32Array;
    metadata?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface DocumentFolder {
    id?: string;
    name: string;
    parentId?: string;
    parent?: DocumentFolder;
    children?: DocumentFolder[];
    createdAt: Date;
    updatedAt: Date;
}


export interface UserFields {
    id: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    roles: string[];
    status?: string;
    phone?: string;
}

export interface Event {
    id?: string;
    title: string;
    description?: string;
    start: Date;
    end: Date;
    type: EventType;
    subject: string;
    startDate: string;
    endDate: string;
    location?: string;
    recurrenceType?: string;
    recurrenceEndDateOnly?: string;
    createdAt?: Date;
    updatedAt?: Date;
    ownerId?: string;
    owner?: LocalUser;
    createdById?: string;
    createdBy?: LocalUser;
    isTempEvent?: boolean;
    isReminderSet?: boolean;
    reminderDateTime?: Date;
    showAs?: string;
    durationInMinutes?: number;
    isAllDayEvent?: boolean;
    isDeleted?: boolean;
    eventRelation?: EventRelation;
}

export interface EventRelation {
    id?: string
    eventId?: string
    status?: string
    respondedDate?: Date
    response?: string
    createdDate?: Date
    createdById?: string
    createdBy?: LocalUser
    isDeleted?: boolean
    relatedUserId?: string
    relatedUser?: LocalUser
    lastModifiedDate?: Date
    lastModifiedById?: string
    lastModifiedBy?: LocalUser
}

export enum EventType {
    Call = 'Call',
    Email = 'Email',
    Task = 'Task',
    Evo = 'Evo'
}

export interface File {
    id?: string
    name: string
    type: string
    size: number
    filePath: string
    fileState: FileState
    fileData: FileData
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FileInfo {
    name: string
    type: string
    size: number
    content: string
    filePath: string
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FileData {
    filePath: string
    content: string
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FileState {
    files: File[]
    currentFile: File | null
    isLoading: boolean
    error: string | null
    createFile: (file: FileData) => Promise<void>
    loadFiles: () => Promise<void>
    selectFile: (fileId: string) => Promise<void>
    deleteFile: (fileId: string) => Promise<void>
    clearError: () => void
}

// Friend and Conferencing Types
export interface Friend {
    id?: string;
    name: string;
    age: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Room {
    id?: string
    name: string
    capacity: number
    members: Member[]
    createdAt?: Date;
    updatedAt?: Date;
}

// Project and Task Types

export interface Project {
    id?: string;
    name: string;
    description?: string;
    tasks: Task[]|string[];
    realmId?: string;
    status?: ProjectStatus;
    startDate?: Date;
    endDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ModelReference {
    [key: string]: string|string[]|ModelReference
}

export interface Meta {
    references?: ModelReference
}

export interface MetaTable<T> extends Table<T> {
    meta: Meta
    populate: (data: T[], populate?: string[]) => Promise<T[]>
}

export interface Task {
    id?: string
    title: string
    description?: string
    dueDate?: Date
    done: boolean | number
    status?: TaskStatus
    priority?: TaskPriority
    type?: TaskType
    project?: string|Project
    realmId?: string
    assignee?: string
    creator?: string
    orderId?: number
    level?: number
    parentId?: string
    children?: Task[]
    createdAt?: Date
    updatedAt?: Date
}

export interface Tasks {
    new (...args: any[]): Task
    references?: ModelReference
  }

export enum TaskPriority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
}

export enum TaskStatus {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    WAITING = 'WAITING',
    DEFERRED = 'DEFERRED',
    DECLINED = 'DECLINED',
    NOT_COMPLETED = 'NOT_COMPLETED'
}

export enum TaskType {
    Call = 'Call',
    Email = 'Email',
    ListEmail = 'ListEmail',
    Task = 'Task',
    Evo = 'Evo'
}

export type TaskItem = {
    id: string;
    text: string;
    complete: boolean;
}

export type TaskList = {
    id: string;
    name: string;
    tasks: TaskItem[];
}
export interface TaskComment {
    id?: string;
    task: Task|string;
    comment: string;
    createdAt: Date;
    createdBy: string;
    createdByDetails?: {
        name: string;
        email: string;
        firstName: string;
        lastName: string;
    };
}

export interface TaskFilters {
    assignee?: string;
    creator?: string;
    priority?: TaskPriority[];
    status?: TaskStatus[];
    projectId?: string;
}

export interface CreateTaskDto {
    title: string;
    description?: string;
    status: string;
    priority?: string;
    assignee?: string;
    projectId?: string;
    orderId?: number;
}

export interface ReorderTasksDto {
    status: string;
    newOrderId: number;
    projectId?: string;
    putBeforeTaskId?: string;
    putAfterTaskId?: string;
}


export enum ProjectStatus {
    Active = 'Active',
    Completed = 'Completed',
    OnHold = 'On Hold'
}

export type State = {
    taskLists: TaskList[];
    selectedTaskList: TaskList | null;
    selectTaskList: (taskList: TaskList | null) => void;
    getTaskLists: () => void;
    createTaskList: (name: string) => void;
    deleteTaskList: (listId: string) => void;
    renameTaskList: (listId: string, newName: string) => void;
    createTaskItem: (listId: string, taskText: string) => void;
    updateTaskItemComplete: (
        listId: string,
        taskId: string,
        complete: boolean
    ) => void;
    deleteTaskItem: (listId: string, taskId: string) => void;
    theme: Theme;
    setTheme: (theme?: Theme) => void;
};

// Speech Types
export interface SpeechServiceConfig {
    subscriptionKey: string;
    region: string;
    language?: string;
}

export interface SpeechResult {
    success: boolean;
    error?: string;
}

export class SpeechError extends Error {
    constructor(message: string, public originalError?: unknown) {
        super(message);
        this.name = 'SpeechError';
    }
}

export interface VideoRoom {
    id?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type SpeechRecognitionCallback = (text: string) => void;
export type SpeechErrorCallback = (error: SpeechError) => void;

// Dexue Cloud Types
export interface Realm {
    realmId: string
    name?: string
    represents?: string
    owner?: string
}

export interface Member {
    id?: string
    realmId: string
    userId?: string
    email?: string
    name?: string
    invite?: boolean
    invited?: Date
    accepted?: Date
    rejected?: Date
    roles?: string[]
    permissions?: MemberPermissions
}

export interface LocalRole {
    realmId: string
    name: string
    permissions: MemberPermissions
}

export interface Permission {
    realmId: string
    name: string
    permissions: {
        add?: string[] | '*'
        update?: {
            [tableName: string]: string[] | '*'
        }
    }
}

export interface MemberPermissions {
    add?: string[] | '*'
    update?: {
        [tableName: string]: string[] | '*'
    }
    manage?: string[] | '*'
}

// Common Types
export type Theme = 'dark' | 'light';

export type Result<T, U> = T | U;

export type Maybe<T> = T | null;

export type VoidFunction = () => void;

export type StringFunction = (str: string) => string;

export type NumberFunction = (num: number) => number;

export type BooleanFunction = (bool: boolean) => boolean;

export interface GridState {
    id?: string;
    gridId: string;
    state: string;
    gridState?: JSON;
}

export interface KnowledgeStack {
    id?: string;
    name: string;
    description: string;
    tags: string[];
    resources: {
        id: string;
        type: 'link' | 'document' | 'note';
        title: string;
        content: string;
        url?: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ConciergeMessageRequest {
  message: string;
  role: 'user' | 'assistant';
  timestamp?: number;
}

export interface ConciergeMessageResponse {
  message: string;
  role: 'user' | 'assistant';
  id: string;
}

