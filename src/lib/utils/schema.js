import Ajv from "ajv"
import formats from "ajv-formats"
import keywords from "ajv-keywords"

const ajv = new Ajv()
formats(ajv)
keywords(ajv)
