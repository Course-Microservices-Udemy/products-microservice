import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
    PORT: number;
    DATABASE_URL: string;
}

const envsSchema = Joi.object<EnvVars>({
    PORT: Joi.number().required(),
    DATABASE_URL: Joi.string().required(),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Error reading environment variables: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    databaseUrl: envVars.DATABASE_URL,
}
