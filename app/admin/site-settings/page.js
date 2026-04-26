"use client";

import { useEffect, useState } from "react";

export default function AdminSiteSettingsPage() {
  const [settings, setSettings] = useState({
    showUniversityTab: true,
    homeShowFindUni: true,
  });
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let ignore = false;
    async function loadSettings() {
      try {
        const res = await fetch("/api/site-settings", { cache: "no-store" });
        const data = await res.json();
        if (!ignore && data?.success && data?.settings) {
          setSettings(data.settings);
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadSettings();
    return () => {
      ignore = true;
    };
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setNotice("");
    try {
      const res = await fetch("/api/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Failed to update settings");
      }
      setSettings(data.settings);
      setNotice("Site settings updated successfully.");
    } catch (error) {
      console.error(error);
      setNotice("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-semibold mb-1">Site Settings</h1>
      <p className="text-sm text-gray-600 mb-6">Control navbar and homepage toggle behavior from admin panel.</p>

      <form onSubmit={handleSave} className="space-y-5 bg-white border rounded-xl p-5">
        <label className="flex items-center justify-between gap-4 border rounded-lg px-4 py-3">
          <div>
            <p className="font-medium text-gray-900">Show University Tab in Navbar</p>
            <p className="text-sm text-gray-600">ON: show `Universities` tab, OFF: hide it.</p>
          </div>
          <input
            type="checkbox"
            checked={settings.showUniversityTab}
            onChange={(e) => setSettings((prev) => ({ ...prev, showUniversityTab: e.target.checked }))}
            className="h-5 w-5"
          />
        </label>

        <label className="flex items-center justify-between gap-4 border rounded-lg px-4 py-3">
          <div>
            <p className="font-medium text-gray-900">Home Section Toggle</p>
            <p className="text-sm text-gray-600">ON: show `FindUni`, OFF: show `ProcessSteps`.</p>
          </div>
          <input
            type="checkbox"
            checked={settings.homeShowFindUni}
            onChange={(e) => setSettings((prev) => ({ ...prev, homeShowFindUni: e.target.checked }))}
            className="h-5 w-5"
          />
        </label>

        <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>

      {notice ? <p className="mt-3 text-sm text-gray-700">{notice}</p> : null}
    </div>
  );
}
