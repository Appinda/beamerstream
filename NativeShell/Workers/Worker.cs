using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Diagnostics;

namespace Appinda.Beamerstream.NativeShell.Workers
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;

        public Worker(ILogger<Worker> logger)
        {
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Starting server..");
            var process = Process.Start("node", "C:\\CodeProjects\\Personal\\Git\\Beamerstream\\server\\dist\\index.cjs");
            _logger.LogInformation("Server started.");
            //while (!stoppingToken.IsCancellationRequested)
            //{
            //    if (_logger.IsEnabled(LogLevel.Information))
            //    {
            //        _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            //    }
            //    await Task.Delay(1000, stoppingToken);
            //}
        }
    }
}
