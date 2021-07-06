import { Filesystem } from '@poppinss/dev-utils';
import { Application } from '@adonisjs/core/build/standalone';
export declare const fs: Filesystem;
export declare function setup(setupProviders?: boolean): Promise<Application>;
