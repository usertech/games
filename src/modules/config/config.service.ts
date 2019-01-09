import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(Object.assign({}, process.env, config));
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      GAMES_API_ORIGIN: Joi.string().uri(),
      PORT: Joi.number().default(3000),
      AUTH_TOKEN: Joi.string(),
      POSTGRES_USERNAME: Joi.string(),
      POSTGRES_PASSWORD: Joi.string(),
      POSTGRES_DATABASE: Joi.string(),
      POSTGRES_HOST: Joi.string(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
      { stripUnknown: true },
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get port(): number {
    return Number(this.envConfig.PORT);
  }

  get gamesApiOrigin(): string {
    return String(this.envConfig.GAMES_API_ORIGIN);
  }

  get authToken(): string {
    return String(this.envConfig.AUTH_TOKEN);
  }

  get postgresUsername(): string {
    return String(this.envConfig.POSTGRES_USERNAME);
  }

  get postgresPassword(): string {
    return String(this.envConfig.POSTGRES_PASSWORD);
  }

  get postgresDatabase(): string {
    return String(this.envConfig.POSTGRES_DATABASE);
  }

  get postgresHost(): string {
    return this.envConfig.POSTGRES_HOST ? this.envConfig.POSTGRES_HOST : null;
  }
}
