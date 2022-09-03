import 'reflect-metadata';
import { container } from 'tsyringe';
import { AppModule } from './app.module';
import { CustomDecorator } from './modules/customDecorator';

container.resolve(AppModule);
container.resolve(CustomDecorator);
