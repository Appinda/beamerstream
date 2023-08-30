export default class Server {
    private _port;
    private app;
    private httpServer;
    private apolloServer;
    get port(): number | null;
    constructor();
    run(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map