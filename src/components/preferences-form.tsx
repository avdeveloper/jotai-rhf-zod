// biome-ignore-all lint/correctness/noUnusedImports: prepared for the next iteration, not wired up yet
import { atomWithStorage } from "jotai/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// TODO: wire up react-hook-form (useForm), the zod hex-color schema, and the
// jotai atomWithStorage-backed preferences atom in a follow-up iteration.
// This component currently only hosts the static form fields.

export function PreferencesForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>
          Choose a text color and a theme for the page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="preferences-form" className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="textColor">Text color</Label>
            <Input
              id="textColor"
              name="textColor"
              type="text"
              placeholder="#1a1a1a"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Theme</Label>
            <RadioGroup defaultValue="system" name="theme">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="light" id="theme-light" />
                <Label htmlFor="theme-light">Light</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="dark" id="theme-dark" />
                <Label htmlFor="theme-dark">Dark</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="system" id="theme-system" />
                <Label htmlFor="theme-system">System</Label>
              </div>
            </RadioGroup>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="preferences-form" className="w-full">
          Save preferences
        </Button>
      </CardFooter>
    </Card>
  );
}
