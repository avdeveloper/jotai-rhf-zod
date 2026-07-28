import { PreferencesForm } from "@/components/preferences-form";

function App() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-2xl flex-col gap-10 px-4 py-16">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          User Preferences Panel
        </h1>
        <p className="text-muted-foreground text-balance">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>

      <PreferencesForm />
    </main>
  );
}

export default App;
