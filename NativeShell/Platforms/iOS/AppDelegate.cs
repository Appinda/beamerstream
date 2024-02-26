using Appinda.Beamerstream.NativeShell;
using Foundation;

namespace Appinda.Beamerstream.NativeShell.Platforms.iOS
{
    [Register("AppDelegate")]
    public class AppDelegate : MauiUIApplicationDelegate
    {
        protected override MauiApp CreateMauiApp() => MauiProgram.CreateMauiApp();
    }
}
