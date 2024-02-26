using Appinda.Beamerstream.NativeShell.Workers;
using Microsoft.Extensions.Logging;
using NativeShell;
using System.Diagnostics;

namespace Appinda.Beamerstream.NativeShell
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            Trace.WriteLine("Hoi");

            var builder = MauiApp.CreateBuilder();
            builder.UseMauiApp<App>();

            builder.Services.AddHostedService<Worker>();

#if DEBUG
            builder.Logging.AddDebug();
#endif

            var app = builder.Build();

            //var w = app.Services.GetRequiredService<IHostedService>();
            //var c = new CancellationToken();
            //w.StartAsync(c);
            //Trace.WriteLine("W " + w.ToString());
            Trace.WriteLine("Starting server..");

            var proc = new Process()
            {
                StartInfo = new("node", "C:\\CodeProjects\\Personal\\Git\\Beamerstream\\server\\dist\\index.cjs")
                {
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };
            proc.Start();

            Trace.WriteLine("Server started.");


            return app;
        }
    }
}
