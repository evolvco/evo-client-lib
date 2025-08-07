import { ChatCompletionTool } from "openai/resources/chat/completions";

export const getMetaModelSpec:ChatCompletionTool = {
    "type": "function",
    "function": {
        "name": "get_meta_models",
        "description": "see all the meta models details of the structured data models in the local dexie system.",
        "parameters": {
            "type": "object",
            "properties": {
                "format": {
                    "type": "string",
                    "description": "the format of the records to return",
                    "enum": ["json", "table", "list", "markdown", "html", "definition list"]
                },
                "fields": {
                    "type": "boolean",
                    "description": "whether to return the fields of the records"
                },
                "model": {
                    "type": "string",
                    "description": "the name of the meta model or structured data model to find records from"
                }
            },
            "required": ["format", "model", "fields"],
            "additionalProperties": false
        },
        "strict": true
    }
}

export const getModelsSpec:ChatCompletionTool = {
    "type": "function",
    "function": {
        "name": "find_model_records",
        "description": "see records from a meta model or structured data models in the local system.",
        "parameters": {
            "type": "object",
            "properties": {
                "count": {
                    "type": "boolean",
                    "description": "whether to return the count of how many records are in the model"
                },
                "model": {
                    "type": "string",
                    "description": "the name of the meta model or structured data model to find records from"
                },
                "format": {
                    "type": "string",
                    "description": "the format of the records to return",
                    "enum": ["json", "table", "list", "markdown", "html", "definition list"]
                }
            },
            "required": ["model", "format", "count"],
            "additionalProperties": false
        },
        "strict": true
    }
}

export const createMetaModelSpec:ChatCompletionTool = {
    "type": "function",
    "function": {
        "name": "create_meta_model",
        "description": "create a new structured data model in the local system.",
        "parameters": {
            "type": "object",
            "properties": {
                "model": {
                    "type": "string",
                    "description": "the name of the meta model or structured data model to create"
                },
                "fields": {
                    "type": "array",
                    "description": "the fields of the meta model or structured data model to create",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": {
                                "type": "string",
                                "description": "the name of the field"
                            },
                            "type": {
                                "type": "string",
                                "description": "the type of the field"
                            },
                            "required": {
                                "type": "boolean",
                                "description": "whether the field is required"
                            },
                            "index": {
                                "type": "boolean",
                                "description": "whether the field is indexed"
                            }
                        },
                        "required": ["name"],
                        "additionalProperties": false
                    }
                }
            },
            "required": ["model", "fields"],
            "additionalProperties": false
        },
        "strict": true
    }
}