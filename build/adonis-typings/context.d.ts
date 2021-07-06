declare module '@ioc:Adonis/Core/HttpContext' {
    import { AllyContract } from '@ioc:Adonis/Addons/Ally';
    interface HttpContextContract {
        ally: AllyContract;
    }
}
