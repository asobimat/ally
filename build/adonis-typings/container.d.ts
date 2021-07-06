declare module '@ioc:Adonis/Core/Application' {
    import { AllyManagerContract } from '@ioc:Adonis/Addons/Ally';
    interface ContainerBindings {
        'Adonis/Addons/Ally': AllyManagerContract;
    }
}
